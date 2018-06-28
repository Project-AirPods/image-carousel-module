const express = require('express');

const path = require('path');

const app = express();

const db = require('../database-mysql/index.js');

// app.use('/', express.static(path.join(__dirname, '../public/')));
app.use('/listings/:id', express.static(path.join(__dirname, '../public/')));

// app.get('/listings/:listingId', (req, res) => {
//   db.getListingData(req.params.listingId, (err, listingData) => {
//     if (err) {
//       res.status(404).send('error in getting data from db', err);
//     } else if (listingData) {
//       res.header('Access-Control-Allow-Origin', '*');
//       console.log('listingData', listingData);
//       res.status(200).send(listingData);
//     }
//   });
// });

app.get('/listings/:listingId/pictures', (req, res) => {
  db.getPictureData(req.params.listingId, (err, pictureData) => {
    if (err) {
      res.status(404).send('error retrieving photos from database', err);
    } else if (pictureData) {
      res.header('Access-Control-Allow-Origin', '*');
      res.status(200).send(pictureData);
    }
  });
});

// POST
app.post('/listings/:listingId/pictures', (req, res) => {});

// DELETE
app.delete('/listings/:listingId/pictures', (req, res) => {});

// PUT
app.put('/listings/:listingId/pictures', (req, res) => {});

module.exports = app;
