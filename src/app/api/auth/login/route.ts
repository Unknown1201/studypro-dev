import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()
    
    console.log('Login attempt:', { username, password: '***' })

    if (!username || !password) {
      console.log('Missing username or password')
      return NextResponse.json(
        { error: 'Username and password are required' }, 
        { status: 400 }
      )
    }

    // Get user from database
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single()

    console.log('Database query result:', { user: user ? 'found' : 'not found', error })
    
    if (error || !user) {
      console.log('User not found in database')
      return NextResponse.json(
        { error: 'Invalid credentials' }, 
        { status: 401 }
      )
    }

    console.log('User found:', { id: user.id, username: user.username })
    console.log('Stored hash:', user.password_hash)

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash)
    console.log('Password comparison result:', isValidPassword)
    
    if (!isValidPassword) {
      console.log('Password verification failed')
      return NextResponse.json(
        { error: 'Invalid credentials' }, 
        { status: 401 }
      )
    }

    console.log('Login successful')
    
    // Return user data (exclude password)
    const { password_hash, ...userWithoutPassword } = user
    return NextResponse.json({ 
      user: userWithoutPassword,
      message: 'Login successful' 
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}
