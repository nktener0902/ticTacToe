var express = require('express');
var router = express.Router();
var model = require('../model.js'),
    User  = model.User;
const crypto = require('crypto');

/* Encript key */
const key = 'mypassword';

/* Encrypt */
const encrypt = (text) => {
    if (text){
        var cipher = crypto.createCipher('aes192' ,key)
        var crypted = cipher.update(text,'utf8','hex')
        crypted += cipher.final('hex');
        return crypted;
    } else {
        return '';
    }
};

/* Dencrypt */
const decrypt = (text) => {
    if (text) {
        let decipher = crypto.createDecipher('aes192' ,key);
        let dec = decipher.update(text,'hex','utf8')
        dec += decipher.final('utf8');
        return dec;
    } else {
        return '';
    }
};

/* Hash */
const hashed = (password) => {
    if (password) {
        let hash = crypto.createHmac('sha512', password)
        hash.update(password)
        let value = hash.digest('hex')
        return value;
    } else {
        return '';
    }
}

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
    console.log(req.body);
    var encrypted_req_body = { "email": encrypt(req.body.email), "password": hashed(req.body.password)};
    var newUser = new User(encrypted_req_body);
    console.log(encrypted_req_body);
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
    console.log(req.query);
    var email    = encrypt(req.query.email);
    var password = hashed(req.query.password);
    var query = { "email": email, "password": password };
    User.find(query, function(err, data){
        if(err){
            console.log(err);
        }
        if(data == ""){
            if(email == "" && password == ""){
                res.render('login', {nomatch: "Please enter your e-mail address and password."});
            }else if(email === undefined && password === undefined){
                res.render('login', {nomatch: "Please enter your e-mail address and password."});
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
