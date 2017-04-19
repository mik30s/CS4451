/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = function merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = merge(attrs, a[i]);
    }
    return attrs;
  }
  var ac = a['class'];
  var bc = b['class'];

  if (ac || bc) {
    ac = ac || [];
    bc = bc || [];
    if (!Array.isArray(ac)) ac = [ac];
    if (!Array.isArray(bc)) bc = [bc];
    a['class'] = ac.concat(bc).filter(nulls);
  }

  for (var key in b) {
    if (key != 'class') {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Filter null `val`s.
 *
 * @param {*} val
 * @return {Boolean}
 * @api private
 */

function nulls(val) {
  return val != null && val !== '';
}

/**
 * join array as classes.
 *
 * @param {*} val
 * @return {String}
 */
exports.joinClasses = joinClasses;
function joinClasses(val) {
  return (Array.isArray(val) ? val.map(joinClasses) :
    (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
    [val]).filter(nulls).join(' ');
}

/**
 * Render the given classes.
 *
 * @param {Array} classes
 * @param {Array.<Boolean>} escaped
 * @return {String}
 */
exports.cls = function cls(classes, escaped) {
  var buf = [];
  for (var i = 0; i < classes.length; i++) {
    if (escaped && escaped[i]) {
      buf.push(exports.escape(joinClasses([classes[i]])));
    } else {
      buf.push(joinClasses(classes[i]));
    }
  }
  var text = joinClasses(buf);
  if (text.length) {
    return ' class="' + text + '"';
  } else {
    return '';
  }
};


exports.style = function (val) {
  if (val && typeof val === 'object') {
    return Object.keys(val).map(function (style) {
      return style + ':' + val[style];
    }).join(';');
  } else {
    return val;
  }
};
/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = function attr(key, val, escaped, terse) {
  if (key === 'style') {
    val = exports.style(val);
  }
  if ('boolean' == typeof val || null == val) {
    if (val) {
      return ' ' + (terse ? key : key + '="' + key + '"');
    } else {
      return '';
    }
  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
    if (JSON.stringify(val).indexOf('&') !== -1) {
      console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
                   'will be escaped to `&amp;`');
    };
    if (val && typeof val.toISOString === 'function') {
      console.warn('Jade will eliminate the double quotes around dates in ' +
                   'ISO form after 2.0.0');
    }
    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
  } else if (escaped) {
    if (val && typeof val.toISOString === 'function') {
      console.warn('Jade will stringify dates in ISO form after 2.0.0');
    }
    return ' ' + key + '="' + exports.escape(val) + '"';
  } else {
    if (val && typeof val.toISOString === 'function') {
      console.warn('Jade will stringify dates in ISO form after 2.0.0');
    }
    return ' ' + key + '="' + val + '"';
  }
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} escaped
 * @return {String}
 */
exports.attrs = function attrs(obj, terse){
  var buf = [];

  var keys = Object.keys(obj);

  if (keys.length) {
    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i]
        , val = obj[key];

      if ('class' == key) {
        if (val = joinClasses(val)) {
          buf.push(' ' + key + '="' + val + '"');
        }
      } else {
        buf.push(exports.attr(key, val, false, terse));
      }
    }
  }

  return buf.join('');
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

var jade_encode_html_rules = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;'
};
var jade_match_html = /[&<>"]/g;

function jade_encode_char(c) {
  return jade_encode_html_rules[c] || c;
}

exports.escape = jade_escape;
function jade_escape(html){
  var result = String(html).replace(jade_match_html, jade_encode_char);
  if (result === '' + html) return html;
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the jade in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

exports.rethrow = function rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || __webpack_require__(46).readFileSync(filename, 'utf8')
  } catch (ex) {
    rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Jade') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};

exports.DebugItem = function DebugItem(lineno, filename) {
  this.lineno = lineno;
  this.filename = filename;
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {


exports.bindBehaviorsMixin = __webpack_require__(43);
exports.appendToClassMixin = __webpack_require__(2);

/***/ }),
/* 2 */
/***/ (function(module, exports) {


module.exports = {
    paramAttributes: [ 'class' ],

    compiled: function () {
        var vm = this;
        var componentName = this.$options.name.toLowerCase();

        if(vm.class) {
            var $element = $(vm.$el).find('.ui.' + componentName) || $(vm.$el);
            $element.addClass(vm.class);
        }
    }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap) {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
  var base64 = new Buffer(JSON.stringify(sourceMap)).toString('base64');
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

  return '/*# ' + data + ' */';
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).Buffer))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		// Test for IE <= 9 as proposed by Browserhacks
		// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
		// Tests for existence of standard globals is to allow style-loader 
		// to operate correctly into non-standard environments
		// @see https://github.com/webpack-contrib/style-loader/issues/177
		return window && document && document.all && !window.atob;
	}),
	getElement = (function(fn) {
		var memo = {};
		return function(selector) {
			if (typeof memo[selector] === "undefined") {
				memo[selector] = fn.call(this, selector);
			}
			return memo[selector]
		};
	})(function (styleTarget) {
		return document.querySelector(styleTarget)
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [],
	fixUrls = __webpack_require__(21);

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (typeof options.insertInto === "undefined") options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var styleTarget = getElement(options.insertInto)
	if (!styleTarget) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			styleTarget.insertBefore(styleElement, styleTarget.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			styleTarget.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			styleTarget.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		styleTarget.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	options.attrs.type = "text/css";

	attachTagAttrs(styleElement, options.attrs);
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	attachTagAttrs(linkElement, options.attrs);
	insertStyleElement(options, linkElement);
	return linkElement;
}

function attachTagAttrs(element, attrs) {
	Object.keys(attrs).forEach(function (key) {
		element.setAttribute(key, attrs[key]);
	});
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement, options);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
	and there is no publicPath defined then lets turn convertToAbsoluteUrls
	on by default.  Otherwise default to the convertToAbsoluteUrls option
	directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls){
		css = fixUrls(css);
	}

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var vueUI = __webpack_require__(44);

module.exports = function(mountId){
	var vueInstance = new Vue({
		el: "#" + mountId,
		data: {
			greeting: "Hello VueJs!"
		},
		methods:{
			loadData: function(){

			}
		}
	});

	return vueInstance;
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var Technician = __webpack_require__(5);

var main = function(){
	console.log("App started");
	var technicianView = new Technician("technician-vue-instance");
};

module.exports = main();


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(7)
var ieee754 = __webpack_require__(11)
var isArray = __webpack_require__(12)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "/*\n * # Semantic UI\n * https://github.com/Semantic-Org/Semantic-UI\n * http://beta.semantic-ui.com/\n *\n * Copyright 2014 Contributors\n * Released under the MIT license\n * http://opensource.org/licenses/MIT\n *\n */\n/*******************************\n            Progress\n*******************************/\n.ui.progress {\n  position: relative;\n  display: block;\n  max-width: 100%;\n  border: 1px solid rgba(39, 41, 43, 0.15);\n  margin: 1em 0em 2.5em;\n  box-shadow: none;\n  background: rgba(0, 0, 0, 0.03);\n  padding: 0.2857em;\n  border-radius: 0.2857rem; }\n\n.ui.progress:first-child {\n  margin: 0em 0em 2.5em; }\n\n.ui.progress:last-child {\n  margin: 0em 0em 1.5em; }\n\n/* Indicating */\n.ui.indicating.progress .bar[style^=\"width: 3\"] {\n  background-color: #d9a65c; }\n\n.ui.indicating.progress .bar[style^=\"width: 4\"],\n.ui.indicating.progress .bar[style^=\"width: 5\"] {\n  background-color: #e6bb48; }\n\n.ui.indicating.progress .bar[style^=\"width: 6\"] {\n  background-color: #ddc928; }\n\n.ui.indicating.progress .bar[style^=\"width: 7\"],\n.ui.indicating.progress .bar[style^=\"width: 8\"] {\n  background-color: #b4d95c; }\n\n.ui.indicating.progress .bar[style^=\"width: 9\"],\n.ui.indicating.progress .bar[style^=\"width: 100\"] {\n  background-color: #66da81; }\n\n.ui.indicating.progress .bar[style^=\"width: 1%\"],\n.ui.indicating.progress .bar[style^=\"width: 2%\"],\n.ui.indicating.progress .bar[style^=\"width: 3%\"],\n.ui.indicating.progress .bar[style^=\"width: 4%\"],\n.ui.indicating.progress .bar[style^=\"width: 5%\"],\n.ui.indicating.progress .bar[style^=\"width: 6%\"],\n.ui.indicating.progress .bar[style^=\"width: 7%\"],\n.ui.indicating.progress .bar[style^=\"width: 8%\"],\n.ui.indicating.progress .bar[style^=\"width: 9%\"],\n.ui.indicating.progress .bar[style^=\"width: 1\"],\n.ui.indicating.progress .bar[style^=\"width: 2\"] {\n  background-color: #d95c5c; }\n\n/* Single Digits Last */\n.ui.indicating.progress .bar[style^=\"width: 1%\"] + .label,\n.ui.indicating.progress .bar[style^=\"width: 2%\"] + .label,\n.ui.indicating.progress .bar[style^=\"width: 3%\"] + .label,\n.ui.indicating.progress .bar[style^=\"width: 4%\"] + .label,\n.ui.indicating.progress .bar[style^=\"width: 5%\"] + .label,\n.ui.indicating.progress .bar[style^=\"width: 6%\"] + .label,\n.ui.indicating.progress .bar[style^=\"width: 7%\"] + .label,\n.ui.indicating.progress .bar[style^=\"width: 8%\"] + .label,\n.ui.indicating.progress .bar[style^=\"width: 9%\"] + .label,\n.ui.indicating.progress .bar[style^=\"width: 1\"] + .label,\n.ui.indicating.progress .bar[style^=\"width: 2\"] + .label {\n  color: #d95c5c; }\n\n.ui.indicating.progress .bar[style^=\"width: 3\"] + .label {\n  color: #d9a65c; }\n\n.ui.indicating.progress .bar[style^=\"width: 4\"] + .label,\n.ui.indicating.progress .bar[style^=\"width: 5\"] + .label {\n  color: #e6bb48; }\n\n.ui.indicating.progress .bar[style^=\"width: 6\"] + .label {\n  color: #ddc928; }\n\n.ui.indicating.progress .bar[style^=\"width: 7\"] + .label,\n.ui.indicating.progress .bar[style^=\"width: 8\"] + .label {\n  color: #b4d95c; }\n\n.ui.indicating.progress .bar[style^=\"width: 9\"] + .label,\n.ui.indicating.progress .bar[style^=\"width: 100\"] + .label {\n  color: #66da81; }\n\n.ui.indicating.progress.success .bar + .label {\n  color: #356e36; }\n\n/*******************************\n            Content\n*******************************/\n/* Activity Bar */\n.ui.progress .bar {\n  display: block;\n  line-height: 1;\n  position: relative;\n  width: 0%;\n  min-width: 2em;\n  height: 1.75em;\n  background: #888888;\n  border-radius: 0.2857rem;\n  -webkit-transition: width 0.5s ease, background-color 0.4s ease;\n  transition: width 0.5s ease, background-color 0.4s ease; }\n\n/* Percent Complete */\n.ui.progress .bar > .progress {\n  white-space: nowrap;\n  position: absolute;\n  width: auto;\n  font-size: 0.9em;\n  top: 50%;\n  right: 0.5em;\n  left: auto;\n  bottom: auto;\n  color: rgba(255, 255, 255, 0.8);\n  text-shadow: none;\n  margin-top: -0.5em;\n  font-weight: bold;\n  text-align: left; }\n\n/* Label */\n.ui.progress > .label {\n  position: absolute;\n  width: 100%;\n  font-size: 1em;\n  top: 100%;\n  right: auto;\n  left: 0%;\n  bottom: auto;\n  color: rgba(0, 0, 0, 0.8);\n  font-weight: bold;\n  text-shadow: none;\n  margin-top: 0.2em;\n  text-align: center;\n  -webkit-transition: color 0.4s ease;\n  transition: color 0.4s ease; }\n\n/*******************************\n             States\n*******************************/\n/*--------------\n     Success\n---------------*/\n.ui.progress.success .bar {\n  background-color: #5bbd72 !important; }\n\n.ui.progress.success .bar,\n.ui.progress.success .bar::after {\n  -webkit-animation: none !important;\n  animation: none !important; }\n\n.ui.progress.success > .label {\n  color: #356e36; }\n\n/*--------------\n     Warning\n---------------*/\n.ui.progress.warning .bar {\n  background-color: #f2c037 !important; }\n\n.ui.progress.warning .bar,\n.ui.progress.warning .bar::after {\n  -webkit-animation: none !important;\n  animation: none !important; }\n\n.ui.progress.warning > .label {\n  color: #825c01; }\n\n/*--------------\n     Error\n---------------*/\n.ui.progress.error .bar {\n  background-color: #d95c5c !important; }\n\n.ui.progress.error .bar,\n.ui.progress.error .bar::after {\n  -webkit-animation: none !important;\n  animation: none !important; }\n\n.ui.progress.error > .label {\n  color: #912d2b; }\n\n/*--------------\n     Active\n---------------*/\n.ui.active.progress .bar {\n  position: relative;\n  min-width: 2em; }\n\n.ui.active.progress .bar::after {\n  content: '';\n  opacity: 0;\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  right: 0px;\n  bottom: 0px;\n  background: #ffffff;\n  border-radius: 0.2857rem;\n  -webkit-animation: progress-active 2s ease infinite;\n  animation: progress-active 2s ease infinite; }\n\n@-webkit-keyframes progress-active {\n  0% {\n    opacity: 0.3;\n    width: 0; }\n  100% {\n    opacity: 0;\n    width: 100%; } }\n\n@keyframes progress-active {\n  0% {\n    opacity: 0.3;\n    width: 0; }\n  100% {\n    opacity: 0;\n    width: 100%; } }\n\n/*--------------\n    Disabled\n---------------*/\n.ui.disabled.progress {\n  opacity: 0.35; }\n\n.ui.disabled.progress .bar,\n.ui.disabled.progress .bar::after {\n  -webkit-animation: none !important;\n  animation: none !important; }\n\n/*******************************\n           Variations\n*******************************/\n/*--------------\n    Inverted\n---------------*/\n/* bottom attached */\n.ui.inverted.progress {\n  background: rgba(255, 255, 255, 0.05);\n  border: none; }\n\n.ui.inverted.progress .bar {\n  background: #888888; }\n\n.ui.inverted.progress .bar > .progress {\n  color: #fafafa; }\n\n.ui.inverted.progress > .label {\n  color: #ffffff; }\n\n.ui.inverted.progress.success > .label {\n  color: #5bbd72; }\n\n.ui.inverted.progress.warning > .label {\n  color: #f2c037; }\n\n.ui.inverted.progress.error > .label {\n  color: #d95c5c; }\n\n/*--------------\n    Attached\n---------------*/\n/* bottom attached */\n.ui.progress.attached {\n  background: none transparent;\n  position: relative;\n  border: none;\n  margin: 0em; }\n\n.ui.progress.attached,\n.ui.progress.attached .bar {\n  display: block;\n  height: 0.25em;\n  padding: 0px;\n  overflow: hidden;\n  border-radius: 0em 0em 0.2857rem 0.2857rem; }\n\n.ui.progress.attached .bar {\n  border-radius: 0em; }\n\n/* top attached */\n.ui.progress.top.attached,\n.ui.progress.top.attached .bar {\n  top: 0px;\n  border-radius: 0.2857rem 0.2857rem 0em 0em; }\n\n.ui.progress.top.attached .bar {\n  border-radius: 0em; }\n\n/*--------------\n     Colors\n---------------*/\n.ui.black.progress .bar {\n  background-color: #1b1c1d; }\n\n.ui.blue.progress .bar {\n  background-color: #3b83c0; }\n\n.ui.green.progress .bar {\n  background-color: #5bbd72; }\n\n.ui.orange.progress .bar {\n  background-color: #e07b53; }\n\n.ui.pink.progress .bar {\n  background-color: #d9499a; }\n\n.ui.purple.progress .bar {\n  background-color: #564f8a; }\n\n.ui.red.progress .bar {\n  background-color: #d95c5c; }\n\n.ui.teal.progress .bar {\n  background-color: #00b5ad; }\n\n.ui.yellow.progress .bar {\n  background-color: #f2c61f; }\n\n.ui.black.inverted.progress .bar {\n  background-color: #333333; }\n\n.ui.blue.inverted.progress .bar {\n  background-color: #54c8ff; }\n\n.ui.green.inverted.progress .bar {\n  background-color: #2ecc40; }\n\n.ui.orange.inverted.progress .bar {\n  background-color: #ff851b; }\n\n.ui.pink.inverted.progress .bar {\n  background-color: #ff8edf; }\n\n.ui.purple.inverted.progress .bar {\n  background-color: #cdc6ff; }\n\n.ui.red.inverted.progress .bar {\n  background-color: #ff695e; }\n\n.ui.teal.inverted.progress .bar {\n  background-color: #6dffff; }\n\n.ui.yellow.inverted.progress .bar {\n  background-color: #ffe21f; }\n\n/*--------------\n     Sizes\n---------------*/\n.ui.small.progress .bar {\n  height: 14px; }\n", ""]);

