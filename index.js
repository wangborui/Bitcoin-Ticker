//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var amount = req.body.amount;
  var baseUri = "https://apiv2.bitcoinaverage.com/convert/global";

  var options = {
    url: baseUri,
    method: "GET",
    qs:{
      from: crypto,
      to: fiat,
      amount: amount
    }
  };

  request(options, function (error, response, body) {
    var data = JSON.parse(body);
    var price = data.price;
    var currentDate = data.time;

    res.write("<p>Current date is " + currentDate + " </p> ");
    res.write("<h1>" + amount + crypto + " is: " + price + " " + fiat + " </h1>");
    res.send();
  });
});

app.listen(port, (req, res) => {
  console.log("Application is listening on port: " + port);
});
