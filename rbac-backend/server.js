const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose'); 
const authRoute = require('./routes/auth'); 
const userRoute = require('./routes/user');
const logRoute = require('./routes/log');

dotenv.config();

const app = express();


app.use(cors({
  origin: [
    "https://scalable-secure-authorization-archi.vercel.app", 
    "http://localhost:5173" 
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/logs', logRoute);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully!'))
  .catch((err) => console.log('Database Connection Failed!', err));

app.get('/', (req, res) => {
    res.send('RBAC System is Online and Secure 🛡️');
});

const PORT = process.env.PORT || 5001; 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});