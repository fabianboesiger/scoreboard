var express = require('express');
var router = express.Router();

//var Game = include('/schemas/Game');

router.get('/', function(req, res, next){
  findGame(req, res, next, (req, res, next, game)=>{
    res.json({
      "success": true,
      "result": sortByScore(game.board)
    });
  });
});

module.exports = router;
