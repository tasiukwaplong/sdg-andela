const express = require('express');
const estimator = require('./src/estimator');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  next();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);
// dummy data for testing
const dummyData = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 4,
    avgDailyIncomePopulation: 0.73
  },
  periodType: 'days',
  timeToElapse: 38,
  reportedCases: 2747,
  population: 92931687,
  totalHospitalBeds: 678874
};

app.get('/', (req, res) => {
  // Displays home page
  res.status(200).send({ input: dummyData, output: estimator(dummyData) });
});

app.get('/api/v1/on-covid-19', (req, res) => {
  // Displays home page
  res.status(200).send(req.param.j);
});
