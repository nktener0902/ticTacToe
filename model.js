var mongoose = require('mongoose');
var url = 'mongodb://localhost/user';
var db  = mongoose.createConnection(url, function(err, res){
    if(err){
        console.log('Error connected: ' + url + ' - ' + err);
    }else{
        console.log('Success connected: ' + url);
    }
});

// Model of MongoDB Schema
var UserSchema = new mongoose.Schema({
    email    : String,
    password  : String
},{collection: 'info'});

exports.User = db.model('user', UserSchema);
