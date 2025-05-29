const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const PORT = 5005;
const cors = require('cors');
const mongoose = require('mongoose');
const Cohorts = require('./models/cohorts.model');
const Students = require('./models/students.model');

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get('/', (req, res) => {
  res.send('Welcome to the Cohort Tools API');
});
app.get('/api/cohorts', async (req, res) => {
  try {
    const allCohorts = await Cohorts.find();
    res.json(allCohorts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cohorts' });
  }
});
app.get('/api/students', async (req, res) => {
  try {
    const allStudents = await Students.find();
    res.json(allStudents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students' });
  }
});
// DATABASE CONNECTION
mongoose
  .connect('mongodb://0.0.0.0:27017/cohort-tools-api')
  .then(() => {
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
