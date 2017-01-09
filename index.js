
'use strict';

var is = require('s-is');
var inherit = require('s-inherit');
var Source = require('./lib/Source.js');

// #ffffff
function isHex ( data ) {
    return is.string(data)&&/^#{1,1}([0-9]|[a-f]){6,6}$/gi.test(data);
}
// rgb(51, 51, 51) || // rgba(51, 51, 51, 0.7)
function isRgb ( data ) {
    return is.string(data)&&/^rgba?\((\s?\d{1,3}\s?\,?){3}\s?([0-9\.]{0,3}\s)?\)$/g.test(data);
}
// 20(rem,em,px,ex,pt,ch,pc,mm,cm,%)
function isUnit ( data ) {
    return /^\s*[0-9\.]+[rem|em|px|ex|pt|ch|pc|mm|cm|%]{1}/.test(data);
}
/**
 * generate themes css
 * @interface
 * @public
 */
var theme = module.exports = {
    full: function ( config, options ) {
        if ( !is._object(config) ) { throw new Error('Configuration of "full" required and must be an object'); }
        return new Promise(function ( resolve, reject ) {
            var item;
            var all = [];
            var bgs = {};
            var texts = {};
            var sizes = {};

            for ( var name in config ) {
                item = config[name];
                (isHex(item['background'])||isRgb(item['background']))&&(bgs[name]=item['background']);
                (isHex(item['color'])||isRgb(item['color']))&&(texts[name]=item['color']);
                isUnit(item['size'])&&(sizes[name+'-text']=item['size']);
            }

            if ( !is.empty(bgs) ) all.push( theme.bgColors(bgs, options) );
            if ( !is.empty(texts) ) all.push( theme.textColors(texts, options) );
            if ( !is.empty(sizes) ) all.push( theme.textSizes(sizes, options) );

            Promise.all(all).then(function ( res ) {
                resolve(res.join(''));
            }, reject);
            
        });
    },
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
            opt: Object.assign({compress: false}, is._object(options) ? options : {}),
            serialize: function () {
                var names = '@name-list:';
                var colors = '@value-list:';
                for ( var name in config ) {
                    if ( isHex(config[name])||isRgb(config[name]) ) {
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
            opt: Object.assign({compress: false}, is._object(options) ? options : {}),
            serialize: function () {
                var names = '@name-list:';
                var colors = '@value-list:';
                for ( var name in config ) {
                    if ( isHex(config[name])||isRgb(config[name]) ) {
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
            opt: Object.assign({compress: false}, is._object(options) ? options : {}),
            serialize: function () {
                var names = '@name-list:';
                var colors = '@value-list:';
                for ( var name in config ) {
                    if ( isUnit(config[name]) ) {
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

