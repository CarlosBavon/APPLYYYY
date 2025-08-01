# ✅ Render Deployment Checklist

## Before You Start
- [ ] Your code is pushed to GitHub
- [ ] You have a Gmail account
- [ ] You have a GitHub account

## Step 1: Gmail App Password Setup
- [ ] Go to [Google Account Settings](https://myaccount.google.com/)
- [ ] Enable 2-Factor Authentication (Security → 2-Step Verification)
- [ ] Create App Password (Security → App passwords → Mail → Other)
- [ ] Save the 16-character password (you'll need it!)

## Step 2: Render Account Setup
- [ ] Go to [render.com](https://render.com)
- [ ] Sign up with GitHub
- [ ] Authorize Render to access your repositories

## Step 3: Deploy Your App
- [ ] Click **New +** → **Web Service**
- [ ] Connect your `gf-app` repository
- [ ] Verify settings:
  - Name: `gf-app`
  - Environment: `Node`
  - Plan: `Free`
  - Build Command: `npm ci && npm run build`
  - Start Command: `npm run server`

## Step 4: Environment Variables
Add these in Render dashboard:

- [ ] **EMAIL_USER**: `your-email@gmail.com`
- [ ] **EMAIL_PASSWORD**: `your-16-char-app-password`
- [ ] **RECIPIENT_EMAIL**: `where-emails-go@gmail.com`
- [ ] **NODE_ENV**: `production`

## Step 5: Deploy & Test
- [ ] Click **Create Web Service**
- [ ] Wait for build to complete
- [ ] Get your URL: `https://gf-app-xxxx.onrender.com`
- [ ] Test health check: `/api/health`
- [ ] Test the form submission
- [ ] Check email delivery

## 🎉 Success!
- [ ] Share your URL with friends
- [ ] Monitor for any issues
- [ ] Celebrate! 🎊

---

**Your URL will be**: `https://gf-app-xxxx.onrender.com`

**Need help?** Check `RENDER_DEPLOYMENT.md` for detailed instructions!