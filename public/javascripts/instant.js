/**
 * Created by Mil3nIuM on 24.02.2016.
 */

var express = require('express');
var instantsearch = require('instantsearch');

var search = instantsearch({
    appId: 'HGP9WVH3MW',
    apiKey: 'e2e28fcd56d3e4d545134a2bcc38e1dd',
    indexName: 'offices'
});

search.addWidget(
    instantsearch.widgets.searchBox({
        container: '#q',
        placeholder: 'Search for your perfect office!',
        autofocus: false,
        poweredBy: true
    })
);

search.addWidget(
    instantsearch.widgets.hits({
        container: '#hits-container',
        templates: {
            empty: 'No Results',
            item: '<strong>Hit {{ObjectID}}</strong>: {{{_highlightResult.company.value}}}'
        },
        hitsPerPage: 10
    })
);

search.addWidget(
    instantsearch.widgets.pagination({
        container: '#pagination-container'
    })
);

search.start();/**
 * Created by Mil3nIuM on 24.02.2016.
 */
