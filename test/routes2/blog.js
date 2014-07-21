var exports, route;

route = {};

route.index = function(req, res) {
  return res.send('index');
};

route.post = function(req, res) {
  return res.send('post');
}

module.exports = exports = route;