// exports


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "/*\n * # Semantic UI\n * https://github.com/Semantic-Org/Semantic-UI\n * http://beta.semantic-ui.com/\n *\n * Copyright 2014 Contributors\n * Released under the MIT license\n * http://opensource.org/licenses/MIT\n *\n */\n/*******************************\n           Rating\n*******************************/\n.ui.rating {\n  display: inline-block;\n  font-size: 0em;\n  vertical-align: baseline; }\n\n.ui.rating:last-child {\n  margin-right: 0em; }\n\n.ui.rating:before {\n  display: block;\n  content: '';\n  visibility: hidden;\n  clear: both;\n  height: 0; }\n\n/* Icon */\n.ui.rating .icon {\n  cursor: pointer;\n  margin: 0em;\n  width: 1.1em;\n  text-align: center;\n  height: auto;\n  padding: 0em;\n  font-weight: normal;\n  font-style: normal;\n  vertical-align: baseline; }\n\n/*******************************\n             Types\n*******************************/\n/*-------------------\n        Star\n--------------------*/\n/* Inactive */\n.ui.star.rating .icon {\n  width: 1.1em;\n  color: rgba(0, 0, 0, 0.15); }\n\n/* Active Star */\n.ui.star.rating .active.icon {\n  color: #ffe623 !important;\n  text-shadow: 0px -1px 0px #cfa300, -1px 0px 0px #cfa300, 0px 1px 0px #cfa300, 1px 0px 0px #cfa300; }\n\n/* Selected Star */\n.ui.star.rating .icon.selected,\n.ui.star.rating .icon.selected.active {\n  color: #ffb70a !important; }\n\n.ui.star.rating.partial {\n  position: relative;\n  z-index: 1; }\n\n.ui.star.rating.partial:before {\n  position: absolute;\n  z-index: -1; }\n\n/*-------------------\n        Heart\n--------------------*/\n.ui.heart.rating .icon {\n  width: 1.25em;\n  color: rgba(0, 0, 0, 0.15); }\n\n/* Active Heart */\n.ui.heart.rating .active.icon {\n  color: #ff2733 !important;\n  text-shadow: 0px -1px 0px #9e0000, -1px 0px 0px #9e0000, 0px 1px 0px #9e0000, 1px 0px 0px #9e0000; }\n\n/* Selected Heart */\n.ui.heart.rating .icon.selected,\n.ui.heart.rating .icon.selected.active {\n  color: #ff2733 !important; }\n\n/*******************************\n             States\n*******************************/\n/* Inactive Icon */\n.ui.rating .icon {\n  color: rgba(0, 0, 0, 0.15); }\n\n/* Active Icon */\n.ui.rating .active.icon {\n  color: rgba(0, 0, 0, 0.85); }\n\n/* Selected Icon */\n.ui.rating .icon.selected,\n.ui.rating .icon.selected.active {\n  color: rgba(0, 0, 0, 0.8); }\n\n/*-------------------\n       Disabled\n--------------------*/\n/* disabled rating */\n.ui.disabled.rating .icon {\n  cursor: default; }\n\n/*-------------------\n     Interacting (Active)\n--------------------*/\n/* Selected Rating */\n.ui.rating.selected .active.icon {\n  opacity: 0.5; }\n\n.ui.rating.selected .icon.selected,\n.ui.rating .icon.selected {\n  opacity: 1; }\n\n/*******************************\n          Variations\n*******************************/\n.ui.mini.rating .icon {\n  font-size: 0.7rem; }\n\n.ui.tiny.rating .icon {\n  font-size: 0.8rem; }\n\n.ui.small.rating .icon {\n  font-size: 0.875rem; }\n\n.ui.rating .icon {\n  font-size: 1rem; }\n\n.ui.large.rating .icon {\n  font-size: 1.1rem; }\n\n.ui.huge.rating .icon {\n  font-size: 1.5rem; }\n\n.ui.massive.rating .icon {\n  font-size: 2rem; }\n\n/* Realign */\n.ui.large.rating,\n.ui.huge.rating,\n.ui.massive.rating {\n  vertical-align: middle; }\n\n/*******************************\n         Theme Overrides\n*******************************/\n@font-face {\n  font-family: 'Rating';\n  src: url(data:application/x-font-ttf;charset=utf-8;base64,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) format(\"truetype\"), url(data:application/font-woff;charset=utf-8;base64,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kIiRi5MI5vdUFfcni4vCBYufhJx8mn2ZepJ3i3aLeoR9fX18g3qLdwiLVAUO+yaLshWL+AQFi5GNkY+RjpCQj5KNj42PjI+LCPfAiwWPi4+Kj4mRiZCHj4aPhY2Fi4UIi/wEBYuEiYWHhoeGhoeFiIiKhoqHi4GLhI6EkQj7EvcN+xL7DQWEhYOIgouHi4eLh42EjoaPiJCHkImRi5IIDov3XRWLko2Rj5Kltq+vuKW4pbuZvYu9i7t9uHG4ca9npWCPhI2Fi4SLhYmEh4RxYGdoXnAIXnFbflmLWYtbmF6lXqZnrnG2h5KJkouRCLCLFaRkq2yxdLF0tH+4i7iLtJexorGiq6qksm64Z61goZZ3kXaLdItnfm1ycnJybX9oiwhoi22XcqRypH6pi6+LopGglp9gdWdpbl4I9xiwFYuHjIiOiI6IjoqPi4+LjoyOjo2OjY6Lj4ubkJmXl5eWmZGbi4+LjoyOjo2OjY6LjwiLj4mOiY6IjYiNh4tzi3eCenp6eoJ3i3MIDov3XRWLko2Sj5GouK+utqW3pbqYvouci5yJnIgIm6cFjY6NjI+LjIuNi42JjYqOio+JjomOiY6KjomOiY6JjoqNioyKjomMiYuHi4qLiouLCHdnbVVjQ2NDbVV3Zwh9cgWJiIiJiIuJi36SdJiIjYmOi46LjY+UlJlvl3KcdJ90oHeie6WHkYmSi5IIsIsVqlq0Z711CKGzBXqXfpqCnoKdhp6LoIuikaCWn2B1Z2luXgj3GLAVi4eMiI6IjoiOio+Lj4uOjI6OjY6NjouPi5uQmZeXl5aZkZuLj4uOjI6OjY6NjouPCIuPiY6JjoiNiI2Hi3OLd4J6enp6gneLcwji+10VoLAFtI+wmK2hrqKnqKKvdq1wp2uhCJ2rBZ1/nHycepx6mHqWeY+EjYWLhIuEiYWHhIR/gH1+fG9qaXJmeWV5Y4Jhiwi53BXb9yQFjIKMg4uEi3CDc3x1fHV3fHOBCA6L1BWL90sFi5WPlJKSkpKTj5aLCNmLBZKPmJqepJaZlZeVlY+Qj5ONl42WjpeOmI+YkZWTk5OSk46Vi5uLmYiYhZiFlIGSfgiSfo55i3WLeYd5gXgIvosFn4uchJl8mn2Seot3i3qGfIJ9jYSLhYuEi3yIfoR+i4eLh4uHi3eGen99i3CDdnt8CHt8dYNwiwhmiwV5i3mNeY95kHeRc5N1k36Ph4sIOYsFgIuDjoSShJKHlIuVCLCdFYuGjIePiI+Hj4mQi5CLj42Pj46OjY+LkIuQiZCIjoePh42Gi4aLh4mHh4eIioaLhgjUeRWUiwWNi46Lj4qOi4+KjYqOi4+Kj4mQio6KjYqNio+Kj4mQio6KjIqzfquEpIsIrosFr4uemouri5CKkYqQkY6QkI6SjpKNkouSi5KJkoiRlZWQlouYi5CKkImRiZGJj4iOCJGMkI+PlI+UjZKLkouViJODk4SSgo+CiwgmiwWLlpCalJ6UnpCbi5aLnoiYhJSFlH+QeYuGhoeDiYCJf4h/h3+IfoWBg4KHh4SCgH4Ii4qIiYiGh4aIh4mIiIiIh4eGh4aHh4eHiIiHiIeHiIiHiIeKh4mIioiLCIKLi/tLBQ6L90sVi/dLBYuVj5OSk5KSk46WiwjdiwWPi5iPoZOkk6CRnZCdj56Nn4sIq4sFpougg5x8m3yTd4txCIuJBZd8kHuLd4uHi4eLh5J+jn6LfIuEi4SJhZR9kHyLeot3hHp8fH19eoR3iwhYiwWVeI95i3mLdIh6hH6EfoKBfoV+hX2He4uBi4OPg5KFkYaTh5SHlYiTipOKk4qTiJMIiZSIkYiPgZSBl4CaeKR+moSPCD2LBYCLg4+EkoSSh5SLlQiw9zgVi4aMh4+Ij4ePiZCLkIuPjY+Pjo6Nj4uQi5CJkIiOh4+HjYaLhouHiYeHh4iKhouGCNT7OBWUiwWOi46Kj4mPio+IjoiPh4+IjoePiI+Hj4aPho6HjoiNiI6Hj4aOho6Ii4qWfpKDj4YIk4ORgY5+j36OgI1/jYCPg5CGnYuXj5GUkpSOmYuei5aGmoKfgp6GmouWCPCLBZSLlI+SkpOTjpOLlYuSiZKHlIeUho+Fi46PjY+NkY2RjJCLkIuYhpaBlY6RjZKLkgiLkomSiJKIkoaQhY6MkIyRi5CLm4aXgpOBkn6Pe4sIZosFcotrhGN9iouIioaJh4qHiomKiYqIioaKh4mHioiKiYuHioiLh4qIi4mLCIKLi/tLBQ77lIv3txWLkpCPlo0I9yOgzPcWBY6SkI+RiwiL/BL7FUcFh4mHioiLh4uIjImOiY6KjouPi4yLjYyOCKP3IyPwBYaQiZCLjwgOi/fFFYu1l6yjoqOjrZe2i5aLl4mYh5eHloWWhJaElIWShZOE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) format(\"woff\");\n  font-weight: normal;\n  font-style: normal; }\n\n.ui.rating .icon {\n  font-family: 'Rating';\n  line-height: 1;\n  height: 1em;\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n  font-weight: normal;\n  font-style: normal;\n  text-align: center; }\n\n/* Empty Star */\n.ui.rating .icon:before {\n  content: '\\F006'; }\n\n/* Active Star */\n.ui.rating .active.icon:before {\n  content: '\\F005'; }\n\n/*-------------------\n        Star\n--------------------*/\n/* Unfilled Star */\n.ui.star.rating .icon:before {\n  content: '\\F005'; }\n\n/* Active Star */\n.ui.star.rating .active.icon:before {\n  content: '\\F005'; }\n\n/* Partial */\n.ui.star.rating .partial.icon:before {\n  content: '\\F006'; }\n\n.ui.star.rating .partial.icon {\n  content: '\\F005'; }\n\n/*-------------------\n        Heart\n--------------------*/\n/* Empty Heart\n.ui.heart.rating .icon:before {\n  content: '\\f08a';\n}\n*/\n.ui.heart.rating .icon:before {\n  content: '\\F004'; }\n\n/* Active */\n.ui.heart.rating .active.icon:before {\n  content: '\\F004'; }\n\n/*******************************\n         Site Overrides\n*******************************/\n", ""]);

