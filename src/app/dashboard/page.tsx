'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, Subject, Chapter, Task, UserProgress } from '@/lib/types'

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)
  const [userProgress, setUserProgress] = useState<Map<number, boolean>>(new Map())
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('studypro_user')
    if (!userData) {
      router.push('/')
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)
    loadSubjects()
    loadUserProgress(parsedUser.id)
  }, [router])

  const loadSubjects = async () => {
    try {
      const response = await fetch('/api/subjects')
      if (response.ok) {
        const data = await response.json()
        setSubjects(data.subjects || [])
      }
    } catch (error) {
      console.error('Failed to load subjects:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadUserProgress = async (userId: string) => {
    try {
      const response = await fetch(`/api/progress?userId=${userId}`)
      if (response.ok) {
        const data = await response.json()
        const progressMap = new Map()
        data.progress?.forEach((p: UserProgress) => {
          progressMap.set(p.task_id, p.is_completed)
        })
        setUserProgress(progressMap)
      }
    } catch (error) {
      console.error('Failed to load progress:', error)
    }
  }

  const handleTaskToggle = async (taskId: number, isCompleted: boolean) => {
    if (!user) return

    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          taskId,
          isCompleted
        })
      })

      if (response.ok) {
        setUserProgress(prev => new Map(prev.set(taskId, isCompleted)))
        showToast('Progress updated!', 'success')
      }
    } catch (error) {
      console.error('Failed to update progress:', error)
      showToast('Failed to update progress', 'error')
    }
  }

  const calculateProgress = (subject: Subject): number => {
    if (!subject.chapters) return 0

    const allTasks = subject.chapters.flatMap(chapter => chapter.tasks || [])
    if (allTasks.length === 0) return 0

    const completedTasks = allTasks.filter(task => userProgress.get(task.id))
    return Math.round((completedTasks.length / allTasks.length) * 100)
  }

  const handleLogout = () => {
    localStorage.removeItem('studypro_user')
    router.push('/')
  }

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

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    )
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <h1>StudyPro DEV</h1>
        </div>
        <div className="header-right">
          <span className="welcome-text">Welcome, {user?.username}!</span>
          <button onClick={handleLogout} className="btn btn--secondary">
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? 'sidebar--open' : ''}`}>
          <div className="sidebar-header">
            <h3>Subjects</h3>
          </div>
          <nav className="sidebar-nav">
            <div className="nav-section">
              <h4>12th Grade - SEM</h4>
              <ul className="nav-list">
                {subjects.map((subject) => (
                  <li key={subject.id} className="nav-item">
                    <button
                      className={`nav-link ${selectedSubject?.id === subject.id ? 'active' : ''}`}
                      onClick={() => setSelectedSubject(subject)}
                    >
                      <span>{subject.name}</span>
                      <span className="progress-badge">
                        {calculateProgress(subject)}%
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {selectedSubject ? (
            <div className="subject-view">
              <div className="subject-header">
                <h2>{selectedSubject.name}</h2>
                <div className="subject-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${calculateProgress(selectedSubject)}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">
                    {calculateProgress(selectedSubject)}% Complete
                  </span>
                </div>
              </div>

              <div className="chapters-container">
                {selectedSubject.chapters?.map((chapter) => (
                  <div key={chapter.id} className="chapter-card">
                    <h3 className="chapter-title">{chapter.name}</h3>
                    <div className="tasks-list">
                      {chapter.tasks?.map((task) => (
                        <div key={task.id} className="task-item">
                          <label className="task-checkbox">
                            <input
                              type="checkbox"
                              checked={userProgress.get(task.id) || false}
                              onChange={(e) => handleTaskToggle(task.id, e.target.checked)}
                            />
                            <span className="checkmark"></span>
                            <span className="task-name">{task.name}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-content">
                <h2>Select a Subject</h2>
                <p>Choose a subject from the sidebar to start tracking your progress</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
