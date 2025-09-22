const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const carRoutes = require('./routes/carRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const path = require('path'); // Make sure path is required at the top
const uploadRoutes = require('./routes/uploadRoutes'); // Import upload routes

dotenv.config();
connectDB();
const app = express();

const corsOptions = {
  origin: ['http://localhost:5173', 'https://your-netlify-app-name.netlify.app']
};
app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from VSS Backend!');
});

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use('/api/cars', carRoutes);

app.use('/api/bookings', bookingRoutes);

app.use('/api/upload', uploadRoutes);

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));