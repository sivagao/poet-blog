var
  express   = require('express'),
  app       = express(),
  poet      = require('poet')(app),
  schedule  = require('node-schedule'),
  handle404 = require('./lib/handle-404'),
  updateRepoData = require('./lib/update-repo-data');

poet.set({
  postsPerPage : 4,
  posts        : __dirname + '/_posts',
  metaFormat   : 'json'
}).createPostRoute('/post/:post', 'post')
  .createPageRoute('/page/:page', 'page')
  .createTagRoute('/tag/:tag', 'tag')
  .createCategoryRoute('/category/:category', 'category')
  .init();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.use(poet.middleware());
app.use(app.router);
app.use(handle404);
app.use(express.logger());
app.configure(function(){
  // some other configuration code
  app.locals.logger = function(arguments) {
    console.log(arguments);
  }
});

app.configure('development', function () {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function () {
  app.use(express.errorHandler());
});

require('./pages' )(app); // for other pages not just blog posts

// Get repository data
// schedule.scheduleJob('0 * * * *', updateRepoData);
// updateRepoData();

app.listen(9102); // for blog!!

