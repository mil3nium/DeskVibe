/**
 * Created by Mil3nIuM on 27.02.2016.
 */

/**
 * User login page.
 *
 * TODO: Move into header page. So you can login with just an easy click on Facebook Google or Http icon
 *
 *
  * @type {*|exports|module.exports}
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET about page. */
router.get('/', function(req, res) {
    res.render('login', { title: 'Login', user: req.user });
});

router.post('/', passport.authenticate('local'), function(err, res) {
    res.redirect('user');
});


module.exports = router;



