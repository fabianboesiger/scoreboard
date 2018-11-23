var express = require('express');
var router = express.Router();

var Game = include('/schemas/game');

router.get('/', function(req, res, next){
  findGame(req, res, next, (req, res, next, game)=>{
    Game.deleteOne({"name": game.name}, function(error){
      if(error){
        res.json({
          "success": false
        });
      }else{
        res.json({
          "success": true
        });
      }
    });
  });
});

module.exports = router;
