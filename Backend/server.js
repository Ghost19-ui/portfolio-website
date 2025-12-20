const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

// Connect to database immediately. 
// Mongoose manages the connection and buffers requests until it's ready.
connectDB(); 

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5173', // Vite default port (just in case)
  // IMPORTANT: You will need to add your ACTUAL Vercel Frontend URL here later
  // Example: 'https://portfolio-frontend-tushar.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if the origin is in the allowed list
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // Optional: Relax CORS for development if needed, or stick to strict:
      console.log('Blocked by CORS:', origin);
      callback(new Error('CORS not allowed'));
    }
  },
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.get('/', (req, res) => res.send('API running'));
app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/contact', require('./routes/contact'));

app.use(errorHandler);
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

// --- VERCEL SPECIFIC CONFIGURATION ---

// Only run app.listen if we are NOT in production (i.e., local development)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`✓ Local Server running on port ${PORT}`);
  });
}

// Export the app so Vercel can run it as a serverless function
module.exports = app;