// exports


/***/ }),
/* 11 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 12 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var jade = __webpack_require__(0);

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div v-el=\"accordion\" class=\"ui accordion\"><div v-repeat=\"sections\"><div class=\"title\"><content select=\".title\"><i class=\"dropdown icon\"></i>{{* title}}</content></div><div class=\"content {{ active === $index ? 'active' : '' }}\"><content select=\".content\">{{* content}}</content></div></div></div>");;return buf.join("");
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var jade = __webpack_require__(0);

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div v-el=\"checkbox\" class=\"ui checkbox\"><input type=\"{{* type}}\" name=\"{{* name}}\" v-attr=\"value: value\"><content select=\"label\"><label v-if=\"type === 'checkbox'\">{{* label}}</label><label v-if=\"type === 'radio'\">{{* label ? label : value}}</label></content></div>");;return buf.join("");
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var jade = __webpack_require__(0);

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div v-el=\"dropdown\" class=\"ui dropdown\"><input type=\"hidden\" name=\"{{* name}}\"><div class=\"text\">{{* label}}</div><i class=\"dropdown icon\"></i><content select=\".menu\"><div class=\"menu\"><content select=\".item\"><div v-repeat=\"options\" v-attr=\"data-value: value\" class=\"item\">{{* text}}</div></content></div></content></div>");;return buf.join("");
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var jade = __webpack_require__(0);

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div v-el=\"modal\" v-class=\"type, size\" class=\"ui modal\"><i class=\"close icon\"></i><div class=\"header\"><content select=\".header\">{{* title}}</content></div><content select=\".content\"></content><div class=\"actions\"><content select=\".actions\"><div class=\"ui negative button\">Cancel</div><div class=\"ui positive right labeled icon button\">OK<i class=\"checkmark icon\"></i></div></content></div></div>");;return buf.join("");
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var jade = __webpack_require__(0);

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"ui popup\"><content><div v-if=\"title\" class=\"header\">{{* title}}</div><content select=\".content\"><div class=\"content\">{{* content}}</div></content></content></div>");;return buf.join("");
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var jade = __webpack_require__(0);

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div v-class=\"active : isActive, status\" class=\"ui progress\"><div v-style=\"width: progress + '%'\" class=\"bar\"><content select=\".progress\"><div class=\"progress\">{{progress}}%</div></content></div><content select=\".label\"><div class=\"label\">{{ isActive ? 'Running' : 'Done' }}</div></content></div>");;return buf.join("");
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var jade = __webpack_require__(0);

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div v-class=\"selected: selected &gt; 0, disabled: disabled\" class=\"ui rating\"><i v-repeat=\"icons\" v-class=\"active: $value &lt;= rating, selected: $value &lt;= selected\" v-on=\"mouseenter: $select($value), mouseleave: selected = 0, click: $setRating($value)\" class=\"icon\"></i></div>");;return buf.join("");
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var jade = __webpack_require__(0);

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<aside v-class=\"direction\" v-el=\"sidebar\" class=\"ui sidebar\"><content><h1>Sidebar</h1></content></aside>");;return buf.join("");
}

/***/ }),
/* 21 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(4)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../css-loader/index.js!../../../sass-loader/lib/loader.js!./progress.css", function() {
			var newContent = require("!!../../../css-loader/index.js!../../../sass-loader/lib/loader.js!./progress.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(10);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(4)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../css-loader/index.js!../../../sass-loader/lib/loader.js!./rating.css", function() {
			var newContent = require("!!../../../css-loader/index.js!../../../sass-loader/lib/loader.js!./rating.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {


var mixins = __webpack_require__(1);

module.exports = {
    name: 'Accordion',

    paramAttributes: [ 'active' ],

    mixins: [
        mixins.appendToClassMixin,
        mixins.bindBehaviorsMixin
    ],

    template: __webpack_require__(13),

	compiled: function() {
		if(this.active) this.active = parseInt(this.active, 10);
		$(this.$$.accordion).accordion();
	},

    data: function () {
        return {
            sections: [],
            active: -1
        };
    },

    behaviors: [ 'open', 'close', 'toggle' ]

};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Export component definition
 */

