import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// In-memory progress store for fallback mode
const progressStore = new Map<string, boolean>()

async function canAccessDB() {
  try {
    const { data } = await supabase.from('user_progress').select('id').limit(1)
    return true
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, taskId, isCompleted } = await request.json()

    if (!userId || !taskId) {
      return NextResponse.json({ error: 'User ID and Task ID are required' }, { status: 400 })
    }

    // Try database first
    const dbAccess = await canAccessDB()
    if (dbAccess) {
      const { data, error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: userId,
          task_id: taskId,
          is_completed: isCompleted,
          completed_at: isCompleted ? new Date().toISOString() : null,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,task_id'
        })

      if (!error) {
        return NextResponse.json({ success: true, data: data?.[0] })
      }
    }

    // Fallback to memory storage
    const key = `${userId}_${taskId}`
    progressStore.set(key, isCompleted)
    
    return NextResponse.json({ 
      success: true, 
      data: { user_id: userId, task_id: taskId, is_completed: isCompleted },
      mode: 'memory'
    })

  } catch (error) {
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  try {
    // Try database first
    const dbAccess = await canAccessDB()
    if (dbAccess) {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)

      if (!error) {
        return NextResponse.json({ progress: data || [] })
      }
    }

    // Fallback to memory storage
    const progress = []
    for (const [key, completed] of progressStore.entries()) {
      if (key.startsWith(`${userId}_`)) {
        const taskId = key.split('_')[1]
        progress.push({
          user_id: userId,
          task_id: parseInt(taskId),
          is_completed: completed
        })
      }
    }

    return NextResponse.json({ progress, mode: 'memory' })

  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 })
  }
}
