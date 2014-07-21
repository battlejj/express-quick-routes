'use strict';

/*!
  express-quick-routes
  Copyright(c) 2013 Jeremy Battle <jeremy@jeremybattle.com>
  MIT Licensed
 */

/*
  Module Dependencies
 */
var fs = require('fs')
  , path = require('path')
  ;

/*
  Variable to access to store routes before returning. Starts as an empty object
 */
 var router = {};

/*
  Function to escape characters in a string for use in a regex.
  Credit: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
 */
function escapeRegExp(string){
  return string.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
}

/**
 * Take an array of strings and modify the router object to contain keys in the nested order
 *
 * @param {Array} arr
 * @return {Object}
 * @api private
 */
function objectPath(arr){
  var ref = router;

  arr.forEach(function(i){
    if(typeof i === 'string' && i.length) {
      //if the key doesn't exist, create it with an empty object
      ref[i] = ref[i] || {};
      //update our ref to match our current depth
      ref = ref[i];
    }
  });

  return ref;
}

/**
 * Walks directories to find JS files containing routes to add to the router object
 *
 * @param {location} string
 * @param {prefix} string
 * @return {Object}
 * @api private
 */
function recursiveWalk(location, prefix){
  //the prefix is our original absolute location, we don't want that in our path
  //so regex it out
  var regex = new RegExp('^' + escapeRegExp(prefix));

  //split our remaining path by /
  var routerKeys = location.replace(regex, '').split('/');

  //loop over the folder contents
  fs.readdirSync(location).forEach(function(i){
    var fullPath = path.resolve(location, i);
    var item = fs.lstatSync(fullPath);

    if(item.isDirectory()){
      //keep going, we only care about files
      recursiveWalk(fullPath, prefix);
    } else if(item.isFile()){
      //only try to require js files
      if(fullPath.slice(-3) == '.js') {
        var keyPath = objectPath(routerKeys);
        try {
          if (keyPath) {
            keyPath[i.substr(0, i.length - 3)] = require(fullPath);
          } else {
            router[i.substr(0, i.length - 3)] = require(fullPath);
          }
        } catch(e){
          console.error('Unable to load route: "%s" it will be skipped.', fullPath);
        }
      }
    }

  });
  return router;
}

/**
 * Takes a location and walks the directory tree to find routes
 *
 * @param {String} location
 * @returns {Object}
 * @api public
 */
module.exports = function(location){
  if(location){
    location = path.resolve(location);
  } else {
    //if no path was given, assume /routes location related to executing file
    location = path.resolve(process.env.PWD, '/routes');
  }

  return recursiveWalk(location, location);
}

