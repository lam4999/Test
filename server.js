const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const todoRoutes = require('./routes/route');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Routes
app.use('/todos', todoRoutes);

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('kết nối thành công');
    const port = process.env.PORT || 3000;
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  })
  .catch(err => console.log(err));
