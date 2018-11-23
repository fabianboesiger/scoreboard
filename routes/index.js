var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write("<h1>Documentation</h1>");
  res.write("<table>");
  res.write("<tr><th>Create Database</th><td>scoreboard.ddnss.ch/create?name=[name of database]&password=[password of database]</td></tr>");
  res.write("<tr><th>Delete Database</th><td>scoreboard.ddnss.ch/delete?name=[name of database]&password=[password of database]</td></tr>");
  res.write("<tr><th>Push a New Score to Scoreboard</th><td>scoreboard.ddnss.ch/push?name=[name of database]&password=[password of database]&username=[username of player]&score=[score of player]</td></tr>");
  res.write("<tr><th>Pull All Scoreboard Entries Sorted by Score</th><td>scoreboard.ddnss.ch/pull?name=[name of database]&password=[password of database]</td></tr>");
  res.write("<tr><th>List All Players Sorted by Score</th><td>scoreboard.ddnss.ch/players?name=[name of database]&password=[password of database]</td></tr>");
  res.write("</table>");
  res.end();
});

router.use('/create', require('./create'));
router.use('/delete', require('./delete'));
router.use('/push', require('./push'));
router.use('/pull', require('./pull'));
router.use('/players', require('./players'));

module.exports = router;
