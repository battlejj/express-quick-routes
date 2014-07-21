module.exports = {
  signin: function(req, res){
    res.send('app/auth/index/signin')
  },
  signout: function(req, res){
    res.send('app/auth/index/signout')
  }
}