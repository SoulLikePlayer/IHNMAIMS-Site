const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const homeRouter = require('./routes/Home');
const histoireRouter = require('./routes/histoire');
const characterRouter = require('./routes/character');


app.use('/api/home', homeRouter);
app.use('/api/histoire', histoireRouter);
app.use('/api/character', characterRouter);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
