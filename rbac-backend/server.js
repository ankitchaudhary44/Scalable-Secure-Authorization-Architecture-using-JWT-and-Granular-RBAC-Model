const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose'); 

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully! '))
  .catch((err) => console.log('Database Connection Failed! ', err));

app.get('/', (req, res) => {
    res.send('RBAC is Working Perfectly');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} `);
});