module.exports=function(io)
{
var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetbank');

router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  console.log(tweets);
  res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true,doRefresh: true } );
});
router.get('/users/:name',function(req,res)
{
	var name = req.params.name;
	var tweets = tweetBank.find({name:name});
	res.render('index',{title:'Twitter.js - posts by '+name,tweets:tweets,name:name,showForm: true});
});
router.get('/users/:name/tweets/:id',function(req,res)
{
	var name = req.params.name;
	var id = req.params.id;
	var tweets = tweetBank.find({id:id});
	res.render('index',{title:'Twitter.js - posts by '+id,tweets:tweets});
});
router.post('/submit',function(req,res)
{
	var name = req.body.name;
	var text = req.body.text;
	tweetBank.add(name,text);
	io.sockets.emit('new_tweet', { name:name,text:text });
	res.redirect('/');
});

return router;
};

