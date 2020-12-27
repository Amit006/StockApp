var express = require('express');
var router = express.Router();
var WebSocketServer = require('websocket').server;
const finnhub = require('finnhub');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

/* GET home page. */
router.get('/', function(req, res, next) {

  const request = require('request');

  request('https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=1&from=1605543327&to=1605629727&token=bvjdkk748v6vdbel42sg', { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body.explanation);
  });

  res.render('index', { title: 'Express' });
});



router.get('/webscoket', (req, res, next ) => {
  
const socket = new WebSocketServer('wss://ws.finnhub.io?token=bvjdkk748v6vdbel42sg');

// Connection opened -> Subscribe
socket.addEventListener('open', function (event) {
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'IC MARKETS:1'}))
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});

// Unsubscribe
 var unsubscribe = function(symbol) {
    socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
}

})

router.get('/getStockData', (req, res) => {
  const api_key = finnhub.ApiClient.instance.authentications['api_key'];
  api_key.apiKey = "bvjdkk748v6vdbel42sg" // Replace this
  const finnhubClient = new finnhub.DefaultApi()
// Company EPS estimates
finnhubClient.companyNews("AAPL", "2020-01-01", "2020-05-01", (error, data, response) => {
  if (error) {
      console.error(error);
  } else {
      console.log(data)
  }
});
})




module.exports = router;
