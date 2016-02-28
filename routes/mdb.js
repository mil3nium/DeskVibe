/**
 * Created by Mil3nIuM on 21.02.2016.
 */

/**
 * No use of this file yet
 *
  * @type {*|exports|module.exports}
 */

var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

var algoliasearch = require('algoliasearch');
var instantsearch = require('instantsearch.js');


//var client = algoliasearch(global.algoliaAppID, global.algoliaApiKey);
//var index = client.initIndex('offices');

var url = 'mongodb://localhost:27017/Offices';

router.get('/', function(req, res, next) {

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");

        db.close();
    });

    res.render('mongodb', { title: 'Mongodb', Asearch: 'searchAlgolia'});
});

module.exports = router;