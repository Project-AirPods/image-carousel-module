require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const { Client } = require('pg');
const { POSTGRES_BASE_URI } = require('../config');
const client = new Client({
  host: POSTGRES_BASE_URI,
  port: '5432',
  database: 'project_airpods_carousel',
  user: 'postgres',
  password: 'password'
});

client
  .connect()
  .then(() => console.log('Database connected!'))
  .catch(err => console.log('ERROR:', err));

const app = express();

app.use(cors());

// bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', express.static(path.join(__dirname, '../public/')));
app.use('/listings/:id', express.static(path.join(__dirname, '../public/')));

app.get('/listings/:listingId/pictures', async (req, res) => {
  const { listingId } = req.params;
  try {
    const result = await client.query(
      `SELECT rp.id , rp.listing_id, l.name, rp.src, rp.caption FROM reference_pics as rp JOIN listings as l ON l.id = rp.listing_id WHERE rp.listing_id=${listingId};`
    );
    res.send(result.rows);
  } catch (error) {
    res.header('Access-Control-Allow-Origin', '*');
    res.json({error: 'Failed to perform request'})
  }
});

app.get('/listings/:listingId/name', async (req, res) => {
  const { listingId } = req.params;
  const result = await client.query(
    `SELECT * FROM listings WHERE id=${listingId};`
  );
  res.send(result.rows[0]||[]);
});

// POST
app.post('/listings/:listingId/name', async (req, res) => {
  const { listingId } = req.params;
  const { name } = req.body;
  try {
    const result = await client.query(
      `INSERT INTO listings (id, name) VALUES (${listingId}, '${name}');`
    );
    return res.status(200).json({ status: 'success' });
  } catch (error) {
    return res.status(404).send({ error: error.detail });
  }
});

// PUT
app.put('/listings/:listingId/name', async (req, res) => {
  const { listingId } = req.params;
  const { name } = req.body;

  try {
    const result = await client.query(
      `UPDATE listings SET name = '${name}' WHERE id = ${listingId};`
    );
    console.log('result', result);
    return res.status(200).json({ status: 'success' });
  } catch (error) {
    return res.status(404).send({ error: error.detail });
  }
});

// DELETE
app.delete('/listings/:listingId/name', async (req, res) => {
  const { listingId } = req.params;
  const { name } = req.body;

  try {
    const result = await client.query(
      `DELETE FROM listings WHERE id = ${listingId};`
    );
    console.log('result', result);
    return res.status(200).json({ status: 'delete listing name successfully' });
  } catch (error) {
    return res.status(404).send({ error: error.detail });
  }
});

app.listen(3004, () => {
  console.log('Example App listening on port 3004');
});
