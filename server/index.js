const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  'http://localhost:3000', // Local development
  'http://localhost:3001',
  'https://apply-rouge.vercel.app', // Vercel deployment
  process.env.FRONTEND_URL, // From environment variable
  // Add your production domain here
].filter(Boolean); // Remove any undefined values

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Serve static files from the React app build directory in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
}

// Validate environment variables
const validateEnvVars = () => {
  const required = ['EMAIL_USER', 'EMAIL_PASSWORD', 'RECIPIENT_EMAIL'];
  const missing = required.filter(key => !process.env[key] || process.env[key].includes('your-'));

  if (missing.length > 0) {
    console.warn(`⚠️ Missing or placeholder environment variables: ${missing.join(', ')}`);
    console.warn('📧 Email service will not work until these are configured properly.');
    return false;
  }
  return true;
};

// Email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Format email content
const formatApplicationData = (data) => {
  const zodiacEmojis = {
    aries: '♈', taurus: '♉', gemini: '♊', cancer: '♋',
    leo: '♌', virgo: '♍', libra: '♎', scorpio: '♏',
    sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓'
  };

  return `
    🎉 NEW GIRLFRIEND APPLICATION RECEIVED! 🎉

    📝 PERSONAL DETAILS:
    • Name: ${data.name}
    • Age: ${data.age}
    • Instagram: ${data.instagram || 'Not provided'}
    • Zodiac Sign: ${zodiacEmojis[data.zodiac] || ''} ${data.zodiac ? data.zodiac.charAt(0).toUpperCase() + data.zodiac.slice(1) : 'Not selected'}

    ⭐ SKILLS & QUALIFICATIONS:
    • Cuddling Strength: ${data.cuddleRating}/5 ⭐
    • Pun Tolerance: ${data.punTolerance}/5 😂
    • Willing to Share Food: ${data.sharesFood ? '✅ Yes (keeper!)' : '❌ No (red flag?)'}
    • Can Handle Weirdness: ${data.handlesWeirdness ? '✅ Yes (perfect!)' : '❌ No (might be a problem)'}

    💑 SCENARIO RESPONSES:
    • Shower Singing Reaction: ${
      data.showerSingingReaction === 'join' ? '🎵 Join in harmoniously' :
      data.showerSingingReaction === 'record' ? '📱 Record and blackmail later' :
      '🤐 Pretend to hear nothing'
    }
    • Ideal Date: ${
      data.idealDate === 'netflix' ? '🍕 Netflix + takeout' :
      data.idealDate === 'roadtrip' ? '🚗 Spontaneous road trip' :
      '🍽️ Fancy dinner (with pajamas underneath)'
    }

    🐾 REFERENCES:
    • Pet Approval: ${data.petApproval ? '✅ Yes (dogs votes count double!)' : '❌ No pets approval'}

    📜 TERMS & CONDITIONS:
    • Agreed to Terms: ${data.terms ? '✅ Accepted all conditions' : '❌ Not accepted'}

    ---

    📧 Submitted on: ${new Date().toLocaleString()}
  `;
};

// API endpoint
app.post('/api/apply', async (req, res) => {
  const data = req.body;
  console.log('Received application:', data);

  // Basic validation
  if (!data.name || !data.age || !data.terms) {
    return res.status(400).json({
      error: 'Missing required fields: name, age, or terms not accepted'
    });
  }

  // Check environment vars
  if (!validateEnvVars()) {
    return res.status(500).json({
      error: 'Email service not configured',
      details: 'Set EMAIL_USER, EMAIL_PASSWORD, and RECIPIENT_EMAIL in .env'
    });
  }

  try {
    const transporter = createTransporter();
    const emailText = formatApplicationData(data);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: `💕 New Girlfriend Application from ${data.name}`,
      text: emailText,
      html: emailText.replace(/\n/g, '<br>')
    };

    await transporter.sendMail(mailOptions);

    console.log(`📧 Application email sent to: ${process.env.RECIPIENT_EMAIL}`);

    res.status(200).json({
      success: true,
      message: 'Application submitted and email sent!'
    });

  } catch (err) {
    console.error('❌ Email sending failed:', err.message);

    let errorMessage = 'Failed to send email.';
    if (err.message.includes('Invalid login')) {
      errorMessage = 'Email auth failed. Use a Gmail App Password.';
    } else if (err.message.includes('ENOTFOUND')) {
      errorMessage = 'Internet issue: check your connection.';
    }

    res.status(500).json({
      error: errorMessage,
      details: err.message
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running!',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Serve React app for all non-API routes in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}

// Start server
const envValid = validateEnvVars();

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  if (!envValid) {
    console.warn('\n🔧 Fix your .env file:\n1. Copy `.env.example` → `.env`\n2. Replace placeholders\n3. Restart server\n');
  } else {
    console.log(`📧 Email service active for: ${process.env.RECIPIENT_EMAIL}`);
  }
});
