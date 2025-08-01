# 🚀 Deploy to Render - Complete Step-by-Step Guide

## 📋 Prerequisites

- [x] Code ready for deployment (✅ already done!)
- [ ] GitHub account with your repository
- [ ] Gmail account for email functionality
- [ ] Render account (free)

## 🎯 Step 1: Prepare Your Repository

### 1.1 Commit Your Changes
```bash
git add .
git commit -m "Add Render deployment configuration"
git push origin main
```

### 1.2 Verify Repository Structure
Your repo should have these files (✅ already present):
- `render.yaml` - Render deployment config
- `server/index.js` - Backend server
- `package.json` - Dependencies and scripts
- `build/` - React build files (created during deployment)

## 🎯 Step 2: Set Up Gmail App Password

### 2.1 Enable 2-Factor Authentication
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click **Security** in left sidebar
3. Under "How you sign in to Google", click **2-Step Verification**
4. Follow setup instructions if not already enabled

### 2.2 Create App Password
1. In Google Account Settings → **Security**
2. Click **App passwords** (under 2-Step Verification)
3. Select **Mail** from dropdown
4. Select **Other (Custom name)**
5. Type "Girlfriend App" or similar
6. Click **Generate**
7. **Save the 16-character password** - you'll need it for Render!

## 🎯 Step 3: Create Render Account & Deploy

### 3.1 Sign Up for Render
1. Go to [render.com](https://render.com)
2. Click **Sign Up**
3. Choose **GitHub** sign-in option
4. Authorize Render to access your repositories

### 3.2 Create New Web Service
1. In Render dashboard, click **New +**
2. Select **Web Service**
3. Choose **Connect a repository**
4. Find and select your `gf-app` repository
5. Click **Connect**

### 3.3 Configure Deployment Settings

Render will auto-detect your settings from `render.yaml`, but verify:

**Basic Settings:**
- **Name**: `gf-app` (or your preferred name)
- **Environment**: `Node`
- **Plan**: `Free` 
- **Branch**: `main`

**Build & Deploy:**
- **Build Command**: `npm ci && npm run build`
- **Start Command**: `npm run server`

**Advanced:**
- **Health Check Path**: `/api/health`

### 3.4 Set Environment Variables

In the Render dashboard, scroll to **Environment Variables** section:

Click **Add Environment Variable** for each:

1. **EMAIL_USER**
   - Value: `your-email@gmail.com` (your actual Gmail)

2. **EMAIL_PASSWORD** 
   - Value: `your-16-char-app-password` (from Step 2.2)

3. **RECIPIENT_EMAIL**
   - Value: `recipient@gmail.com` (where applications go)

4. **NODE_ENV**
   - Value: `production`

5. **PORT** (auto-set by Render)
   - Value: `10000`

### 3.5 Deploy!
1. Click **Create Web Service**
2. Render will start building your app
3. Watch the build logs in real-time
4. Wait for "Your service is live" message

## 🎯 Step 4: Test Your Deployment

### 4.1 Get Your URL
After deployment, you'll get a URL like:
```
https://gf-app-xxxx.onrender.com
```

### 4.2 Test Health Check
Visit: `https://your-app.onrender.com/api/health`

Should return:
```json
{
  "status": "Server is running!",
  "environment": "production",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### 4.3 Test the Application
1. Visit your main URL: `https://your-app.onrender.com`
2. Fill out the girlfriend application form
3. Submit the form
4. Check your email for the application!

## 🎯 Step 5: Custom Domain (Optional)

### 5.1 Add Custom Domain
1. In Render dashboard → your service
2. Go to **Settings** tab
3. Scroll to **Custom Domains**
4. Click **Add Custom Domain**
5. Enter your domain (e.g., `myapp.com`)
6. Follow DNS setup instructions

### 5.2 Update CORS (if using custom domain)
Add your domain to the backend CORS:

```javascript
// In server/index.js
const allowedOrigins = [
  'http://localhost:3000',
  'https://apply-rouge.vercel.app',
  'https://your-custom-domain.com', // Add your domain
  process.env.FRONTEND_URL,
];
```

## 🔧 Troubleshooting

### Build Failed
**Check build logs for:**
- Missing dependencies → Run `npm install` locally first
- Node version issues → Render uses Node 18+ by default

### "Email service not configured"
**Check environment variables:**
- EMAIL_USER has your full Gmail address
- EMAIL_PASSWORD is the 16-char App Password (not regular password)
- RECIPIENT_EMAIL is set correctly

### "Username and Password not accepted"
**Email authentication issues:**
- Use App Password, not regular Gmail password
- Ensure 2FA is enabled first
- Check EMAIL_USER is complete address (not just username)

### App loads but form doesn't submit
**API connectivity issues:**
- Check browser console for errors
- Verify `/api/health` endpoint works
- Check CORS errors in browser dev tools

### Free Tier Limitations
**Render Free Plan:**
- Apps sleep after 15 minutes of inactivity
- Takes ~30 seconds to wake up
- 750 hours/month runtime limit
- No custom domains on free plan

## 🎉 Success!

### Your app is now live at:
```
https://your-app-name.onrender.com
```

### Features working:
- ✅ React frontend served
- ✅ Node.js backend API
- ✅ Email notifications
- ✅ Form submissions
- ✅ Mobile responsive
- ✅ HTTPS enabled
- ✅ Health monitoring

## 📊 Monitoring & Maintenance

### Render Dashboard Features:
- **Logs**: Real-time application logs
- **Metrics**: CPU, memory, response times
- **Health Checks**: Automatic health monitoring
- **Deploy History**: Roll back to previous versions

### Auto-Deploy:
Render automatically redeploys when you push to GitHub!

```bash
# Make changes locally
git add .
git commit -m "Update application"
git push origin main
# Render automatically deploys! 🚀
```

## 🎯 Next Steps

1. **Share your URL** with friends to test
2. **Monitor email delivery** and form submissions  
3. **Customize the form** questions as needed
4. **Add analytics** (Google Analytics, etc.)
5. **Upgrade to paid plan** for custom domain + no sleeping

Your girlfriend application form is now **LIVE ON RENDER**! 🎉

---

**Need help?** Check the troubleshooting section or Render's excellent documentation.