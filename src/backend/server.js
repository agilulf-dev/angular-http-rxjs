const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors({ origin: 'http://localhost:4200' }));

// Endpoint /error: Returns a 404 error after 2000 ms delay
app.get('/error', (req, res) => {
  setTimeout(() => {
    res.status(404).send('Error 404: Page not found');
  }, 2000);
});

// Endpoint /data: Returns a JSON response after 'delay' param in ms
app.get('/data/:delay', (req, res) => {
  setTimeout(() => {
    const jsonData = { message: `Response message arrived after ${req.params.delay} ms` };
    res.json(jsonData);
  }, Number(req.params.delay));
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
