var http = require("http");
var fs = require("fs");

var write = fs.createWriteStream("log.txt");
write.on("ready", function (err, callback) {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log("write stream ready");
});

write.on("drain", function (err, callback) {
  if (err) {
    throw err;
  }
  console.log("write stream drain");
});

process.on("uncaughtException", function (err) {
  console.log("errwwww");
});

module.exports = function () {
  http
    .createServer(function (req, res) {
      var time = new Date().toLocaleString();
      var url = req.url;
      var headers = req.headers;
      console.log(headers);
      // console.log(newUrl);
      var log = `[${time}] ${url} \r\n`;
      write.write(log, function (err) {
        if (err) {
          throw err;
        }

        console.log(`write success`);
      });
      res.write(log); //write a response to the client
      res.end(); //end the response
    })
    .listen(8080); //the server object listens on port 8080
};
