/**
 * Created by Mil3nIuM on 28.02.2016.
 */
/**
 * When a user want to change any userinfo they will be directed to this JS
 *
 * TODO:
 *  - Move updatuserinfo into account.js file.
 *  - Make more folder to keep an overview over different ejs files.
 *  - Move this into Auth
 *
 * @type {*Userinfo page}
 */

var express = require('express');
var router = express.Router();
var Account = require('../models/account');
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
    Account.findById(req.session.passport.user, function(err, user) {
        if(err) {
            console.log(err);  // handle errors
        } else {
            res.render('user', { type: user.type, name: user.name, username: user.username });
        }
    });
});

/**
 * POST
 *
 * Accepts the change user info form on the page and updates userinformation.
 */
router.post('/', ensureAuthenticated, function(req, res, next) {
   Account.findById(req.session.passport.user, function(err, user) {

       /**
        * Add compare password with old one to update userdata
        */

       user.username = req.body.username;
       user.name = req.body.name;

       if(req.body.newPW != null) {
           if (req.body.newPW === req.body.newPW2) {
               /**
                * Update password with a new hashtag.
                */
           }
       }

       // Saving user data toDB and redirects back to user page
       user.save(function(err) {
           if(err) {console.log(err); res.redirect('user');}
           else {
               res.redirect('user');
           }
       })
   })
});

/**
 * Checks if its a valid user that tries to access page. Redirects back to homepage if no access
 *
 */
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/');
}

module.exports = router;
