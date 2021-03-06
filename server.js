const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// connect DB
connectDB();

// Define port
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Define Routes
app.use('/api/addForm', require('./routes/forms'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
