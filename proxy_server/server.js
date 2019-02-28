var express = require ("express");
var fse = require ("fs-extra");
var log4js = require ("log4js");

var server = express ();
log4js.configure ({
  appenders: {
    out: {type: "console"}
  },
  categories: {
    default: {appenders: ["out"], level: "debug"}
  }
});

var logger = log4js.getLogger ("out");

server.use (express.json ({strict: false}));  //support json encoded bodies
server.use (express.urlencoded ());  //support encoded bodies
server.use (log4js.connectLogger (logger, {level: "debug"}));

server.use(function (req, res, next) {
  res.header ("Access-Control-Allow-Origin", "*");
  res.header ("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header ("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  next ();
});

/*
* The express server listens at PORT
* */
server.listen (3000, function () {
  logger.debug ("API mock Server started at port: '3000'");
  logger.info ("You can add new requests to server.js and mock json responses in server directory to simulate API calls.");
  logger.info ("Any Change in localServer/server.js will require restart of node server using command 'node server.js'");
});

/*
* Mock the required GET API request
* */
server.get ("/test/getApi", function (req, res) {
  /*setTimeout (function () {
    res.status(500).send('Not found');
  }, 1000);*/
  fse.readFile (__dirname + "/mocks/" + "test.json", "utf8", function (err, data) {
    res.end (data);
  });
});

/*
* Mock the required POST API request
* */
server.post ("/test/postApi", function (req, res) {
  fse.readFile (__dirname + "/mocks/" + "test.json", "utf8", function (err, data) {
    res.end (data);
  });
});
