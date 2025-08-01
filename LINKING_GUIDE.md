# 🔗 Linking Backend and Frontend - Complete Guide

## 🏗️ Architecture Overview

Your app has two main components:
- **Frontend**: React app (served as static files)
- **Backend**: Node.js Express server (API endpoints)

The frontend needs to communicate with the backend through HTTP requests to the `/api/apply` endpoint.

## 📋 Deployment Scenarios

### Scenario 1: Full-Stack Deployment (Same Domain) ✅ RECOMMENDED

**How it works:**
- Backend serves both API routes AND the built React app
- Frontend and backend share the same URL
- No CORS issues, simplest setup

**Example URLs:**
- Your app: `https://myapp.railway.app`
- API calls: `https://myapp.railway.app/api/apply`
- Frontend: `https://myapp.railway.app` (served by backend)

**Platforms:**
- Railway, Render, Heroku (recommended)

**No additional configuration needed!** The backend automatically serves the React build files.

### Scenario 2: Separate Deployments (Different Domains)

**How it works:**
- Frontend deployed to Vercel/Netlify
- Backend deployed to Railway/Render/Heroku
- Frontend makes cross-origin requests to backend

**Example URLs:**
- Frontend: `https://myapp.vercel.app`
- Backend: `https://myapp-backend.railway.app`
- API calls: `https://myapp-backend.railway.app/api/apply`

**Configuration required:** Set environment variables to link them.

## 🔧 Configuration for Each Scenario

### Option A: Full-Stack Deployment (EASIEST)

Deploy everything to one platform:

**Railway:**
```bash
# Just set these environment variables in Railway dashboard:
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
RECIPIENT_EMAIL=recipient@gmail.com
NODE_ENV=production
```

**Render:**
```bash
# Set in Render dashboard:
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
RECIPIENT_EMAIL=recipient@gmail.com
NODE_ENV=production
```

**Heroku:**
```bash
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASSWORD=your-app-password
heroku config:set RECIPIENT_EMAIL=recipient@gmail.com
heroku config:set NODE_ENV=production
```

**✅ That's it!** No additional linking needed.

### Option B: Separate Deployments

#### Step 1: Deploy Backend First

Deploy to Railway/Render/Heroku with environment variables:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
RECIPIENT_EMAIL=recipient@gmail.com
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

Note your backend URL (e.g., `https://myapp-backend.railway.app`)

#### Step 2: Update Frontend Configuration

Set the backend URL in your frontend environment:

**For Vercel:**
In Vercel dashboard, set environment variable:
```
REACT_APP_BACKEND_URL=https://myapp-backend.railway.app
```

**For Netlify:**
In Netlify dashboard, set environment variable:
```
REACT_APP_BACKEND_URL=https://myapp-backend.railway.app
```

**For local .env file (development):**
```
REACT_APP_BACKEND_URL=https://myapp-backend.railway.app
```

#### Step 3: Update CORS (if needed)

If you get CORS errors, add your frontend domain to the backend:

In `server/index.js`, the CORS is already configured to accept:
- Your `FRONTEND_URL` environment variable
- Common domains like Vercel

Or manually add your domain to the `allowedOrigins` array:
```javascript
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001', 
  'https://apply-rouge.vercel.app',
  'https://your-custom-domain.com', // Add your domain here
  process.env.FRONTEND_URL,
].filter(Boolean);
```

## 🔄 How the Connection Works

### Frontend API Calls

The frontend automatically chooses the right backend URL:

```javascript
// In src/pages/applyForm.js (already configured!)
const backendUrl = process.env.REACT_APP_BACKEND_URL || 
  (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000');

// Makes request to:
// - Development: http://localhost:5000/api/apply
// - Production (same domain): /api/apply
// - Production (separate): https://backend-domain.com/api/apply
```

### CORS Handling

The backend CORS is configured to allow:

```javascript
// In server/index.js (already configured!)
const allowedOrigins = [
  'http://localhost:3000',           // Local development
  'http://localhost:3001',           // Alternative local port
  'https://apply-rouge.vercel.app',  // Your current Vercel deployment
  process.env.FRONTEND_URL,          // Environment variable
];
```

## 🧪 Testing the Connection

### 1. Test Locally
```bash
# Terminal 1: Start backend
npm run server

# Terminal 2: Start frontend  
npm start

# Visit: http://localhost:3000
```

### 2. Test Production
1. Deploy backend → Get backend URL
2. Set `REACT_APP_BACKEND_URL` in frontend
3. Deploy frontend
4. Test form submission
5. Check health endpoint: `your-backend-url/api/health`

## 🚨 Common Issues & Solutions

### "Failed to fetch" Error
- ❌ Backend not running
- ❌ Wrong backend URL in frontend
- ❌ CORS not configured for your domain

**Solution:** Check backend URL and add your domain to CORS

### "CORS Error"
- ❌ Frontend domain not in CORS allowlist

**Solution:** Add your frontend domain to `allowedOrigins` or set `FRONTEND_URL`

### "Email service not configured"
- ❌ Missing environment variables in backend

**Solution:** Set all required env vars: `EMAIL_USER`, `EMAIL_PASSWORD`, `RECIPIENT_EMAIL`

## 🎯 Recommended Setups

### For Beginners: Full-Stack on Railway
1. Push code to GitHub
2. Connect GitHub to Railway
3. Set environment variables
4. Deploy! ✅

### For Flexibility: Vercel + Railway
1. Deploy backend to Railway → Get URL
2. Set `REACT_APP_BACKEND_URL` in Vercel
3. Deploy frontend to Vercel
4. Both linked automatically! ✅

### For Enterprise: Docker + Custom Domain
1. Build Docker image
2. Deploy to cloud provider
3. Set up custom domain
4. Configure SSL/HTTPS ✅

## 📝 Quick Reference

### Environment Variables Summary

**Backend (always needed):**
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password  
RECIPIENT_EMAIL=recipient@gmail.com
NODE_ENV=production
```

**Frontend (only for separate deployment):**
```
REACT_APP_BACKEND_URL=https://your-backend-domain.com
```

**Backend (for separate deployment):**
```
FRONTEND_URL=https://your-frontend-domain.com
```

## ✅ Success Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Environment variables configured
- [ ] CORS allows your frontend domain
- [ ] Form submission works
- [ ] Email received successfully
- [ ] Health check returns 200 OK

Your apps are now properly linked! 🎉