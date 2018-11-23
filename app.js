global.about = {
  "title": "Scoreboard"
}

var logger = require('morgan');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost:27017/'+about.title.replace(/ /g,''), {useNewUrlParser: true});

app.use(logger('dev'));
/*
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());*/
app.use(express.static(path.join(__dirname, 'public')));

global.include = function(file){
  return require(path.join(__dirname, file));
}
global.validateModel = function(req, res, next, model, toPass, onError, preSave, onSuccess){
  var error = model.validateSync();
  if(error){
    var errors = [];
    for(let i in error.errors){
      errors.push(error.errors[i].message);
    }
    onError(req, res, next, errors);
  }else{
    if(preSave != null){
      preSave(model);
    }
    model.save(function(error, result){
      if(error){
        if(error.code === 11000){
          onError(req, res, next, ["Name already exists."]);
        }else{
          console.error(error);
          return next();
        }
      }else{
        onSuccess(req, res, next, toPass);
      }
    });
  }
}
var Game = include('/schemas/game');
global.findGame = function(req, res, next, onSuccess){
  if(req.query.name == undefined){
    res.json({
      "success": false,
      "errors": [
        "Name is undefined."
      ]
    });
  }else{
    Game.findOne({"name": req.query.name}, function(error, game){
      if(error){
        console.log(error);
        return next();
      }else{
        if(game){
          if(game.password == undefined){
            res.json({
              "success": false,
              "errors": [
                "Password is undefined."
              ]
            });
          }else{
            if(game.password === req.query.password){
              onSuccess(req, res, next, game);
            }else{
              res.json({
                "success": false,
                "errors": [
                  "Wrong password."
                ]
              });
            }
          }
        }else{
          res.json({
            "success": false,
            "errors": [
              "Game does not exist."
            ]
          });
        }
      }
    });
  }
}
global.sortByScore = function(input){
  var sorted = [];
  for(let i = 0; i < input.length; i++){
    var index = sorted.length;
    for(let j = 0; j < sorted.length; j++){
      if(sorted[j].score < input[i].score){
        index = j;
        break;
      }
    }
    sorted.splice(index, 0, {
      "username": input[i].username,
      "score": input[i].score
    });
  }
  return sorted;
}

app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    "success": false,
    "errors": [
      err.message
    ]
  });
});

module.exports = app;
