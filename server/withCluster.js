var cluster = require('cluster');

if (cluster.isMaster) {
  var numWorkers = require('os').cpus().length;

  console.log('Master cluster setting up ' + numWorkers + ' workers...');

  for (var i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on('online', function(worker) {
    console.log('Worker ' + worker.process.pid + ' is online');
  });

  cluster.on('exit', function(worker, code, signal) {
    console.log(
      'Worker ' +
        worker.process.pid +
        ' died with code: ' +
        code +
        ', and signal: ' +
        signal
    );
    console.log('Starting a new worker');
    cluster.fork();
  });
} else {
  require('newrelic');

  const express = require('express');
  // const bodyParser = require('body-parser');

  const app = express();
  // bodyParser middleware
  // app.use(bodyParser.json());
  // app.use(bodyParser.urlencoded({ extended: false }));

  const redis = require('redis');
  const util = require('util');
  const redisURL = 'redis://127.0.0.1:6379';
  const cacheClient = redis.createClient(redisURL);
  cacheClient.on('error', function(err) {
    console.log('Error ' + err);
  });
  cacheClient.get = util.promisify(cacheClient.get);

  const path = require('path');
  const { Client } = require('pg');
  const client = new Client({
    host: 'localhost',
    port: '5432',
    database: 'project-airpods-carousel'
  });
  client
    .connect()
    .then(() => {
      console.log('Database connected!');

      // app.use('/', express.static(path.join(__dirname, '../public/')));
      app.use(
        '/listings/:id',
        express.static(path.join(__dirname, '../public/'))
      );

      app.get('/listings/:listingId/pictures', async (req, res) => {
        const { listingId } = req.params;
        // try {
        //   const result = await client.query(
        //     `SELECT rp.id , rp.listing_id, l.name, rp.src, rp.caption FROM reference_pics as rp JOIN listings as l ON l.id = rp.listing_id WHERE rp.listing_id=${listingId};`
        //   );
        //   res.send(result.rows);
        // } catch (error) {
        //   res.json({ error: 'Failed to perform request' })
        // }
        const cachedData = await cacheClient.get(`${listingId}`);
        // console.log('cachedData', cachedData);
        if (!cachedData) {
          // console.log('Cache missed!')
          client
            .query(
              `SELECT rp.id , rp.listing_id, l.name, rp.src, rp.caption FROM reference_pics as rp JOIN listings as l ON l.id = rp.listing_id WHERE rp.listing_id=${listingId};`
            )
            .then(result => {
              cacheClient.set(`${listingId}`, JSON.stringify(result.rows));
              return res.send(result.rows);
            })
            .catch(() => res.json({ error: 'Failed to perform request' }));
        } else {
          // console.log('Cache hit!')
          return res.send(JSON.parse(cachedData));
        }
      });

      // app.get('/listings/:listingId/name', async (req, res) => {
      //   const { listingId } = req.params;
      //   const result = await client.query(
      //     `SELECT * FROM listings WHERE id=${listingId};`
      //   );
      //   res.send(result.rows[0] || []);
      // });

      // // POST
      // app.post('/listings/:listingId/name', async (req, res) => {
      //   const { listingId } = req.params;
      //   const { name } = req.body;
      //   try {
      //     const result = await client.query(
      //       `INSERT INTO listings (id, name) VALUES (${listingId}, '${name}');`
      //     );
      //     return res.status(200).json({ status: 'success' });
      //   } catch (error) {
      //     return res.status(404).send({ error: error.detail });
      //   }
      // });

      // // PUT
      // app.put('/listings/:listingId/name', async (req, res) => {
      //   const { listingId } = req.params;
      //   const { name } = req.body;

      //   try {
      //     const result = await client.query(
      //       `UPDATE listings SET name = '${name}' WHERE id = ${listingId};`
      //     );
      //     console.log('result', result);
      //     return res.status(200).json({ status: 'success' });
      //   } catch (error) {
      //     return res.status(404).send({ error: error.detail });
      //   }
      // });

      // // DELETE
      // app.delete('/listings/:listingId/name', async (req, res) => {
      //   const { listingId } = req.params;
      //   const { name } = req.body;

      //   try {
      //     const result = await client.query(
      //       `DELETE FROM listings WHERE id = ${listingId};`
      //     );
      //     console.log('result', result);
      //     return res.status(200).json({ status: 'delete listing name successfully' });
      //   } catch (error) {
      //     return res.status(404).send({ error: error.detail });
      //   }
      // });

      app.listen(3004, () => {
        console.log('Example App listening on port 3004');
      });
    })
    .catch(err => console.log('ERROR:', err));
}
