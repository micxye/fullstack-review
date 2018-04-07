const express = require('express');
let app = express();
const bodyParser = require("body-parser");
const github = require('../helpers/github.js');
const db = ('../database/index.js');

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  let username = req.body.user;
  let githubData = github.getReposByUsername(username, (data) => {return data});
  let repoData = {
    user: githubData.name,
    url: githubData.url,
    size: githubData.size
  }
  db.save(githubData);
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

