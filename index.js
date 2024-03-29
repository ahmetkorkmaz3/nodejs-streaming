var express = require('express');

var app = express();

var http = require('http').createServer(app);
var io = require('socket.io')(http);

var Log = require('log'),
    log = new Log('debug')

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));


app.get('/', function(req, res){
  res.redirect('index.html');
});

io.on('connection', function(socket){
  socket.on('stream', function(image){
    socket.broadcast.emit('stream', image);
  });
});

http.listen(port, function(){
  console.log("server run http://127.0.0.1:%s", port);
});
