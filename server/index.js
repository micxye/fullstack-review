const express = require('express');
let app = express();
const bodyParser = require("body-parser");
const github = require('../helpers/github.js');
var db = require('../database/index.js');

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  let username = req.body.user;
  console.log(username)
  github.getReposByUsername(username, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const githubData = JSON.parse(data.body);
      githubData.forEach(function(repo) {
        let repoData = {
          user: repo.name,
          url: repo.url,
          size: repo.size
        }
        db.save(repoData, (err, data) => {
          if (err) {
            console.log('SAVE ERROR')
            //console.log(err);
          } else {
            console.log("successfully saved to db ", data);
          }
        }); 
      })
    }
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  let username = req.body.data;
  //get array of objects(repos)
  db.get25((err, repos)=>{
    if (err) {
      console.log(err)
    } else {
      res.json(repos)
    }
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

