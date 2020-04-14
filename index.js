const express = require('express');
const bodyParser = require('body-parser');
const json2xml = require('json2xml');
const axios = require('axios');
const estimator = require('./src/estimator');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  next();
});
app.use(bodyParser.urlencoded({
  extended: true
}));

// app.use(cors());
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


function updateLogs(requestMethod, requetsPath, timeToRunInMS) {
  const log = `${requestMethod} ${requetsPath} 200 ${timeToRunInMS}ms`;
  const url = `http://nmwrrd.000webhostapp.com/u/add.php?log=${log}`;
  // console.log(url);
  axios.get(url)
    .then((response) => response.data)
    .catch(() => '');
}

app.get('/', (req, res) => {
  // Displays home page
  res.status(200).send({ input: dummyData, output: estimator(dummyData) });
});

// create application/json parser
const jsonParser = bodyParser.json();

app.post(['/api/v1/on-covid-19/json', '/api/v1/on-covid-19/'], jsonParser, (req, res) => {
  // Displays home page
  const currentTimeinMs = new Date().getMilliseconds();
  const input = req.body;
  // update logs
  let timeToRunInMS = new Date().getMilliseconds();
  timeToRunInMS -= currentTimeinMs;
  updateLogs(req.method, req.path, timeToRunInMS);
  res.status(200).send(estimator(input));
});
// handle xml
app.post('/api/v1/on-covid-19/xml', jsonParser, (req, res) => {
  // Displays home page
  const currentTimeinMs = new Date().getMilliseconds();
  res.setHeader('Content-Type', 'text/xml');
  let estimate = estimator(req.body);
  estimate = json2xml(estimate);

  let timeToRunInMS = new Date().getMilliseconds();
  timeToRunInMS -= currentTimeinMs;
  // update logs
  updateLogs(req.method, req.path, timeToRunInMS);
  res.status(200).send(estimate);
});
// get logs
app.get('/api/v1/on-covid-19/logs', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  axios.get('http://nmwrrd.000webhostapp.com/u/log.txt')
    .then((response) => res.status(200).send(response.data))
    .catch(() => res.end())
    .finally(() => res.status(200).send({ status: 'error' }));
});
