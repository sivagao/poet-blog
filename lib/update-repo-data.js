/*
 * Updates repo JSON in memory with latest star count
 */

var
  request = require('request'),
  _ = require('underscore'),
  series = require('async').series,
  data = require('./repo-data'),
  url = 'https://api.github.com/repos/',
  CLIENT_ID = process.env.CLIENT_ID,
  CLIENT_SECRET = process.env.CLIENT_SECRET,
  auth = '?client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET,
  headers = {
    'User-Agent': 'http://github.com/jsantell/jsantell.com node server'
  };

function updateRepoData () {
  series(
    _.flatten(Object.keys(data).map(function (category) {
      return data[category].map(requestAndSave);
    }), true),
  function (err, results) {
    console.log('Repo Updated', err, results);
  });
}

function requestAndSave (project) {
  return function (callback) {
    var repoUrl = url + project.repo + auth;
    request({ url: repoUrl, json: true, headers: headers }, function (err, res, body) {
      if (err || !body.name) return callback(err, body);
      project.name = body.name;
      project.stars = body.watchers;
      project.description = body.description;
      callback(err, project.name);
    });
  };
}

module.exports = updateRepoData;