module.exports = __webpack_require__(24);

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var mixins = __webpack_require__(1);

module.exports = {
    name: 'Checkbox',

    template: __webpack_require__(14),

    paramAttributes: ['type', 'name', 'checked', 'label', 'value'],

    compiled: function () {
        $(this.$$.checkbox).checkbox();
    },

    ready: function () {
        if(this.checked === 'checked') this.$check();
    },

    mixins: [
        mixins.appendToClassMixin,
        mixins.bindBehaviorsMixin
    ],

    data: function () {
        return {
            type: 'checkbox',
            disabled: false
        };
    },

    watch: {
        disabled: function (isDisabled) {
            isDisabled ? this.$disable() : this.$enable();
        }
    },

    behaviors: [
        'toggle',
        'check',
        'uncheck',
        'enable',
        'disable',
        'is checked',
        'is radio'
    ]
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Export component definition
 */

module.exports = __webpack_require__(26);

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies
 */

var mixins = __webpack_require__(1);


/**
 *  <ui-select> definition
 */

module.exports = {
    name: 'Dropdown',

    paramAttributes: [ 'options', 'label', 'type', 'on', 'name' ],

    mixins: [ mixins.bindBehaviorsMixin ],

    compiled: function () {
        var $dropdown = $(this.$$.dropdown);

        $dropdown.addClass(this.type);
        $dropdown.dropdown({ on: this.on });
    },

    destroy: function () {
        $(this.$$.dropdown).dropdown('destroy');
    },

    data: function () {
        return {
            label: '',
            type: '',
            on: 'click',
            name: '',
            options: []
        };
    },

    computed: {
        selected: {
            get: function() {
                return $(this.$$.dropdown).dropdown('get value');
            },
            set: function (value) {
                $(this.$$.dropdown).dropdown('set value', value);
            }
        }
    },

    behaviors: [
        'toggle',
        'show',
        'hide'
    ],

    template: __webpack_require__(15)
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Export component definition
 */

module.exports = __webpack_require__(28);

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Export component definition
 */

module.exports = __webpack_require__(31);

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies
 */

var mixins = __webpack_require__(1);


/**
 *  <ui-modal> definition
 */

module.exports = {
    name: 'Modal',

    paramAttributes: [ 'type', 'title', 'size' ],

    mixins: [
        mixins.bindBehaviorsMixin
    ],

    compiled: function () {
        var vm = this;

        $(this.$$.modal).modal({
            onApprove: function () {
                vm.$emit('approved');
            },
            onDeny: function () {
                vm.$emit('denied');
            }
        });
    },

    data: function () {
        return {
            title: '',
            type: 'standard',
            size: ''
        }
    },

    behaviors: [
		'show',
        'hide',
        'toggle',
        'is active'
    ],

    template: __webpack_require__(16),

    replace: true
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Export component definition
 */

module.exports = __webpack_require__(33);

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * <ui-popup> definition
 */

module.exports = {
    name: 'Popup',

    paramAttributes: [ 'title', 'content', 'on', 'position', 'variation' ],

    compiled: function () {
        $(this.$el).addClass(this.variation);
    },

    ready: function () {
        var vm = this;
        var $activator = $(vm.$el).prev();

        $activator.popup({
            popup: $(vm.$el),
            position: vm.position,
            on: vm.on
        });

        // Bind behavior
        vm.$toggle = $activator.popup.bind($activator, 'toggle');
        vm.$show = $activator.popup.bind($activator, 'show');
        vm.$hide = $activator.popup.bind($activator, 'hide');
        vm.$isVisible = $activator.popup.bind($activator, 'is visible');
        vm.$remove = function () {
            $activator.popup('remove');
            vm.$destroy();
        };
    },

    data: function () {
        return {
            position: 'top right',
            on: 'hover',
            variation: '',
            title: '',
            content: ''
        };
    },

    template: __webpack_require__(17),

    replace: true
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Load the CSS for this component
 */

__webpack_require__(22);


/**
 * Export component definition
 */

module.exports = __webpack_require__(35);


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies
 */

var appendToClassMixin = __webpack_require__(2);


/**
 * <ui-progress> definition
 */

module.exports = {
    name: 'Progress',

    paramAttributes: [ 'value', 'total' ],

    mixins: [ appendToClassMixin ],

    compiled: function () {
        var vm = this;

        if(vm.value) vm.value = parseInt(vm.value, 10);
        if(vm.total) vm.total = parseInt(vm.total, 10);
    },

    data: function () {

        return {
            autoStatus: true,
            isActive: false,
            status: '',
            value: 0,
            total: 100
        };
    },

    methods: {
        $increment: function (value) {
            var vm = this;
            var increment = value || 1;
            var newValue = vm.value + increment;

            if(newValue <= vm.total) vm.value = newValue;
            else console.warn('Value cannot increment above total', vm.total);
        },

        $decrement: function (value) {
            var vm = this;
            var decrement = value || 1;
            var newValue = vm.value - decrement;

            if(newValue > -1) vm.value = newValue;
            else console.warn('Value cannot decrement under 0');
        }
    },

    computed: {
      progress: function () {
          return Math.round((this.value / this.total) * 100);
      }
    },

    watch: {
		'value > 0 && value < total': function() {
			this.isActive = true;
		},
        'value === total': function () {
            var vm = this;

            // Set the status to be 'success' by default
            if(vm.autoStatus) vm.status = "success";

            vm.isActive = false;
            vm.$emit('completed');
        }
    },

    template: __webpack_require__(18)
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Load the CSS for this component
 */

__webpack_require__(23);


/**
 * Export component definition
 */

module.exports = __webpack_require__(37);


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies
 */

var appendToClassMixin = __webpack_require__(2);


/**
 *  <ui-rating> definition
 *  TODO: Re-implment disable such that events are turned off instead of just locking changes, for better performance
 */

module.exports = {
    name: 'Rating',

    paramAttributes: [ 'rating', 'max' ],

    mixins: [ appendToClassMixin ],

    compiled: function () {
        if(this.rating) this.rating = parseInt(this.rating, 10);
        if(this.max) this.max = parseInt(this.max, 10);

        for(var i = 1; i <= this.max; i += 1) {
            this.icons.push(i);
        }
    },

    data: function () {
        return {
            type: 'star',
            rating: 0,
            max: 5,
            selected: 0,
            disabled: false,
            icons: []
        }
    },

    methods: {
        $setRating: function (value) {
            if(value > this.max) return console.warn('Rating cannot exceed ', this.max);
            if(!this.disabled) this.rating = value;
        },

        $select: function (value) {
            if(!this.disabled) this.selected = value;
        }
    },

    template: __webpack_require__(19)
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Export component definition
 */

module.exports = __webpack_require__(39);

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies
 */

var mixins = __webpack_require__(1);


/**
 *  <ui-sidebar> definition
 */

module.exports = {
    name: 'Sidebar',

    paramAttributes: [ 'transition', 'direction', 'dimPage' ],

    compiled: function () {
		var $sidebar = $(this.$$.sidebar);
        this.dimPage = this.dimPage ? true : false;

        $sidebar.sidebar({
            transition: this.transition,
            dimPage: this.dimPage
        });
		
		if(this.class) $sidebar.addClass('ui sidebar');
    },

    data: function () {
        return {
            transition: 'push',
            direction: 'left',
            dimPage: false
        }
    },

    mixins: [
        mixins.appendToClassMixin,
        mixins.bindBehaviorsMixin
    ],

    behaviors: [ 'show', 'hide', 'toggle' ],

    template: __webpack_require__(20),

	replace: true
};


/***/ }),
/* 40 */
/***/ (function(module, exports) {


/**
 * transition definition
 *
 * @param {Object} settings - Animation settings to use
 */

module.exports = function (name) {

    return {
        enter: function (el, done) {
            $(el)
                .transition('reset')
                .transition(name + ' in', 700, done);

            return function() {
                $(el).transition('stop');
            }
        },

        leave: function (el, done) {
            $(el)
                .transition('reset')
                .transition(name + ' out', 700, done);

            return function() {
                $(el).transition('stop');
            }
        }
    };
};


/***/ }),
/* 41 */
/***/ (function(module, exports) {


/**
 * transition definition
 *
 * @param {Object} settings - Animation settings to use
 */

module.exports = function (name) {

    return {
        beforeEnter: function (el) {
            $(el).show();
        },

        enter: function (el, done) {
            $(el).transition(name, 700, done);

            return function() {
                $(el).transition('stop');
            }
        },

        leave: function (el, done) {
            $(el)
                .transition('reset')
                .transition(name, 700, done)
                .hide();

            return function() {
                $(el).transition('stop');
            }
        }
    };
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Register transitions using Vue.transition
 */

var defineEmphasis = __webpack_require__(41);
var defineAppearance = __webpack_require__(40);

var emphasis = [
    'flash',
    'shake',
    'pulse',
    'tada',
    'bounce'
];

var appearance = [
    'slide up',
    'slide down',
    'vertical flip',
    'horizontal flip',
    'fade',
    'fade up',
    'fade down',
    'scale',
    'drop',
    'browse'
];


/**
 * Register all transitions globally
 * @param Vue
 */

module.exports = function (Vue) {

    emphasis.forEach(function (animation) {
        var definition = defineEmphasis(animation);

        Vue.transition(animation, definition);
    });

    appearance.forEach(function (animation) {
        var definition = defineAppearance(animation);
        var id = animation.split(' ').join('-');

        Vue.transition(id, definition);
    });

};



/***/ }),
/* 43 */
/***/ (function(module, exports) {



module.exports = {
    compiled: function () {
        var vm = this;
        var behaviors = this.$options.behaviors || {};
        var moduleName = this.$options.name.toLowerCase();
        var $element = $(this.$$[moduleName]);

        // Register the behavior(method) as $behavior on the vm, with optional before/after hooks
        $.each(behaviors, function (index, behavior) {
            if($.isPlainObject(behavior)) {
                register(behavior);
            } else if(typeof behavior === 'string') {
                var methodName = camelize(behavior);
                vm['$' + methodName] = $element[moduleName].bind($element, behavior);
            }
        });

        function register(settings) {
            var behavior = settings.name;
            var after = $.isFunction(settings.after) ? settings.after.bind(vm) : $.noop;
            var method = $element[moduleName].bind($element, behavior);
            var before = $.isFunction(settings.before) ? settings.before.bind(vm) : function(done){ done() };

            vm['$' + behavior] = function() {
                var args = arguments;
                var done = function () {
                    method.apply($element, args);
                    after();
                };

                before(done);
            }
        }

    }
};

function camelize(behavior) {
    var result = '';
    behavior.split(' ').forEach(function (word, i) {
        i === 0
            ? result += word
            : result += word.charAt(0).toUpperCase() + word.substring(1);
    });
    return result;
}

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {



exports.install = function (Vue) {

    __webpack_require__(42)(Vue);

    /**
     * Components
     */

    var Accordion = Vue.extend(__webpack_require__(25));
    var Checkbox = Vue.extend(__webpack_require__(27));
    var Dropdown = Vue.extend(__webpack_require__(29));
    var Modal = Vue.extend(__webpack_require__(30));
    var Popup = Vue.extend(__webpack_require__(32));
    var Progress = Vue.extend(__webpack_require__(34));
    var Rating = Vue.extend(__webpack_require__(36));
    var Sidebar = Vue.extend(__webpack_require__(38));


    /**
     * Register components globally
     */

    Vue.component('ui-accordion', Accordion);
    Vue.component('ui-checkbox', Checkbox);
    Vue.component('ui-dropdown', Dropdown);
    Vue.component('ui-modal', Modal);
    Vue.component('ui-popup', Popup);
    Vue.component('ui-progress', Progress);
    Vue.component('ui-rating', Rating);
    Vue.component('ui-sidebar', Sidebar);

};

/***/ }),
/* 45 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 46 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
/******/ ]);