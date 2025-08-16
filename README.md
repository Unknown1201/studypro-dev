# StudyPro DEV - Professional Study Planner

A modern, professional study planning application built with Next.js and Supabase.

## Features

- 🔐 Secure user authentication
- 📚 Interactive syllabus tracking
- 📊 Real-time progress monitoring
- 📱 Responsive design with glassmorphism UI
- 🎯 Subject-wise progress tracking
- 💾 Persistent data storage with Supabase

## Quick Start

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (copy `.env.example` to `.env.local`)
4. Run development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

## Environment Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the database migration script in `database/migration.sql`
3. Run the data seeding script in `database/seed-data.sql`
4. Update your environment variables

## Deployment

This project is optimized for Vercel deployment. See `DEPLOYMENT.md` for detailed instructions.

## Demo Credentials

- Username: `demo` | Password: `demo`
- Username: `student1` | Password: `password123`

## Tech Stack

- **Frontend:** Next.js 14, TypeScript, CSS3
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Custom auth with bcrypt
- **Deployment:** Vercel
- **Styling:** Custom CSS with Glassmorphism design

## Project Structure

```
src/
├── app/
│   ├── api/          # API routes
│   ├── dashboard/    # Dashboard page
│   ├── globals.css   # Global styles
│   ├── layout.tsx    # Root layout
│   └── page.tsx      # Login page
└── lib/
    ├── supabase.ts   # Supabase client
    └── types.ts      # TypeScript types
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
