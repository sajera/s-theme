
'use strict'

var theme = require('../index.js');
var fs = require('fs');
var is = require('s-is');

if ( is.platform.browser() ) {
    window.theme = theme;
    window.Source = require('../lib/Source.js');
}
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