/**
 * Home page.
 * Allot of the login authentication with google and facebook implemented here.
 *
 * May need to be moved to other pages.
 *
 * @type {*|exports|module.exports}
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res) {
  res.render('register', { title: 'Register', error: '' });
});

router.post('/register', function(req, res) {
    var user = new Account();
    user.username = req.body.username;
    user.name = "Test Name";
    user.created = Date.now();
    user.type = "http";

    Account.register(user, req.body.password, function(err, account) {
            if(err) {
                return res.render('register', {account : account, error : err})
            }

            passport.authenticate('local')(req, res, function () {
                res.redirect('/user');
            });
    });
});

router.get('/auth/facebook' ,
  passport.authenticate('facebook', {scope: ['email']}),
  function(req, res) {});

router.get('/auth/google' ,
  passport.authenticate('google', { scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/plus.profile.emails.read'
    ] }
));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook' ,
      { successRedirect: '/user',
        failureRedirect: '/login'
      }), function(req, res) {
        res.redirect('/user');
  });

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/'}),
  function(req, res) {
    res.redirect('/user');
  });

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/ping', function(req, res) {
  res.status(200).send("pong!");
});

module.exports = router;
