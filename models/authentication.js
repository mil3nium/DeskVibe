/**
 * Created by Mil3nIuM on 28.02.2016.
 */

/**
 * Object that contains all the different ways to authenticate with the server
 * Added:
 *  - Google, Facebook and HTTP Login
 *
 *  Update needed:
 *   - Combine adding user to the database. No need to have copy/paste code between facebook/google
 *
 * @type {Passport|exports|module.exports}
 */

/**
 * Others required files
 */
var passport = require('passport');
;
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook');
var GoogleStrategy = require('passport-google-oauth2');

/**
 * My required files
 */
var Account = require('../models/account');
var conf = require('../models/config');
var util = require('util');

/**
 * HTTP
 *
 * Adding HTTP authentication with passport
 */
module.exports = passport.use(new LocalStrategy(Account.authenticate()));

/**
 * FACEBOOK
 *
 * Adding facebook authentication. If you try to logg inn with a facebook user it will register one for you.
 */
module.exports = passport.use(new FacebookStrategy({
        clientID: conf.facebook.clientID,
        clientSecret: conf.facebook.clientSecret,
        callbackURL: conf.facebook.callbackURL
    },
    function (accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            Account.findOne({oauthID: profile.id}, function (err, user) {

                if (err) console.error(err);

                if (!err && user != null) {
                    done(null, user);
                } else {
                    console.log(util.inspect(profile));
                    user = new Account({
                        oauthID: profile.id,
                        username: "facebook:" + profile.displayName,
                        name: profile.displayName,
                        type: "facebook",
                        created: Date.now()
                    });
                    user.save(function (err) {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log("User added : " + profile.displayName);
                            done(null, user);
                        }
                    });
                }
            });
        });
    }
));

/**
 * GOOGLE
 *
 * Adds a google plugin for authentication. Register one for you if not already exists.
 */
module.exports = passport.use(new GoogleStrategy({
        clientID: conf.google.clientID,
        clientSecret: conf.google.clientSecret,
        callbackURL: conf.google.callbackURL,
        passReqToCallback: true
    },
    function (request, accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            Account.findOne({oauthID: profile.id}, function (err, user) {

                if (err) console.error(err);

                if (!err && user != null) {
                    done(null, user);
                } else {
                    user = new Account({
                        oauthID: profile.id,
                        username: profile.emails[0].value,
                        name: profile.displayName,
                        type: "google",
                        created: Date.now()
                    });
                    user.save(function (err) {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log("User added : " + profile.displayName);
                            done(null, user);
                        }
                    });
                }
            });
        });
    })
);

/**
 * Serialize the user when connecting. This is to save cookie and keep the connection live
 */
passport.serializeUser(function (user, done) {
    console.log('SerializeUser: ' + user._id);
    done(null, user._id);
});

/**
 * Disconects the user from session when finished sending packages. Sends user cookies to recognize the user afterwards.
 */
passport.deserializeUser(function (id, done) {
    Account.findById(id, function (err, user) {
        if (!err) done(null, user);
        else done(err, null);
    });
});