const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const pollRoutes = require('./routes/polls');
const ussdRoutes = require('./routes/ussd');  // Fix: make the variable name consistent

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/ussd', ussdRoutes);  // Fix: use ussdRoutes
app.use('/api/auth', authRoutes);
app.use('/api/polls', pollRoutes);
app.use('/api/ussd', ussdRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(5000, () => console.log('Server running on port 5000'));
}).catch(err => console.error(err));
