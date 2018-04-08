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
  github.getReposByUsername(username, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const githubData = JSON.parse(data.body);
        for (var i = 0; i < githubData.length; i++) {
          let repoData = {
            user: githubData[i].name,
            url: githubData[i].html_url,
            size: githubData[i].size
          }
          if (i === githubData.length - 1) {
            db.save(repoData, (err, data) => {
              if (err) {
                console.log('SAVE ERROR')
              } else {
                console.log("successfully saved to db ", data);
                  db.get25((err, repos) => {
                    if (err) {
                      console.log('err');
                    } else {
                      res.json(repos);
                    }
                  })
                
              }
            })
          } else {
            db.save(repoData, (err, data) => {
              if (err) {
                console.log('SAVE ERROR')
              } else {
                console.log("successfully saved to db ", data);
              }
            })
          }
        }
      } 
    }
  )
})



app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
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

