
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
    .bgColors({'brand': '#FF4136', 'common': '#2ECC40', 'highlight': '#0074D9'}, {compress: false})
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
    .textColors({'brand': '#FF4136', 'common': '#2ECC40', 'highlight': '#0074D9'}, {compress: false})
    .then(function ( sourceString ) {
        fs.writeFileSync( './path/to/textColor.css', sourceString);
    });
/*----------------------------------
EACH valid properties of textColors
------------------------------------
*[class^=properiesName] {
  font-size: SIZE;
  line-height: SIZE*1.1;
}
*[class^=properiesName].text-low {
  font-size: SIZE*0.7;
  line-height: SIZE*0.8;
}
*[class^=properiesName].text-huge {
  font-size: SIZE*1.3;
  line-height: SIZE*1.4;
}
*[class^=properiesName].text-x2 {
  font-size: SIZE*2;
  line-height: SIZE*2.1;
}
*[class^=properiesName].text-x3 {
  font-size: SIZE*3;
  line-height: SIZE*3.1;
}
*[class^=properiesName].text-x4 {
  font-size: SIZE*4;
  line-height: SIZE*4.1;
}
*[class^=properiesName].text-x5 {
  font-size: SIZE*5;
  line-height: SIZE*5.1;
}
*/
// generate extended css file from size config for text sizing
theme
    .textSizes({'brand-text': '36px', 'common-text': '1em', 'highlight-text': '110%'}, {compress: false})
    .then(function ( sourceString ) {
        fs.writeFileSync( './test/textSize.css', sourceString);
    });

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