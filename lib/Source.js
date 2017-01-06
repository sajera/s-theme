
'use strict';

var fs = require('fs');
var is = require('s-is');
var path = require('path');
var assert = require('assert');

/**
 * preparing source to compile
 * @example
    
    var src = new Source('generator-bg.less');
    src.compile({'red': '#FF4136', 'green': '#2ECC40', 'blue': '#0074D9'}, {compress: false});

 * @param { Object } :
 * @returns { Object }
 * @constructor
 * @public
 */
module.exports = Source;
function Source ( generatorPath ) {

    this._generator = '';
    is.string(generatorPath)&&this.generator(generatorPath);

    this.opt = {
        compress: false         // Minify CSS output
    };
};

Source.prototype = {
    constructor: Source,
    serialize: function ( options ) { throw new Error('"serialize" method isn\'t instaled'); },
    // #ffffff
    isHex: function ( data ) { return is.string(data)&&/^#{1,1}([0-9]|[a-f]){6,6}$/gi.test(data); },
    // rgb(51, 51, 51) || // rgba(51, 51, 51, 0.7)
    isRgb: function ( data ) { return is.string(data)&&/^rgba?\((\s?\d{1,3}\s?\,?){3}\s?([0-9\.]{0,3}\s)?\)$/g.test(data); },
    /**
     * load source of generator
     * @param { String } generatorPath - less file from dir "lib"
     * @returns { this }
     * @function
     */
    generator: function ( generatorPath ) {
        assert(is.string(generatorPath), '"generatorPath" required and must be a string');
        this._generator = fs.readFileSync( path.join(path.dirname(module.filename), generatorPath) ).toString();
        this.opt.filename = generatorPath;// Specify a filename, for better error messages
        return this;
    },
    /**
     * make a css source in string
     * @returns { Promise }
     * @function
     * @public
     */
    compile: function () {
        var src = this;
        src.serialize.apply(src, Array.prototype.slice.call(arguments, 0));
        return new Promise(function ( resolve, reject ) {
            require('less').render( src.variables+src._generator, src.opt,
            function ( error, output ) {
                if ( error ) return reject(error);
                else resolve(output.css);
            });
        });
    }
};