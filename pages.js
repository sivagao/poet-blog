var repoData = require('./lib/repo-data');
var html2text = require('html-to-text');

module.exports = function (app) {

  app.get('/', function (req, res) {
    res.render('index', {
      title: 'Siva Gao'
    });
  });

  app.get('/projects', function (req, res) {
    res.render('projects', {
      title: 'Projects * Siva Gao',
      repos: repoData // define in app.js
    });
  });

  app.get('/tags', function (req, re) {
    res.render('tags', {
      title: 'Tags * Siva Gao'
    });
  });

  app.get('/categories', function (req, res) {
    res.render('categories', {
      title: 'Categories * Siva Gao'
    });
  });

  app.get('/rss', function (req, res) {
    var posts = app.locals.getPosts(0, 5);
    res.setHeader('Content-Type', 'application/rss+xml');
    res.render('rss', { posts: posts });
  });
};