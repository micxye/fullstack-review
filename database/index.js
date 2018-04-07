const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/data/db');
const db = mongoose.connection;
db.dropDatabase('data');
var uniqueValidator = require('mongoose-unique-validator');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  user: String,
  url: {type: String, unique: true},
  size: Number

});

repoSchema.plugin(uniqueValidator);

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoData) => {
  var githubRepo = new Repo(repoData);
  var username = repoData.user;
  //check if username already exists in db
  //determine uniqueness
  githubRepo.save(function(err, res) {
    if (err) {
      callback(err);
    } else {
      console.log(res);
    }
  })
}

let get25 = (repo, callback) => {
  Repo
    .find('repo')
    .sort({size: -1})
    .limit(25)
    .exec(function(err, repo) {
        if (err) {
          callback(err);
        } else {
          callback(repo);
        }
      }
    )
}

module.exports.save = save;
module.exports.get25 = get25;