
'use strict'

var theme = require('../index.js');
var fs = require('fs');

/*----------------------------------
EACH valid properties of bgColors
------------------------------------
.properiesName-text,
.properiesName-text-hover:hover,
.properiesName-text-active:active,
.properiesName-text-active.active,
.properiesName-text-disable.disable { background-color: COLOR; }
.properiesName-text-i,
.properiesName-text-hover-i:hover,
.properiesName-text-active-i:active,
.properiesName-text-active-i.active,
.properiesName-text-disable-i.disable { background-color: COLOR; }
*/
// generate extended css file from color config for backgrounds
theme
    .bgColors({'red': '#FF4136', 'green': '#2ECC40', 'blue': '#0074D9'}, {compress: false})
    .then(function ( sourceString ) {
        fs.writeFileSync( './path/to/bgColor.css', sourceString);
    });

/*----------------------------------
EACH valid properties of textColors
------------------------------------
.properiesName-text,
.properiesName-text-hover:hover,
.properiesName-text-active:active,
.properiesName-text-active.active,
.properiesName-text-disable.disable { color: COLOR; }
.properiesName-text-i,
.properiesName-text-hover-i:hover,
.properiesName-text-active-i:active,
.properiesName-text-active-i.active,
.properiesName-text-disable-i.disable { color: COLOR; }
*/
// generate extended css file from color config for text colors
theme
    .textColors({'red': '#FF4136', 'green': '#2ECC40', 'blue': '#0074D9'}, {compress: false})
    .then(function ( sourceString ) {
        fs.writeFileSync( './path/to/textColor.css', sourceString);
    });

