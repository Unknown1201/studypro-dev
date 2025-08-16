import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Fetch subjects with their chapters and tasks
    const { data: subjects, error } = await supabase
      .from('subjects')
      .select(`
        id,
        name,
        slug,
        chapters (
          id,
          name,
          order_index,
          tasks (
            id,
            name,
            order_index
          )
        )
      `)
      .order('id')

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch subjects' }, 
        { status: 500 }
      )
    }

    // Sort chapters and tasks by order_index
    const sortedSubjects = subjects?.map(subject => ({
      ...subject,
      chapters: subject.chapters
        ?.sort((a, b) => a.order_index - b.order_index)
        .map(chapter => ({
          ...chapter,
          tasks: chapter.tasks?.sort((a, b) => a.order_index - b.order_index) || []
        })) || []
    })) || []

    return NextResponse.json({ subjects: sortedSubjects })
  } catch (error) {
    console.error('Subjects API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}
