var should = require('should')
  , expect = require('chai').expect;


describe('testing route loading', function(){

  it('should load the router with the available functions in the files contained in the routes folder', function(done){
    var router = require('../index.js').init("./test/routes");

    if(!router.admin || !(typeof router.admin.index === 'function') || !(typeof router.admin.test === 'function')){
      throw "Admin routes not found. Failed test.";
    }

    if(!router.index || !(typeof router.index.index === 'function')){
      throw "Main routes not found. Failed test.";
    }

    done();
  });

});

