import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'

// Check if RLS enabled by running a test query
async function checkRLS() {
  try {
    const { data } = await supabase.from('users').select('id').limit(1)
    return data !== null
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      console.log('Login failed: missing username or password')
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 })
    }

    const canAccessDB = await checkRLS()
    if (!canAccessDB) {
      console.log('Database access denied - RLS may be enabled without proper policies')
      // Bypass login for demo users when DB access is denied
      if ((username === 'demo' && password === 'demo') || (username === 'student1' && password === 'password123')) {
        console.log('Bypass login success')
        return NextResponse.json({
          user: {
            id: `temp-${username}`,
            username,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        })
      }
      return NextResponse.json({ error: 'Database access denied, and no valid credentials' }, { status: 403 })
    }

    const { data: user, error } = await supabase.from('users').select('*').eq('username', username).single()
    if (error || !user) {
      console.log('User not found or error:', error)
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    console.log('User found:', { username: user.username })
    const isValid = await bcrypt.compare(password, user.password_hash)
    console.log('Password validation result:', isValid)

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const { password_hash, ...userWithoutPassword } = user
    return NextResponse.json({ user: userWithoutPassword })
  } catch (ex) {
    console.error('Exception in login:', ex)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
