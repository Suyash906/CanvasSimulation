const express = require('express');
const router = express.Router();
const connection = require('../db');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const IncomingForm = require('formidable').IncomingForm;

const storage = multer.diskStorage({
    destination: '../public/uploads/',
    filename: (request, file, callback) => {
        callback(null, `${file.fieldname} - ${Date.now()} `+path.extname(file.originalname), );

    }
});

var upload = multer({ storage:storage }).single('profileImage');


router.post('/', (req,res) => {
    form.on('file', (field, file) => {
        // Do something with the file
        // e.g. save it to the database
        // you can access it using file.path
      });
      form.on('end', () => {
        res.json();
      });
      form.parse(req);
});

module.exports = router;