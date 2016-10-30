var express = require('express');
var router = express.Router();
var model = require('../model.js'),
    User  = model.User;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;

/* Page after user login */
module.exports.index = function(req, res){
  res.render('index', { user: req.session.user});
  console.log(req.session.user);
};

/* Create account function */
module.exports.add = function(req, res){
  var newUser = new User(req.body);
  newUser.save(function(err){
    if(err){
      console.log(err);
      res.redirect('back', {nomatch: "I'm sorry. I failed to add your account."});
    }else{
      res.redirect('/');
    }
  });
};

/* Login */
module.exports.login = function(req, res){
  var email    = req.query.email;
  var password = req.query.password;
  var query = { "email": email, "password": password };
  User.find(query, function(err, data){
    if(err){
      console.log(err);
    }
    if(data == ""){
      if(email == "" && password == ""){
        res.render('login', {nomatch: "Please enter your e-mail address and password."});
      }else if(email === undefined && password === undefined){
        res.render('login', {nomatch: ""});
      }else{
        res.render('login', {nomatch: "The e-mail address or password do not match."});
      }
    }else{
      req.session.user = email;
      res.redirect('/');
    }
  });
};

/* Logout */
module.exports.logout = function(req, res){
  req.session.destroy();
  console.log('deleted sesstion');
  res.redirect('/login', {nomatch: ""});
};
