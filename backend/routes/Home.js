const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
    const dataPath = path.join(__dirname, '../data/Home.json');
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading personal info file:', err);
          res.status(500).send('Server Error');
          return;
        }
        try {
          const personalInfo = JSON.parse(data);
          res.json(personalInfo);
        } catch (parseError) {
          console.error('Error parsing personal info JSON:', parseError);
          res.status(500).send('Server Error');
        }
      });
});

module.exports = router;