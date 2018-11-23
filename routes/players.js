var express = require('express');
var router = express.Router();

//var Game = include('/schemas/Game');

router.get('/', function(req, res, next){
  findGame(req, res, next, (req, res, next, game)=>{

    var players = [];
    for(let i = 0; i < game.board.length; i++){
      var found = false;
      for(let j = 0; j < players.length; j++){
        if(players[j].username == game.board[i].username){
          found = true;
          if(players[j].score < game.board[i].score){
            players[j].score = game.board[i].score;
          }
          break;
        }
      }
      if(!found){
        players.push({
          "username": game.board[i].username,
          "score": game.board[i].score
        });
      }
    }

    res.json({
      "success": true,
      "result": sortByScore(players)
    });
  });
});

module.exports = router;
