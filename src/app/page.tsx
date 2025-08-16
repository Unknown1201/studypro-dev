'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('studypro_user')
    if (user) {
      router.push('/dashboard')
    }
  }, [router])

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    alert(message) // Simple fallback
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Try API first
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('studypro_user', JSON.stringify(data.user))
        showToast('Login successful! Redirecting...', 'success')
        setTimeout(() => {
          router.push('/dashboard')
        }, 1500)
        return
      }

      // If API fails, use frontend fallback
      if ((formData.username === 'demo' && formData.password === 'demo') ||
          (formData.username === 'student1' && formData.password === 'password123')) {
        
        const user = {
          id: formData.username === 'demo' ? 'demo-id' : 'student1-id',
          username: formData.username,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        
        localStorage.setItem('studypro_user', JSON.stringify(user))
        showToast('Login successful! Redirecting...', 'success')
        setTimeout(() => {
          router.push('/dashboard')
        }, 1500)
        return
      }

      throw new Error('Invalid credentials')

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed'
      setError(errorMessage)
      showToast(errorMessage, 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="auth-screen">
      <div className="auth-container">
        <div className="auth-header">
          <h1>StudyPro DEV</h1>
          <p>Your Professional Study Companion</p>
        </div>
        
        <div className="auth-form">
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                value={formData.username}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
            </div>
            
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn--primary btn--full-width"
              disabled={isLoading}
            >
              {isLoading ? 'Please wait...' : (isLogin ? 'Login' : 'Create Account')}
            </button>
          </form>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <p className="auth-switch">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault()
                setIsLogin(!isLogin)
                setError('')
                setFormData({ username: '', password: '', email: '' })
              }}
            >
              {isLogin ? 'Create one' : 'Sign in'}
            </a>
          </p>
          
          <div style={{ marginTop: '20px', fontSize: '14px', color: '#888' }}>
            <p><strong>Demo Credentials:</strong></p>
            <p>Username: <code>demo</code> | Password: <code>demo</code></p>
            <p>Username: <code>student1</code> | Password: <code>password123</code></p>
          </div>
        </div>
      </div>
    </div>
  )
}
