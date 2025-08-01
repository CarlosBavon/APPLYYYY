# 🚀 Deployment Guide

This guide covers deployment options for the Girlfriend Application Form project, which consists of a React frontend and Node.js backend.

## 📋 Pre-deployment Checklist

### 1. Environment Variables Setup
Copy the environment template:
```bash
cp .env.example .env
```

Set the following environment variables:
- `EMAIL_USER`: Your Gmail address
- `EMAIL_PASSWORD`: Gmail App Password (16 characters)
- `RECIPIENT_EMAIL`: Where applications will be sent
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Set to "production" for deployment
- `FRONTEND_URL`: Your frontend deployment URL

### 2. Gmail App Password Setup
1. Enable 2-Factor Authentication on your Google account
2. Go to Google Account Settings → Security → App passwords
3. Generate an app password for "Mail"
4. Use this 16-character password in `EMAIL_PASSWORD`

## 🌐 Deployment Options

### Option 1: Full-Stack Deployment (Recommended)

#### Railway
1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Railway will automatically build and deploy using `railway.json`

#### Render
1. Connect your GitHub repository to Render
2. Use `render.yaml` configuration
3. Set environment variables in Render dashboard

#### Heroku
1. Install Heroku CLI
2. Create a new Heroku app:
   ```bash
   heroku create your-app-name
   ```
3. Set environment variables:
   ```bash
   heroku config:set EMAIL_USER=your-email@gmail.com
   heroku config:set EMAIL_PASSWORD=your-app-password
   heroku config:set RECIPIENT_EMAIL=recipient@gmail.com
   heroku config:set NODE_ENV=production
   ```
4. Deploy:
   ```bash
   git push heroku main
   ```

### Option 2: Separate Frontend/Backend Deployment

#### Frontend (Vercel/Netlify)
1. **Vercel**: Connect GitHub repo, uses `vercel.json` config
2. **Netlify**: Deploy build folder or connect GitHub

Build command: `npm run build`
Publish directory: `build`

#### Backend (Railway/Render/Heroku)
Deploy only the backend with environment variables set.

### Option 3: Docker Deployment

Build and run with Docker:
```bash
# Build the image
docker build -t gf-app .

# Run the container
docker run -p 5000:5000 \
  -e EMAIL_USER=your-email@gmail.com \
  -e EMAIL_PASSWORD=your-app-password \
  -e RECIPIENT_EMAIL=recipient@gmail.com \
  -e NODE_ENV=production \
  gf-app
```

## 🔧 Configuration Files

- `Dockerfile`: Multi-stage Docker build
- `railway.json`: Railway deployment config
- `render.yaml`: Render deployment config
- `vercel.json`: Vercel frontend deployment
- `Procfile`: Heroku process file

## 🛠️ Available Scripts

```bash
npm run prod          # Build and start for production
npm run build         # Build React frontend
npm run server        # Start backend server
npm run dev           # Development mode (both frontend/backend)
npm run deploy:frontend  # Build frontend only
npm run deploy:backend   # Start backend only
```

## 🔒 Security Notes

1. Never commit `.env` files to git
2. Use App Passwords, not regular Gmail passwords
3. Set `NODE_ENV=production` in deployment
4. CORS is configured for common deployment domains
5. Regular security updates recommended

## 🌍 CORS Configuration

The backend automatically allows:
- `localhost:3000` and `localhost:3001` (development)
- `https://apply-rouge.vercel.app` (current Vercel deployment)
- Any URL set in `FRONTEND_URL` environment variable
- All origins in development mode

To add your domain, either:
1. Set `FRONTEND_URL` environment variable, or
2. Add your domain to the `allowedOrigins` array in `server/index.js`

## 📊 Health Check

All deployments include a health check endpoint:
```
GET /api/health
```

Returns server status, environment, and timestamp.

## 🐛 Troubleshooting

### "Email service not configured"
- Check all environment variables are set
- Ensure no placeholder values remain
- Restart the server after changes

### "Username and Password not accepted"
- Use Gmail App Password, not regular password
- Enable 2-Factor Authentication first
- Verify EMAIL_USER is complete Gmail address

### CORS Errors
- Add your frontend domain to CORS configuration
- Set FRONTEND_URL environment variable
- Check browser console for specific error details

### Application won't submit
- Verify backend server is running and accessible
- Check network tab in browser dev tools
- Ensure API endpoints are reachable

## 📱 Frontend Configuration

Update API endpoint in your React app:
```javascript
// In your React components, use:
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-domain.com' 
  : 'http://localhost:5000';
```

## 🎯 Recommended Deployment Stack

**Full-Stack (Easiest):**
- Railway or Render for full app deployment

**Separate (Most Flexible):**
- Vercel for frontend
- Railway/Render for backend

**Enterprise:**
- Docker containers on AWS/GCP/Azure
- Database for storing applications
- CDN for static assets

## 📋 Post-Deployment Testing

1. Visit your deployed URL
2. Test form submission with sample data
3. Verify email is received
4. Check health endpoint: `your-domain.com/api/health`
5. Test from different devices/browsers

---

🎉 **Your girlfriend application form is now live!** Share the URL and start receiving applications!