-- StudyPro DEV Database Migration Script
-- Run this script in your Supabase SQL editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subcategories table
CREATE TABLE IF NOT EXISTS subcategories (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subjects table
CREATE TABLE IF NOT EXISTS subjects (
    id SERIAL PRIMARY KEY,
    subcategory_id INTEGER REFERENCES subcategories(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chapters table
CREATE TABLE IF NOT EXISTS chapters (
    id SERIAL PRIMARY KEY,
    subject_id INTEGER REFERENCES subjects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    order_index INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    chapter_id INTEGER REFERENCES chapters(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    order_index INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User progress table
CREATE TABLE IF NOT EXISTS user_progress (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    task_id INTEGER REFERENCES tasks(id) ON DELETE CASCADE,
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, task_id)
);

-- Insert sample data
INSERT INTO categories (name, slug) VALUES ('12th Grade', '12th') ON CONFLICT (slug) DO NOTHING;
INSERT INTO subcategories (category_id, name, slug) VALUES (1, 'Semester', 'sem') ON CONFLICT DO NOTHING;

-- Insert subjects
INSERT INTO subjects (subcategory_id, name, slug) VALUES 
(1, 'Physics', 'physics'),
(1, 'Information Technology', 'information-technology'),
(1, 'Biology', 'biology'),
(1, 'Chemistry', 'chemistry'),
(1, 'English', 'english')
ON CONFLICT DO NOTHING;

-- Insert Physics chapters and tasks
INSERT INTO chapters (subject_id, name, order_index) VALUES
(1, 'Ch 1: Rotational Dynamics', 1),
(1, 'Ch 2: Mechanical Properties of Fluids', 2),
(1, 'Ch 3: Kinetic Theory of Gases & Radiation', 3),
(1, 'Ch 4: Thermodynamics', 4),
(1, 'Ch 5: Oscillations', 5),
(1, 'Ch 6: Superposition of Waves', 6),
(1, 'Ch 8: Electrostatics', 7),
(1, 'Ch 9: Current Electricity', 8)
ON CONFLICT DO NOTHING;

-- Physics tasks (Chapter 1: Rotational Dynamics)
INSERT INTO tasks (chapter_id, name, order_index) VALUES
(1, 'Circular Motion (Uniform & Non-uniform)', 1),
(1, 'Centripetal & Centrifugal forces', 2),
(1, 'Banking of roads', 3),
(1, 'Conical pendulum & Vertical circular motion', 4),
(1, 'Moment of Inertia (Theorems of parallel & perpendicular axes)', 5),
(1, 'Angular momentum & Torque', 6)
ON CONFLICT DO NOTHING;

-- Physics tasks (Chapter 2: Mechanical Properties of Fluids)
INSERT INTO tasks (chapter_id, name, order_index) VALUES
(2, 'Pressure, Pascal''s Law', 1),
(2, 'Surface Tension & Surface Energy', 2),
(2, 'Angle of contact & Capillarity', 3),
(2, 'Viscosity, Stokes'' Law, Terminal velocity', 4),
(2, 'Equation of continuity & Bernoulli''s equation', 5)
ON CONFLICT DO NOTHING;

-- Continue with remaining chapters...
-- (Note: Add all other chapters and tasks similarly)

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own data" ON users FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own progress" ON user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON user_progress FOR UPDATE USING (auth.uid() = user_id);

-- Create default demo users (passwords are hashed versions of 'demo' and 'password123')
-- Hash for 'demo': $2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewDr8HGCq6w1H.hK
-- Hash for 'password123': $2a$12$4UgFpA5t2JNg9xnXvL3Wqe4dE5xVKzO9vRzJ1mK8nLqP0wS7yH6Tz
INSERT INTO users (id, username, password_hash) VALUES
(gen_random_uuid(), 'demo', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewDr8HGCq6w1H.hK'),
(gen_random_uuid(), 'student1', '$2a$12$4UgFpA5t2JNg9xnXvL3Wqe4dE5xVKzO9vRzJ1mK8nLqP0wS7yH6Tz')
ON CONFLICT (username) DO NOTHING;
