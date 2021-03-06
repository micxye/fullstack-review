const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, callback, function(err, data) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  })

}

//test
// getReposByUsername('dylanqian29', (err, res)=> {
//   if (err) { 
//     console.log('hi')
//     // console.log(err) 
//   } else {
//     console.log(res)
//   }
// })

module.exports.getReposByUsername = getReposByUsername;