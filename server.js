/**Creator: Martin Hernandez
*  File: server.js
*  Function: Creates routes for teamtable.js and playertable.js
**/
const express = require('express');
const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'stat_tracker'
});

// Connect to DB
db.connect((err) => {
  if(err){
    throw err;
  }
  console.log('MySql Connected...');
});

const app = express();

app.get('/api/teams', (req, res) => {
  let sql = `SELECT * FROM team_list`;
  let query = db.query(sql, (err, results) => {
    if(err) throw err;
    console.log(results);
    res.json(results);
  });
});

app.get('/api/players', (req, res) => {
  let sql = `SELECT * FROM player_list`;
  let query = db.query(sql, (err, results) => {
    if(err) throw err;
    console.log(results);
    res.json(results);
  });
});

app.get('/api/addTeam/:teamname/:teamstate', (req, res) => {
  let sql = `INSERT INTO team_list(teamName, teamState) VALUES('${req.params.teamname}','${req.params.teamstate}')` ;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    res.json(result);
  });
});

app.get('/api/removeTeam/:teamid', (req, res) => {
  let sql = `DELETE FROM team_list WHERE id = ${req.params.teamid}` ;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    res.json(result);
  });
});

app.get('/api/removeTeamPlayers/:teamname', (req, res) => {
  let sql = `DELETE FROM player_list WHERE teamName = '${req.params.teamname}'` ;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    res.json(result);
  });
});


app.get('/api/selectPlayers/:teamname', (req, res) => {
  let sql = `SELECT * FROM player_list WHERE teamName = '${req.params.teamname}'` ;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    res.json(result);
  });
});

app.get('/api/addPlayer/:pNum/:ln/:fn/:tn', (req, res) => {
  let sql = `INSERT INTO player_list(playerNum, lastName, firstName, teamName, pointsScored) VALUES('${req.params.pNum}','${req.params.ln}','${req.params.fn}','${req.params.tn}', 0)` ;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    res.json(result);
  });
});

app.get('/api/removePlayer/:pNum/:tn', (req, res) => {
  let sql = `DELETE FROM player_list WHERE (playerNum = ${req.params.pNum} AND teamName = '${req.params.tn}')  ` ;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    res.json(result);
  });
});

app.get(`/api/updateScore/:pNum/:tn/:score`, (req, res) => {
  let sql = `UPDATE player_list SET pointsScored = ${req.params.score} WHERE (playerNum = ${req.params.pNum} AND teamName ='${req.params.tn}') LIMIT 9999`;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.json(result);
  });
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
