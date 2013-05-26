var repoData = require('./lib/repo-data');
var html2text = require('html-to-text');
var express = require('express');
var fs = require('fs');
var siva_utils = require('./siva_utils');

module.exports = function (app) {

  app.use(express.bodyParser());

  app.get(/^\/manage$/, function(req, res){
    res.render('admin_layout');
  });
  app.get(/^\/manage\/(post|css|js)$/, function(req, res){
    var picList;
    if(req.params[0] == 'post'){
      picList = fs.readdirSync('./_posts/');
    } else {
      picList = fs.readdirSync('./public/' + req.params[0]);  
    }    
    // res.json(picList);
    res.render('manage_js.jade', {
      picList: picList
    });
  });

  app.get('/manage/img', function(req, res){
    siva_utils.walk('./public/img', function(err, results) {
      if (err) throw err;
      console.log(results);
      var picList = [],i,path,name;
      results.forEach(function(item, idx){
        if(item.indexOf('.png')>0 || item.indexOf('.jpg')>0 || item.indexOf('.gif')>0){
          i = item.lastIndexOf('/') + 1;
          picList.push({
            path: item.slice(0,i).substr(1).replace('/public',''),
            name: item.slice(i)  
          });
        }
      });
      res.render('imglist',{
        picList: picList
      });
    });
    // var picList = fs.readdirSync('./public/img');
    // res.render('imglist', {
    //   picList: picList
    // });
  });

  app.get('/upload', function(req, res){
    res.render('upload', {
      title: 'Siva Gao'
    });
  });
  app.post('/upload_progress', function(req,res){
    var content = '';
    req.setEncoding("binary");
    req.addListener('data', function(chunk) {
        content += chunk;
    });
    req.addListener('end', function() {
        var name = req.headers['x-file-name'],
            dest = __dirname + "/public/img/" + name;
        fs.writeFile(dest, content, "binary", function (err) {
            res.writeHead(200, {'content-type': 'text/plain'});
            res.end('img/'+name);
        });
    });
  });
  app.post('/upload', function(req, res){
      // TODO: move and rename the file using req.files.path & .name)
      // res.send('req');
      // res.json(req);
      // console.dir(req);
      var formidable = require('formidable');
        var form = new formidable.IncomingForm();
        form.uploadDir = __dirname;
        form.encoding = 'binary';

        form.addListener('file', function(name, file) {
          // do something with uploaded file\
          // console.log('sfa');
          var dict, newPath;
          if (file.name.indexOf('.md') > 0) {
            dict = '/_posts/';
          } else if (file.name.indexOf(".js") > 0) {
            dict = '/public/js/';
          } else if (file.name.indexOf(".css") > 0) {
            dict = '/public/css/';
          } else if (file.type.indexOf("image") >= 0) {
            dict = '/public/img/';
          } else {
            return;
          }
          newPath = __dirname + dict + file.name; 
          fs.rename(file.path, newPath, function(){
            console.log(newPath);
            console.log('we did it!');
          });
        });

        form.addListener('end', function() {
          res.end('siva');
        });

        form.parse(req, function(err, fields, files) {
          if (err) {
            console.log(err);
          }
        });
      // res.send(JSON.stringify(req.files));
      // res.send(console.dir(req.files));  // DEBUG: display available fields
  });

  app.get('/doubanlikes', function(req, res){
    res.json(require('./_data/doubanlikes.json'));
  });

  app.get('/xiangce_mm', function(req, res){
    // var picList = require('./_data/xiangce_mm.json').xiangce_data;
    picList = fs.readdirSync('./public/img/xiangce');
    res.render('xiangce_mm', {
      picList: picList
    });
  });

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