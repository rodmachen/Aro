var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
// var mongoose = require('mongoose');
  
// mongoose.connect('mongodb://localhost/SpeechChat', function(err) {
//     if(err) {
//         console.log('connection error', err);
//     } else {
//         console.log('connection successful');
//     }
// });
var games = {};

var SwappingGame = function (players) {
  var gameID = players[0].gameID;
  //subscribe to new socket (should be on client side)
  io.on('connection', function(socket){
    socket.join(gameID);
  });

  io.to(gameID).emit([players[0].playerId, players[1].location]);
  io.to(gameID).emit([players[1].playerId, players[0].location]);

  //listen for target acquired to end game
  //io.on('targetAcquired')  
    //end game
}

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', 'this is from the server. Joyce, Rod, Tisha, and Taylor are awesome!!');
  });

  socket.on('gameEnter', function(playerObj) {
    games[playerObj.gameID] = games[playerObj.gameID] || [];
    games[playerObj.gameID].push(playerObj);
    if (games[gameID].length >= 2) {
      io.emit('game start', gameID);
      //create new Game
      // var gameID = new SwappingGame(games[gameID])

    }
  }
});

http.listen(port, function(){
  console.log('listening on *:'+port);
});