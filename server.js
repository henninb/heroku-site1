const express = require('express')
const fetch = require('node-fetch')
//const cors = require('cors');
//const bodyParser = require('body-parser');

const port = process.env.PORT || 3000
const app = express()

app.use((request, response, next) => {
  console.log("set header");
  response.header("x-powered-by", "ExpressServer");
  next();
});

app.get('/api/hockey', async (req, res, next) => {
  const API_ENDPOINT = 'https://fixturedownload.com/feed/json/nhl-2022/minnesota-wild'
  let response
  try {
    response = await fetch(API_ENDPOINT)
    data = await response.json()
  } catch (err) {
    res.send(req,res,err,500);
  }
  res.send(data)
})

app.get('/api/cat-facts', async (req, res, next) => {
  const API_ENDPOINT = 'https://catfact.ninja/fact'
  let response
  try {
    data = await response.json()
  } catch (err) {
    res.send(req,res,err,500);
  }
  res.send(data)
})

app.get('/api/baseball', async (req, res, next) => {
  const year =  new Date().getFullYear()
  const url = new URL('https://statsapi.mlb.com/api/v1/schedule')
  const params = {
        startDate: "1/01/" + year,
        endDate: "12/31/" + year,
        gameTypes: "R",
        sportId: "1",
        teamId: "142",
        hydrate:"decisions",
  }

  url.search = new URLSearchParams(params).toString()
  let response
  try {
    response = await fetch(url.toString())
    data = await response.json()
  } catch (err) {
    res.send(req,res,err,500);
  }
  res.send(data)
})

app.listen(port, () => { console.log(`listening on port ${port}`) });
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.use(cors());

app.post('/api/login', (_req, res) => {
   res.send('api login POST called.');
});

