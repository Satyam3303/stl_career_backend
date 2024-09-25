const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const jsonSyntaxErrorHandler = require('./app/utils/syntaxErrorHandler');

//.env File contains the Sensitive Information
require('dotenv').config('.env');
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


app.listen(port, () => {
  console.log(`Server app listening on port ${port}!`);
});