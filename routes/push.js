var express = require('express');
var router = express.Router();

//var Game = include('/schemas/Game');

router.get('/', function(req, res, next){
  findGame(req, res, next, (req, res, next, game)=>{
    var toPush = {
      "username": req.query.username,
      "score": req.query.score
    };

    var sorted = sortByScore(game.board);
    var rank = sorted.length+1;
    for(let i = 0; i < sorted.length; i++){
      if(sorted[i].score < toPush.score){
        rank = i+1;
        break;
      }
    }

    game.board = game.board.concat([toPush]);

    validateModel(req, res, next, game, {"rank": rank, "total": sorted.length+1}, (req, res, next, errors)=>{
      res.json({
        "success": false,
        "errors": errors
      });
    }, null, (req, res, next, passed)=>{
      res.json({
        "success": true,
        "rank": passed.rank,
        "total": passed.total
      });
    });
  });
});

module.exports = router;
