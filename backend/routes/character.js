const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
    const dataPath = path.join(__dirname, '../data/character.json');
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erreur lors de la lecture du fichier JSON :', err);
            res.status(500).send('Erreur Serveur');
            return;
        }
        try {
            const histoireData = JSON.parse(data);
            res.json(histoireData);
        } catch (error) {
            console.error('Erreur de parsing JSON :', error);
            res.status(500).send('Erreur Serveur');
        }
    });
});

module.exports = router;
