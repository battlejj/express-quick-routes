var should = require('should')
  , mocha = require('mocha')
  , expect = require('chai').expect;

var quickRoutes = require('../index.js');

describe('test router generation', function(){

  it('should load a router object structure matching that of routes/app', function(done){
    var router = quickRoutes('./test/routes/app');
    expect(router).to.contain.keys('auth', 'home');
    expect(router.auth).to.contain.keys('index', 'register');
    expect(router.auth.index).to.contain.keys('signin', 'signout');
    expect(router.auth.index.signin).to.be.a('function');
    expect(router.auth.index.signout).to.be.a('function');
    expect(router.auth.register).to.contain.keys('index');
    expect(router.auth.register.index).to.be.a('function');
    expect(router.home).to.contain.keys('index');
    expect(router.home.index).to.contain.keys('index', 'contact');
    expect(router.home.index.index).to.be.a('function');
    expect(router.home.index.contact).to.be.a('function');

    done();
  })

  it('should load a router object structure matching that of routes/www', function(done){
    var router = quickRoutes('./test/routes/www');
    expect(router).to.contain.keys('dashboard', 'index');
    expect(router.dashboard).to.contain.keys('index');
    expect(router.dashboard.index).to.contain.keys('index');
    expect(router.dashboard.index.index).to.be.a('function');
    expect(router.index).to.contain.keys('about', 'home');
    expect(router.index.about).to.contain.keys('index');
    expect(router.index.about.index).to.be.a('function');
    expect(router.index.home).to.contain.keys('index');
    expect(router.index.home.index).to.be.a('function');
    done();
  });

});

