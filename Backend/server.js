const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

// Connect to database immediately.
connectDB();

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5173',
  'https://portfolio-seven-black-as1mezo05.vercel.app', // <--- I ADDED THIS FOR YOU
  'https://portfolio-cgpo.vercel.app' // Added your backend URL just in case
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.get('/', (req, res) => res.send('API running'));
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Note: I also updated the path slightly to match standard conventions
// If your previous paths were /api/v1/auth, make sure these match!
// Based on your previous code, these look correct:
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/projects', require('./routes/projects'));
app.use('/api/v1/contact', require('./routes/contact'));

app.use(errorHandler);
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`✓ Local Server running on port ${PORT}`);
  });
}

module.exports = app;