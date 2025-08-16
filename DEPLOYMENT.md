# StudyPro DEV - Complete Deployment Guide

## Prerequisites
- Node.js 18+ installed
- Git installed
- Supabase account
- Vercel account
- GitHub account

## Step 1: GitHub Repository Setup

1. **Create a new GitHub repository:**
   ```bash
   # Create new repo on GitHub, then clone it
   git clone https://github.com/yourusername/studypro-dev.git
   cd studypro-dev
   ```

2. **Upload project files:**
   - Extract the provided ZIP file
   - Copy all files to your repository folder
   - Commit and push:
   ```bash
   git add .
   git commit -m "Initial commit - StudyPro DEV"
   git push origin main
   ```

## Step 2: Supabase Database Setup

1. **Create Supabase Project:**
   - Go to https://supabase.com
   - Click "New Project"
   - Choose organization and enter project details
   - Wait for project to be ready

2. **Get Project Credentials:**
   - Go to Settings > API
   - Copy your `Project URL`
   - Copy your `anon public` API key
   - Copy your `service_role` secret key (Settings > API > service_role)

3. **Run Database Migration:**
   - Go to SQL Editor in Supabase dashboard
   - Copy and paste the content from `database/migration.sql`
   - Click "Run" to execute the script
   - Then run `database/seed-data.sql` to populate with your syllabus data

4. **Configure Authentication:**
   - Go to Authentication > Settings
   - Set Site URL to: `http://localhost:3000` (for development)
   - Add your production domain later

## Step 3: Environment Configuration

1. **Create Environment File:**
   ```bash
   cp .env.example .env.local
   ```

2. **Update Environment Variables:**
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   NEXTAUTH_SECRET=your_random_32_character_string
   NEXTAUTH_URL=http://localhost:3000
   ```

## Step 4: Local Development

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run Development Server:**
   ```bash
   npm run dev
   ```

3. **Test the Application:**
   - Open http://localhost:3000
   - Try logging in with demo credentials:
     - Username: `demo`, Password: `demo`
     - Username: `student1`, Password: `password123`

## Step 5: Vercel Deployment

1. **Connect GitHub to Vercel:**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Deployment Settings:**
   - **Framework Preset:** Next.js
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)
   - **Install Command:** `npm install` (default)
   - **Node.js Version:** 18.x

3. **Set Environment Variables:**
   Add these in Vercel Dashboard > Settings > Environment Variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_key
   NEXTAUTH_SECRET=your_secret_key
   NEXTAUTH_URL=https://your-app-name.vercel.app
   ```

4. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete
   - Get your deployment URL

## Step 6: Post-Deployment Configuration

1. **Update Supabase Settings:**
   - Go to Authentication > Settings in Supabase
   - Update Site URL to your Vercel domain
   - Add your domain to Redirect URLs

2. **Test Production Deployment:**
   - Visit your Vercel URL
   - Test user registration and login
   - Test progress tracking functionality

## Step 7: Domain Configuration (Optional)

1. **Add Custom Domain:**
   - In Vercel dashboard, go to Settings > Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Update Environment:**
   - Update `NEXTAUTH_URL` to your custom domain
   - Redeploy the application

## Troubleshooting

### Common Issues:

1. **Database Connection Errors:**
   - Verify Supabase URL and API keys
   - Check if RLS policies are properly configured
   - Ensure database migration was successful

2. **Build Errors:**
   - Check Node.js version (18+ required)
   - Clear node_modules and reinstall
   - Check for TypeScript errors

3. **Authentication Issues:**
   - Verify NEXTAUTH_SECRET is set
   - Check Supabase authentication settings
   - Ensure redirect URLs are correct

4. **CORS Errors:**
   - Check Supabase CORS settings
   - Verify domain configuration in Supabase

### Performance Optimization:

1. **Enable Vercel Analytics:**
   - Go to Analytics tab in Vercel dashboard
   - Enable Web Analytics

2. **Configure Caching:**
   - API routes are automatically cached by Vercel
   - Static assets are cached by default

3. **Monitor Performance:**
   - Use Vercel's built-in monitoring
   - Check Supabase dashboard for database performance

## Security Considerations

1. **Environment Variables:**
   - Never commit `.env.local` to Git
   - Use different keys for development and production
   - Regularly rotate API keys

2. **Database Security:**
   - RLS policies are enabled by default
   - Review and test all database policies
   - Monitor access logs in Supabase

3. **Authentication:**
   - Use strong NEXTAUTH_SECRET
   - Implement rate limiting if needed
   - Monitor for suspicious activity

## Maintenance

1. **Regular Updates:**
   - Update dependencies monthly
   - Monitor Vercel and Supabase changelog
   - Test updates in development first

2. **Backup:**
   - Supabase automatically backs up your database
   - Consider additional backups for critical data
   - Version control your code changes

3. **Monitoring:**
   - Set up Vercel deployment notifications
   - Monitor Supabase usage and limits
   - Check application performance regularly

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review Vercel and Supabase documentation
3. Check GitHub issues in the project repository
4. Ensure all environment variables are correctly set

## Project Structure Reference

```
studypro-dev/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/route.ts
│   │   │   │   └── register/route.ts
│   │   │   ├── progress/route.ts
│   │   │   └── subjects/route.ts
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── lib/
│       ├── supabase.ts
│       └── types.ts
├── database/
│   ├── migration.sql
│   └── seed-data.sql
├── package.json
├── tsconfig.json
├── next.config.js
├── vercel.json
├── .env.example
└── README.md
```

This structure provides a scalable, maintainable Next.js application with proper separation of concerns and modern development practices.
