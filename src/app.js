const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config('.env');

const jsonSyntaxErrorHandler = require('./app/utils/syntaxErrorHandler');

const app = express();
const port = process.env.PORT;
//const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./app/routes/jobRoutes');
const applicantRoutes = require('./app/routes/applicantRoutes');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Use the external JSON syntax error handler middleware
app.use(jsonSyntaxErrorHandler);

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
  console.log(`Server app listening on port ${port}!`);
});