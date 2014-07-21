exports.init = function(routesLocation){
  var fs = require('fs')
    , path = require('path')
    , sugar = require('sugar')
    , router = {}
    , routeFolder = '';
  if(routesLocation){
    routeFolder = path.resolve(routesLocation);
  } else {
    routeFolder = path.resolve(path.dirname(process.mainModule.filename) + '/routes/');
  }

  fs.readdirSync(routeFolder).forEach(function(file){
    var keyName = '';
    if(file.last(3) == '.js'){
      keyName = file.first(file.length-3);
    } else if(file.last(7) == '.coffee'){
      keyName = file.first(file.length-7);
    }

    if(keyName.length){
      if(router.hasOwnProperty(keyName)){
        console.log('You appear to have both a JS and Coffee file named: "' + keyName + '." Routes may conflict.')
      }
      router[keyName] = require(routeFolder + '/' + file);
    }
  });

  return router;
}



