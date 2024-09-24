
const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/resumes'); // Ensure this path is correct and exists
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Naming the file
    },
  });
  
// Initialize upload
const upload = multer({ storage: storage });

module.exports = upload;