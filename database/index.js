const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/db');
const db = mongoose.connection;
db.dropDatabase('db');

const uniqueValidator = require('mongoose-unique-validator');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected!!!')
});

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  user: String,
  url: {type: String, unique: true},
  size: Number

});

// var dummy = {
//   user: 'dylan',
//   url: 'dylaniswack.com',
//   size: 5
// }

repoSchema.plugin(uniqueValidator);

let Repo = mongoose.model('Repo', repoSchema);

var save = (repoData, callback) => {
  var githubRepo = new Repo(repoData);
  //check if username already exists in db
  //determine uniqueness
  githubRepo.save(function(err, res) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  })
}

var get25 = (callback) => {
  Repo
    .find()
    .sort('-size')
    .limit(25)
    .exec(callback)
}

//db tests
//save(dummy, (err, data) => console.log(data));

// get25((err, repo)=> {if (err) {console.log(err)} else {
//   console.log('GOT 25')
//   console.log(repo)
// }})

module.exports.save = save;
module.exports.get25 = get25;