const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;
const countryData = {};
const exposedInfo = {
  'currency': 'currency_code',
  'nationality': 'nationality',
  'is_eu_member': 'eu_member'
};

app.get('/', (req, res) => {
  res.send("Available info: " + Object.keys(exposedInfo))
});

app.get('/:id', (req, res) => {
  if (exposedInfo[req.params.id] === undefined) {
    res.status(404);
    res.json({error: 'Not found'});
    return;
  }
  res.send(countryData['data'][exposedInfo[req.params.id]])
});

const server = app.listen(port, () => {
  fs.readFile('info.json', 'utf8', (err, data) => {
    if (err) {
      console.error('error reading country info: ', err);
      server.close();
      return;
    }
    data = JSON.parse(data);
    let keys = Object.keys(data);
    countryData['data'] = data[keys[0]];
  });
});