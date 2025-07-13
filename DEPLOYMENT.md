# Vercel Deployment Guide

## Prerequisites
1. Install Vercel CLI: `npm i -g vercel`
2. Have a GitHub account
3. Have a Vercel account (free at vercel.com)

## Deployment Steps

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Login to Vercel:**
   ```bash
   vercel login
   ```

2. **Deploy from your project directory:**
   ```bash
   vercel
   ```

3. **Follow the prompts:**
   - Link to existing project? → No
   - Project name → Your portfolio name
   - Directory → ./ (current directory)
   - Override settings? → No

4. **Set Environment Variables (if using email):**
   ```bash
   vercel env add EMAIL_USER
   vercel env add EMAIL_PASS
   ```

### Option 2: Deploy via GitHub Integration

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect the configuration

3. **Configure Environment Variables:**
   - In your Vercel project dashboard
   - Go to Settings → Environment Variables
   - Add `EMAIL_USER` and `EMAIL_PASS` if using email functionality

## Important Notes

### Database Changes
- **SQLite removed**: The original SQLite database has been replaced with in-memory data storage
- **Data persistence**: In production, consider using a cloud database like:
  - Vercel Postgres
  - MongoDB Atlas
  - Supabase
  - PlanetScale

### Email Configuration
- Email functionality requires Gmail App Password
- Set environment variables in Vercel dashboard
- Update the recipient email in `api/index.js`

### File Structure
```
├── api/
│   └── index.js          # Serverless API functions
├── public/               # Static files
├── vercel.json          # Vercel configuration
├── package.json         # Dependencies
└── DEPLOYMENT.md        # This file
```

## Post-Deployment

1. **Test your API endpoints:**
   - `/api/projects`
   - `/api/skills`
   - `/api/contact`

2. **Update your frontend URLs** if needed:
   - The API calls should work automatically
   - Static files are served from `/public`

3. **Custom Domain (Optional):**
   - In Vercel dashboard, go to Settings → Domains
   - Add your custom domain

## Troubleshooting

### Common Issues:
1. **Build errors**: Check that all dependencies are in `package.json`
2. **API not working**: Verify `vercel.json` routing configuration
3. **Email not sending**: Check environment variables in Vercel dashboard

### Local Testing:
```bash
# Install dependencies
npm install

# Test locally
npm run dev
```

## Migration from Local Development

The main changes made for Vercel deployment:

1. **Removed SQLite**: Replaced with in-memory data storage
2. **Serverless API**: Created `api/index.js` for serverless functions
3. **Vercel config**: Added `vercel.json` for deployment configuration
4. **Static files**: All static files remain in `/public` directory

Your portfolio will now work seamlessly on Vercel's serverless platform! 