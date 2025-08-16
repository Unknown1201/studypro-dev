'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
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
    const toast = document.createElement('div')
    toast.className = `toast show toast-${type}`
    toast.innerHTML = `<span>${message}</span>`

    const container = document.getElementById('toast-container')
    if (container) {
      container.appendChild(toast)

      setTimeout(() => {
        toast.classList.add('hide')
        setTimeout(() => {
          if (container.contains(toast)) {
            container.removeChild(toast)
          }
        }, 300)
      }, 3000)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed')
      }

      if (isLogin) {
        localStorage.setItem('studypro_user', JSON.stringify(data.user))
        showToast('Login successful! Redirecting...', 'success')
        setTimeout(() => {
          router.push('/dashboard')
        }, 1500)
      } else {
        showToast('Registration successful! Please login.', 'success')
        setIsLogin(true)
        setFormData({ username: '', password: '', email: '' })
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      showToast(errorMessage, 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id.replace('login', '').replace('register', '').toLowerCase()]: e.target.value
    })
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
              <label htmlFor={`${isLogin ? 'login' : 'register'}Username`} className="form-label">
                Username
              </label>
              <input
                type="text"
                id={`${isLogin ? 'login' : 'register'}Username`}
                className="form-control"
                value={formData.username}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="registerEmail" className="form-label">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  id="registerEmail"
                  className="form-control"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor={`${isLogin ? 'login' : 'register'}Password`} className="form-label">
                Password
              </label>
              <input
                type="password"
                id={`${isLogin ? 'login' : 'register'}Password`}
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
        </div>
      </div>
    </div>
  )
}
