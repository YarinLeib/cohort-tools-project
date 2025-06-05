const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();
const PORT = 5005;
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

// ROOT ROUTE
app.get('/', (req, res) => {
  res.send('Welcome to the Cohort Tools API');
});

const cohortsRouter = require('./routes/Cohort.routes');
app.use('/api/cohorts', cohortsRouter);

const studentsRouter = require('./routes/Students.routes');
app.use('/api/students', studentsRouter);

// MIDDLEWARE FOR ERROR HANDLING
app.use(notFoundHandler);
app.use(errorHandler);

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
