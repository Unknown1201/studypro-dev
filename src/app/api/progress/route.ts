import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { userId, taskId, isCompleted } = await request.json()

    if (!userId || !taskId) {
      return NextResponse.json(
        { error: 'User ID and Task ID are required' }, 
        { status: 400 }
      )
    }

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
      .select()

    if (error) {
      console.error('Progress update error:', error)
      return NextResponse.json(
        { error: 'Failed to update progress' }, 
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      data: data?.[0],
      message: 'Progress updated successfully' 
    })
  } catch (error) {
    console.error('Progress API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json(
      { error: 'User ID is required' }, 
      { status: 400 }
    )
  }

  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)

    if (error) {
      console.error('Progress fetch error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch progress' }, 
        { status: 500 }
      )
    }

    return NextResponse.json({ progress: data || [] })
  } catch (error) {
    console.error('Progress API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}
