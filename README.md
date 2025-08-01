# 💕 Girlfriend Application Form

A fun and interactive React application where potential partners can submit their "girlfriend application" which gets sent directly to your email!

![Girlfriend Application Form](https://img.shields.io/badge/React-19.1.1-blue) ![Node.js](https://img.shields.io/badge/Node.js-Backend-green) ![Email](https://img.shields.io/badge/Email-Nodemailer-red)

## 🎯 Features

- **Interactive Application Form** with fun questions about:
  - Personal details (name, age, Instagram, zodiac sign)
  - Relationship skills (cuddling rating, pun tolerance)
  - Scenario responses (shower singing, ideal dates)
  - References (pet approval)

- **Email Integration** that sends formatted applications to your inbox
- **Beautiful UI** with modern design and responsive layout
- **Form Validation** with required fields and input validation
- **Real-time Feedback** for successful submissions and errors

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd gf-app
npm install
```

### 2. Configure Email Settings
Copy the example environment file and add your credentials:
```bash
cp .env.example .env
```

Edit `.env` with your Gmail credentials:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
RECIPIENT_EMAIL=where-to-receive-applications@gmail.com
PORT=5000
```

### 3. Get Gmail App Password
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Enable **2-Step Verification** (Security → 2-Step Verification)
3. Go to **App passwords** (Security → App passwords)
4. Select **Mail** → **Other** → Name it "Girlfriend App"
5. Copy the 16-character password to your `.env` file

### 4. Run the Application
```bash
# Run both frontend and backend
npm run dev

# Or run separately:
npm run server  # Backend only (port 5000)
npm start       # Frontend only (port 3000)
```

Visit: http://localhost:3000

## 📧 Email Format

When someone submits an application, you'll receive a beautifully formatted email with:

```
🎉 NEW GIRLFRIEND APPLICATION RECEIVED! 🎉

📝 PERSONAL DETAILS:
• Name: Sarah Johnson
• Age: 25
• Instagram: @sarahj_adventures
• Zodiac Sign: ♌ Leo

⭐ SKILLS & QUALIFICATIONS:
• Cuddling Strength: 4/5 ⭐
• Pun Tolerance: 3/5 😂
• Willing to Share Food: ✅ Yes (keeper!)
• Can Handle Weirdness: ✅ Yes (perfect!)

💑 SCENARIO RESPONSES:
• Shower Singing Reaction: 🎵 Join in harmoniously
• Ideal Date: 🍕 Netflix + takeout

🐾 REFERENCES:
• Pet Approval: ✅ Yes (dogs votes count double!)

📜 TERMS & CONDITIONS:
• Agreed to Terms: ✅ Accepted all conditions

Time to review this potential match! 💕
```

## 🛠️ Tech Stack

**Frontend:**
- React 19.1.1
- React Router DOM
- CSS3 with custom styling

**Backend:**
- Node.js with Express
- Nodemailer for email sending
- CORS for cross-origin requests
- dotenv for environment variables

## 📁 Project Structure

```
gf-app/
├── public/              # Static files
├── src/
│   ├── components/      # CSS stylesheets
│   ├── pages/
│   │   ├── applyForm.js # Main application form
│   │   ├── homePage.js  # Home page
│   │   └── qualifications.js
│   └── App.js           # Main app component
├── server/
│   └── index.js         # Express backend server
├── .env.example         # Environment template
├── .env                 # Your credentials (not in git)
└── package.json         # Dependencies and scripts
```

## 🎨 Customization

### Change Email Provider
Edit `server/index.js` to use different email services:

```javascript
// Gmail (default)
service: 'gmail'

// Outlook
service: 'outlook'

// Yahoo
service: 'yahoo'

// Custom SMTP
host: 'smtp.yourdomain.com',
port: 587,
secure: false
```

### Modify Form Questions
Edit `src/pages/applyForm.js` to add/remove questions or change options.

### Update Styling
Modify CSS files in `src/components/` to change the appearance.

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
npm run build
# Deploy the 'build' folder
```

### Backend (Heroku/Railway/Render)
1. Set environment variables in your hosting platform
2. Use `npm run server` as the start command
3. Ensure PORT environment variable is set

### Full Stack (Railway/Render)
Add a `Procfile`:
```
web: npm run server
```

## 🔒 Security Notes

- Never commit your `.env` file to git
- Use App Passwords, not regular Gmail passwords
- The `.env` file is already in `.gitignore`
- Consider using environment variables in production

## 🐛 Troubleshooting

### "Email service configured for: Not configured"
- Check your `.env` file has real values (not placeholders)
- Ensure `.env` is in the root directory
- Restart the server after changing `.env`

### "Username and Password not accepted"
- Use an App Password, not your regular Gmail password
- Enable 2-factor authentication first
- Check EMAIL_USER is your full Gmail address

### "Failed to submit application"
- Ensure backend server is running on port 5000
- Check browser console for detailed error messages
- Verify CORS is properly configured

## 📝 Scripts

```bash
npm start          # Start React frontend (port 3000)
npm run server     # Start Express backend (port 5000)
npm run dev        # Start both frontend and backend
npm run build      # Build for production
npm test           # Run tests
```

## 🎉 Contributing

Feel free to fork this project and make it your own! Some ideas:
- Add more fun questions
- Implement a scoring system
- Add photo upload capability
- Create an admin dashboard
- Add SMS notifications

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Made with 💕 for finding love in the digital age!
