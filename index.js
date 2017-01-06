
'use strict';

var is = require('s-is');
var inherit = require('s-inherit');
var Source = require('./lib/Source.js');
/**
 * generate themes css
 * @interface
 * @public
 */
module.exports = {
    /**
     * create css string from object for s-theme background colors
     * @example
        require('s-theme')
            .bgColors({'red': '#FF4136', 'green': '#2ECC40', 'blue': '#0074D9'}, {compress: false})
            .then(function ( sourceString ) {
                console.log( sourceString );
            });
     * @param { Object } config - data to generate themes
     * @param { Object } [options] - "less" render options
     * @returns { Promise }
     * @function
     * @public
     */
    bgColors: function ( config, options ) {
        if ( !is._object(config) ) { throw new Error('Configuration of "bgColors" required and must be an object'); }
        var src = new(inherit.decorate(Source, {
            opt: Object.assign({compress: false}, options),
            serialize: function () {
                var names = '@name-list:';
                var colors = '@value-list:';
                for ( var name in config ) {
                    if ( this.isHex(config[name])||this.isRgb(config[name]) ) {
                        names += name + ',';
                        colors += config[name] + ',';
                    }
                }
                this.variables = names.replace(/\,$/,';')+colors.replace(/\,$/,';');
            }
        }));
        return (src.generator('generator-bg.less').compile());
    },
    /**
     * create css string from object for s-theme text colors
     * @example
        require('s-theme')
            .textColors({'red': '#FF4136', 'green': '#2ECC40', 'blue': '#0074D9'}, {compress: false})
            .then(function ( sourceString ) {
                console.log( sourceString );
            });
     * @param { Object } config - data to generate themes
     * @param { Object } [options] - "less" render options
     * @returns { Promise }
     * @function
     * @public
     */
    textColors: function ( config, options ) {
        if ( !is._object(config) ) { throw new Error('Configuration of "textColors" required and must be an object'); }
        var src = new(inherit.decorate(Source, {
            opt: Object.assign({compress: false}, options),
            serialize: function () {
                var names = '@name-list:';
                var colors = '@value-list:';
                for ( var name in config ) {
                    if ( this.isHex(config[name])||this.isRgb(config[name]) ) {
                        names += name + ',';
                        colors += config[name] + ',';
                    }
                }
                this.variables = names.replace(/\,$/,';')+colors.replace(/\,$/,';');
            }
        }));
        return (src.generator('generator-text-color.less').compile());
    },
    /**
     * create css string from object for s-theme text sizes
     * @example
        require('s-theme')
            .textSizes({'head': '36px', 'common': '30px', 'sub': '18px'}, {compress: false})
            .then(function ( sourceString ) {
                console.log( sourceString );
            });
     * @param { Object } config - data to generate themes
     * @param { Object } [options] - "less" render options
     * @returns { Promise }
     * @function
     * @public
     */
    textSizes: function ( config, options ) {
        if ( !is._object(config) ) { throw new Error('Configuration of "textSizes" required and must be an object'); }
        var src = new(inherit.decorate(Source, {
            opt: Object.assign({compress: false}, options),
            serialize: function () {
                var names = '@name-list:';
                var colors = '@value-list:';
                for ( var name in config ) {
                    if ( /^\s*[0-9\.]+[rem|em|px|ex|pt|ch|pc|mm|cm|%]{1}/.test(config[name]) ) {
                        names += name + ',';
                        colors += config[name] + ',';
                    }
                }
                this.variables = names.replace(/\,$/,';')+colors.replace(/\,$/,';');
            }
        }));
        
        return (src.generator('generator-text-size.less').compile());
    },
};

