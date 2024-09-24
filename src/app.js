const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('../utils/logger'); 
require('dotenv').config('.env');

const app = express();
const port = process.env.PORT;
//const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('../routes/jobRoutes');
const applicantRoutes = require('../routes/applicantRoutes');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


// Handle syntax errors in JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    logger.error(`Invalid JSON format: ${err.message}`);
    return res.status(400).json({
      status_code: 400,
      success: false,
      message: 'Invalid JSON format',
      error: err.message,
    });
  }
  next(err); 
});


// Route handling
//app.use('/api/user/v1', userRoutes);
app.use('/api/job', jobRoutes);
app.use('/api/applicant/v1', applicantRoutes);


app.use((err, req, res, next) => {
  logger.error(`Error ${err.status || 500}: ${err.message}`);
  res.status(err.status || 500).send({
    status_code: err.status || 500,
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

app.listen(port, () => {
  logger.info(`Server app listening on port ${port}!`);
  console.log(`Server app listening on port ${port}!`);
});
