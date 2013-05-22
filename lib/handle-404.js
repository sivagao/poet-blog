module.exports = notFoundFn;
function notFoundFn (req, res) {
  if (req.accepts('html')) {
    res.status(404);
    res.render('404', { url: req.url });
    return;
  }
}
