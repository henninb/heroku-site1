const express = require('express')
const fetch = require('node-fetch')
// import fetch from 'node-fetch';
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
    // API code will be here
  const API_ENDPOINT = 'https://fixturedownload.com/feed/json/nhl-2022/minnesota-wild'
  //const API_ENDPOINT = 'https://catfact.ninja/fact'
  console.log(API_ENDPOINT)
  let response
  try {
    response = await fetch(API_ENDPOINT)
    data = await response.json()
    // handle response
  } catch (err) {
    console.log('failure caught');
    console.log(err);
    res.send(req,res,err,500);
  }
  res.send(data)
  //res.send("test")
})

app.listen(port, () => { console.log(`listening on port ${port}`) });
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.use(cors());

app.post('/api/login', (_req, res) => {
   res.send('api login POST called.');
});

