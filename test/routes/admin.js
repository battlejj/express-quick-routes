var exports, route;

route = {};

route.index = function(req, res) {
  return res.send('index');
};

route.test = function(req, res) {
  return res.send('testing');
}

module.exports = exports = route;
