import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('Login API called')
    
    const body = await request.json()
    console.log('Request body:', body)
    
    const { username, password } = body
    
    if (!username || !password) {
      console.log('Missing username or password')
      return NextResponse.json({ error: 'Username and password required' }, { status: 400 })
    }
    
    // Simple check - no database needed for now
    if ((username === 'demo' && password === 'demo') || 
        (username === 'student1' && password === 'password123')) {
      console.log('Login successful for:', username)
      
      return NextResponse.json({
        user: {
          id: username === 'demo' ? 'demo-id' : 'student1-id',
          username: username,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      })
    }
    
    console.log('Invalid credentials for:', username)
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
