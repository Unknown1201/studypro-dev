export interface User {
  id: string
  username: string
  email?: string
  created_at: string
  updated_at: string
}

export interface Category {
  id: number
  name: string
  slug: string
  created_at: string
}

export interface Subcategory {
  id: number
  category_id: number
  name: string
  slug: string
  created_at: string
}

export interface Subject {
  id: number
  subcategory_id: number
  name: string
  slug: string
  created_at: string
  chapters?: Chapter[]
}

export interface Chapter {
  id: number
  subject_id: number
  name: string
  order_index: number
  created_at: string
  tasks?: Task[]
}

export interface Task {
  id: number
  chapter_id: number
  name: string
  order_index: number
  created_at: string
}

export interface UserProgress {
  id: number
  user_id: string
  task_id: number
  is_completed: boolean
  completed_at?: string
  created_at: string
  updated_at: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  username: string
  password: string
  email?: string
}

export interface AuthResponse {
  user: User
  token?: string
}

export interface ProgressUpdateRequest {
  userId: string
  taskId: number
  isCompleted: boolean
}

export interface SubjectProgress {
  subjectId: number
  totalTasks: number
  completedTasks: number
  progressPercentage: number
}
