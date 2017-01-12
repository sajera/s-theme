
'use strict'

var theme = require('../index.js');
var fs = require('fs');
var is = require('s-is');

if ( is.platform.browser() ) {
    window.theme = theme;
    window.Source = require('../lib/Source.js');
}
// generate extended css file of full theme
theme
    .full({ // invalid fields - ignore
        'brand': {
            'background': '#FF4136',
            'color': '#2ECC40',
            'size': '36px',
        },
        'common': {
            'background': '#2ECC40',
            'color': '#FF4136',
            'size': '24px',
        },
        'highlight': {
            'background': null, // or any invalid data
            'color': '#0074D9',
            'size': '40px',
        },
    }, {compress: false})
    .then(function ( sourceString ) {
        fs.writeFileSync( './test/fullTheme.css', sourceString);
    });
// generate extended css file from color config for backgrounds
theme
    .bgColors({'brand': '#FF4136', 'common': '#2ECC40', 'highlight': '#0074D9'}, {compress: false})
    .then(function ( sourceString ) {
        fs.writeFileSync( './test/bgColor.css', sourceString);
    });
// generate extended css file from color config for text colors
theme
    .textColors({'brand': '#FF4136', 'common': '#2ECC40', 'highlight': '#0074D9'}, {compress: false})
    .then(function ( sourceString ) {
        fs.writeFileSync( './test/textColor.css', sourceString);
    });
// generate extended css file from size config for text sizing
theme
    .textSizes({'brand-text': '36px', 'common-text': '1em', 'highlight-text': '110%'}, {compress: false})
    .then(function ( sourceString ) {
        fs.writeFileSync( './test/textSize.css', sourceString);
    });