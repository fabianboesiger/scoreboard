var express = require('express');
var router = express.Router();

var Game = include('/schemas/game');

router.get('/', function(req, res, next){
  var newGame = new Game(req.query);
  validateModel(req, res, next, newGame, null, (req, res, next, errors)=>{
    res.json({
      "success": false,
      "errors": errors
    });
  }, null, (req, res, next)=>{
    res.json({
      "success": true
    });
  });
});

module.exports = router;
