(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	return __webpack_require__(__webpack_require__.s = 53);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var tty = __webpack_require__(52);

/**
 * Expose `debug()` as the module.
 */

module.exports = debug;

/**
 * Enabled debuggers.
 */

var names = []
  , skips = [];

/**
 * Colors.
 */

var colors = [6, 2, 3, 4, 5, 1];

/**
 * Previous debug() call.
 */

var prev = {};

/**
 * Previously assigned color.
 */

var prevColor = 0;

/**
 * Is stdout a TTY? Colored output is disabled when `true`.
 */

var isatty = tty.isatty(1);

/**
 * Select a color.
 *
 * @return {Number}
 * @api private
 */

function color() {
  return colors[prevColor++ % colors.length];
}

/**
 * Humanize the given `ms`.
 *
 * @param {Number} m
 * @return {String}
 * @api private
 */

function humanize(ms) {
  var sec = 1000
    , min = 60 * 1000
    , hour = 60 * min;

  if (ms >= hour) return (ms / hour).toFixed(1) + 'h';
  if (ms >= min) return (ms / min).toFixed(1) + 'm';
  if (ms >= sec) return (ms / sec | 0) + 's';
  return ms + 'ms';
}

/**
 * Create a debugger with the given `name`.
 *
 * @param {String} name
 * @return {Type}
 * @api public
 */

function debug(name) {
  function disabled(){}
  disabled.enabled = false;

  var match = skips.some(function(re){
    return re.test(name);
  });

  if (match) return disabled;

  match = names.some(function(re){
    return re.test(name);
  });

  if (!match) return disabled;
  var c = color();

  function colored(fmt) {
    fmt = coerce(fmt);

    var curr = new Date;
    var ms = curr - (prev[name] || curr);
    prev[name] = curr;

    fmt = '  \u001b[9' + c + 'm' + name + ' '
      + '\u001b[3' + c + 'm\u001b[90m'
      + fmt + '\u001b[3' + c + 'm'
      + ' +' + humanize(ms) + '\u001b[0m';

    console.log.apply(this, arguments);
  }

  function plain(fmt) {
    fmt = coerce(fmt);

    fmt = new Date().toUTCString()
      + ' ' + name + ' ' + fmt;
    console.log.apply(this, arguments);
  }

  colored.enabled = plain.enabled = true;

  return isatty || process.env.DEBUG_COLORS
    ? colored
    : plain;
}

/**
 * Coerce `val`.
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

/**
 * Enable specified `namespaces` for debugging.
 */

debug.enable = function(namespaces) {
  namespaces.split(/[\s,]+/)
  .forEach(function(name){
    name = name.replace('*', '.*?');
    if (name[0] == '-') {
      skips.push(new RegExp('^' + name.substr(1) + '$'));
    } else {
      names.push(new RegExp('^' + name + '$'));
    }
  });
};

/**
 * Enable namespaces listed in `process.env.DEBUG` initially.
 */

debug.enable(process.env.DEBUG || '');


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var mime = __webpack_require__(15).mime;
var crc32 = __webpack_require__(20);

/**
 * Return ETag for `body`.
 *
 * @param {String|Buffer} body
 * @return {String}
 * @api private
 */

exports.etag = function(body){
  return '"' + crc32.signed(body) + '"';
};

/**
 * Check if `path` looks absolute.
 *
 * @param {String} path
 * @return {Boolean}
 * @api private
 */

exports.isAbsolute = function(path){
  if ('/' == path[0]) return true;
  if (':' == path[1] && '\\' == path[2]) return true;
  if ('\\\\' == path.substring(0, 2)) return true; // Microsoft Azure absolute path
};

/**
 * Flatten the given `arr`.
 *
 * @param {Array} arr
 * @return {Array}
 * @api private
 */

exports.flatten = function(arr, ret){
  ret = ret || [];
  var len = arr.length;
  for (var i = 0; i < len; ++i) {
    if (Array.isArray(arr[i])) {
      exports.flatten(arr[i], ret);
    } else {
      ret.push(arr[i]);
    }
  }
  return ret;
};

/**
 * Normalize the given `type`, for example "html" becomes "text/html".
 *
 * @param {String} type
 * @return {Object}
 * @api private
 */

exports.normalizeType = function(type){
  return ~type.indexOf('/')
    ? acceptParams(type)
    : { value: mime.lookup(type), params: {} };
};

/**
 * Normalize `types`, for example "html" becomes "text/html".
 *
 * @param {Array} types
 * @return {Array}
 * @api private
 */

exports.normalizeTypes = function(types){
  var ret = [];

  for (var i = 0; i < types.length; ++i) {
    ret.push(exports.normalizeType(types[i]));
  }

  return ret;
};

/**
 * Parse accept params `str` returning an
 * object with `.value`, `.quality` and `.params`.
 * also includes `.originalIndex` for stable sorting
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function acceptParams(str, index) {
  var parts = str.split(/ *; */);
  var ret = { value: parts[0], quality: 1, params: {}, originalIndex: index };

  for (var i = 1; i < parts.length; ++i) {
    var pms = parts[i].split(/ *= */);
    if ('q' == pms[0]) {
      ret.quality = parseFloat(pms[1]);
    } else {
      ret.params[pms[0]] = pms[1];
    }
  }

  return ret;
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {var path = __webpack_require__(3);
var fs = __webpack_require__(5);

function Mime() {
  // Map of extension -> mime type
  this.types = Object.create(null);

  // Map of mime type -> extension
  this.extensions = Object.create(null);
}

/**
 * Define mimetype -> extension mappings.  Each key is a mime-type that maps
 * to an array of extensions associated with the type.  The first extension is
 * used as the default extension for the type.
 *
 * e.g. mime.define({'audio/ogg', ['oga', 'ogg', 'spx']});
 *
 * @param map (Object) type definitions
 */
Mime.prototype.define = function (map) {
  for (var type in map) {
    var exts = map[type];

    for (var i = 0; i < exts.length; i++) {
      if (process.env.DEBUG_MIME && this.types[exts]) {
        console.warn(this._loading.replace(/.*\//, ''), 'changes "' + exts[i] + '" extension type from ' +
          this.types[exts] + ' to ' + type);
      }

      this.types[exts[i]] = type;
    }

    // Default extension is the first one we encounter
    if (!this.extensions[type]) {
      this.extensions[type] = exts[0];
    }
  }
};

/**
 * Load an Apache2-style ".types" file
 *
 * This may be called multiple times (it's expected).  Where files declare
 * overlapping types/extensions, the last file wins.
 *
 * @param file (String) path of file to load.
 */
Mime.prototype.load = function(file) {

  this._loading = file;
  // Read file and split into lines
  var map = {},
      content = fs.readFileSync(file, 'ascii'),
      lines = content.split(/[\r\n]+/);

  lines.forEach(function(line) {
    // Clean up whitespace/comments, and split into fields
    var fields = line.replace(/\s*#.*|^\s*|\s*$/g, '').split(/\s+/);
    map[fields.shift()] = fields;
  });

  this.define(map);

  this._loading = null;
};

/**
 * Lookup a mime type based on extension
 */
Mime.prototype.lookup = function(path, fallback) {
  var ext = path.replace(/.*[\.\/\\]/, '').toLowerCase();

  return this.types[ext] || fallback || this.default_type;
};

/**
 * Return file extension associated with a mime type
 */
Mime.prototype.extension = function(mimeType) {
  var type = mimeType.match(/^\s*([^;\s]*)(?:;|\s|$)/)[1].toLowerCase();
  return this.extensions[type];
};

// Default instance
var mime = new Mime();

// Load local copy of
// http://svn.apache.org/repos/asf/httpd/httpd/trunk/docs/conf/mime.types
mime.load(path.join(__dirname, 'types/mime.types'));

// Load additional types from node.js community
mime.load(path.join(__dirname, 'types/node.types'));

// Default type
mime.default_type = mime.lookup('bin');

//
// Additional API specific to the default instance
//

mime.Mime = Mime;

/**
 * Lookup a charset based on mime type.
 */
mime.charsets = {
  lookup: function(mimeType, fallback) {
    // Assume text types are utf8
    return (/^text\//).test(mimeType) ? 'UTF-8' : fallback;
  }
};

module.exports = mime;

/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /Users/hakimu/Documents/scribble/webpack_express_example/node_modules/methods/index.js 'return' outside of function (9:2)\nYou may need an appropriate loader to handle this file type.\n|   });\n| \n|   return;\n| }\n| ");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {


var parse = __webpack_require__(17).parse;

/**
 * Parse the `req` url with memoization.
 *
 * @param {ServerRequest} req
 * @return {Object}
 * @api private
 */

module.exports = function parseUrl(req){
  var parsed = req._parsedUrl;
  if (parsed && parsed.href == req.url) {
    return parsed;
  } else {
    parsed = parse(req.url);

    if (parsed.auth && !parsed.protocol && ~parsed.href.indexOf('//')) {
      // This parses pathnames, and a strange pathname like //r@e should work
      parsed = parse(req.url.replace(/@/g, '%40'));
    }

    return req._parsedUrl = parsed;
  }
};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/**
 * Merge object b with object a.
 *
 *     var a = { foo: 'bar' }
 *       , b = { bar: 'baz' };
 *
 *     merge(a, b);
 *     // => { foo: 'bar', bar: 'baz' }
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object}
 * @api public
 */

exports = module.exports = function(a, b){
  if (a && b) {
    for (var key in b) {
      a[key] = b[key];
    }
  }
  return a;
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

/**
 * Escape special characters in the given string of html.
 *
 * @param  {String} html
 * @return {String}
 * @api private
 */

module.exports = function(html) {
  return String(html)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var qs = __webpack_require__(38);
var parseUrl = __webpack_require__(7);

/**
 * Query:
 *
 * Automatically parse the query-string when available,
 * populating the `req.query` object using
 * [qs](https://github.com/visionmedia/node-querystring).
 *
 * Examples:
 *
 *       .use(connect.query())
 *       .use(function(req, res){
 *         res.end(JSON.stringify(req.query));
 *       });
 *
 *  The `options` passed are provided to qs.parse function.
 *
 * @param {Object} options
 * @return {Function}
 * @api public
 */

module.exports = function query(options){
  return function query(req, res, next){
    if (!req.query) {
      req.query = ~req.url.indexOf('?')
        ? qs.parse(parseUrl(req).query, options)
        : {};
    }

    next();
  };
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var Route = __webpack_require__(12);
var Layer = __webpack_require__(30);
var methods = __webpack_require__(6);
var debug = __webpack_require__(0)('express:router');
var parseUrl = __webpack_require__(7);

/**
 * Initialize a new `Router` with the given `options`.
 *
 * @param {Object} options
 * @return {Router} which is an callable function
 * @api public
 */

var proto = module.exports = function(options) {
  options = options || {};

  function router(req, res, next) {
    router.handle(req, res, next);
  }

  // mixin Router class functions
  router.__proto__ = proto;

  router.params = {};
  router._params = [];
  router.caseSensitive = options.caseSensitive;
  router.strict = options.strict;
  router.stack = [];

  return router;
};

/**
 * Map the given param placeholder `name`(s) to the given callback.
 *
 * Parameter mapping is used to provide pre-conditions to routes
 * which use normalized placeholders. For example a _:user_id_ parameter
 * could automatically load a user's information from the database without
 * any additional code,
 *
 * The callback uses the same signature as middleware, the only difference
 * being that the value of the placeholder is passed, in this case the _id_
 * of the user. Once the `next()` function is invoked, just like middleware
 * it will continue on to execute the route, or subsequent parameter functions.
 *
 * Just like in middleware, you must either respond to the request or call next
 * to avoid stalling the request.
 *
 *  app.param('user_id', function(req, res, next, id){
 *    User.find(id, function(err, user){
 *      if (err) {
 *        return next(err);
 *      } else if (!user) {
 *        return next(new Error('failed to load user'));
 *      }
 *      req.user = user;
 *      next();
 *    });
 *  });
 *
 * @param {String} name
 * @param {Function} fn
 * @return {app} for chaining
 * @api public
 */

proto.param = function(name, fn){
  // param logic
  if ('function' == typeof name) {
    this._params.push(name);
    return;
  }

  // apply param functions
  var params = this._params;
  var len = params.length;
  var ret;

  if (name[0] === ':') {
    name = name.substr(1);
  }

  for (var i = 0; i < len; ++i) {
    if (ret = params[i](name, fn)) {
      fn = ret;
    }
  }

  // ensure we end up with a
  // middleware function
  if ('function' != typeof fn) {
    throw new Error('invalid param() call for ' + name + ', got ' + fn);
  }

  (this.params[name] = this.params[name] || []).push(fn);
  return this;
};

/**
 * Dispatch a req, res into the router.
 *
 * @api private
 */

proto.handle = function(req, res, done) {
  var self = this;

  debug('dispatching %s %s', req.method, req.url);

  var method = req.method.toLowerCase();

  var search = 1 + req.url.indexOf('?');
  var pathlength = search ? search - 1 : req.url.length;
  var fqdn = 1 + req.url.substr(0, pathlength).indexOf('://');
  var protohost = fqdn ? req.url.substr(0, req.url.indexOf('/', 2 + fqdn)) : '';
  var idx = 0;
  var removed = '';
  var slashAdded = false;

  // store options for OPTIONS request
  // only used if OPTIONS request
  var options = [];

  // middleware and routes
  var stack = self.stack;

  // for options requests, respond with a default if nothing else responds
  if (method === 'options') {
    var old = done;
    done = function(err) {
      if (err || options.length === 0) return old(err);

      var body = options.join(',');
      return res.set('Allow', body).send(body);
    };
  }

  (function next(err) {
    if (err === 'route') {
      err = undefined;
    }

    var layer = stack[idx++];
    if (!layer) {
      return done(err);
    }

    if (slashAdded) {
      req.url = req.url.substr(1);
      slashAdded = false;
    }

    req.url = protohost + removed + req.url.substr(protohost.length);
    req.originalUrl = req.originalUrl || req.url;
    removed = '';

    try {
      var path = parseUrl(req).pathname;
      if (undefined == path) path = '/';

      if (!layer.match(path)) return next(err);

      // route object and not middleware
      var route = layer.route;

      // if final route, then we support options
      if (route) {
        // we don't run any routes with error first
        if (err) {
          return next(err);
        }

        req.route = route;

        // we can now dispatch to the route
        if (method === 'options' && !route.methods['options']) {
          options.push.apply(options, route._options());
        }
      }

      req.params = layer.params;

      // this should be done for the layer
      return self.process_params(layer, req, res, function(err) {
        if (err) {
          return next(err);
        }

        if (route) {
          return layer.handle(req, res, next);
        }

        trim_prefix();
      });

      function trim_prefix() {
        var c = path[layer.path.length];
        if (c && '/' != c && '.' != c) return next(err);

        // Trim off the part of the url that matches the route
        // middleware (.use stuff) needs to have the path stripped
        debug('trim prefix (%s) from url %s', removed, req.url);
        removed = layer.path;
        req.url = protohost + req.url.substr(protohost.length + removed.length);

        // Ensure leading slash
        if (!fqdn && '/' != req.url[0]) {
          req.url = '/' + req.url;
          slashAdded = true;
        }

        debug('%s %s : %s', layer.handle.name || 'anonymous', layer.path, req.originalUrl);
        var arity = layer.handle.length;
        if (err) {
          if (arity === 4) {
            layer.handle(err, req, res, next);
          } else {
            next(err);
          }
        } else if (arity < 4) {
          layer.handle(req, res, next);
        } else {
          next(err);
        }
      }
    } catch (err) {
      next(err);
    }
  })();
};

/**
 * Process any parameters for the route.
 *
 * @api private
 */

proto.process_params = function(route, req, res, done) {
  var params = this.params;

  // captured parameters from the route, keys and values
  var keys = route.keys;

  // fast track
  if (!keys || keys.length === 0) {
    return done();
  }

  var i = 0;
  var paramIndex = 0;
  var key;
  var paramVal;
  var paramCallbacks;

  // process params in order
  // param callbacks can be async
  function param(err) {
    if (err) {
      return done(err);
    }

    if (i >= keys.length ) {
      return done();
    }

    paramIndex = 0;
    key = keys[i++];
    paramVal = key && req.params[key.name];
    paramCallbacks = key && params[key.name];

    try {
      if (paramCallbacks && undefined !== paramVal) {
        return paramCallback();
      } else if (key) {
        return param();
      }
    } catch (err) {
      return done(err);
    }

    done();
  }

  // single param callbacks
  function paramCallback(err) {
    var fn = paramCallbacks[paramIndex++];
    if (err || !fn) return param(err);
    fn(req, res, paramCallback, paramVal, key.name);
  }

  param();
};

/**
 * Use the given middleware function, with optional path, defaulting to "/".
 *
 * Use (like `.all`) will run for any http METHOD, but it will not add
 * handlers for those methods so OPTIONS requests will not consider `.use`
 * functions even if they could respond.
 *
 * The other difference is that _route_ path is stripped and not visible
 * to the handler function. The main effect of this feature is that mounted
 * handlers can operate without any code changes regardless of the "prefix"
 * pathname.
 *
 * @param {String|Function} route
 * @param {Function} fn
 * @return {app} for chaining
 * @api public
 */

proto.use = function(route, fn){
  // default route to '/'
  if ('string' != typeof route) {
    fn = route;
    route = '/';
  }

  if (typeof fn !== 'function') {
    var type = {}.toString.call(fn);
    var msg = 'Router.use() requires callback functions but got a ' + type;
    throw new Error(msg);
  }

  // strip trailing slash
  if ('/' == route[route.length - 1]) {
    route = route.slice(0, -1);
  }

  var layer = new Layer(route, {
    sensitive: this.caseSensitive,
    strict: this.strict,
    end: false
  }, fn);

  // add the middleware
  debug('use %s %s', route || '/', fn.name || 'anonymous');

  this.stack.push(layer);
  return this;
};

/**
 * Create a new Route for the given path.
 *
 * Each route contains a separate middleware stack and VERB handlers.
 *
 * See the Route api documentation for details on adding handlers
 * and middleware to routes.
 *
 * @param {String} path
 * @return {Route}
 * @api public
 */

proto.route = function(path){
  var route = new Route(path);

  var layer = new Layer(path, {
    sensitive: this.caseSensitive,
    strict: this.strict,
    end: true
  }, route.dispatch.bind(route));

  layer.route = route;

  this.stack.push(layer);
  return route;
};

// create Router#VERB functions
methods.concat('all').forEach(function(method){
  proto[method] = function(path){
    var route = this.route(path)
    route[method].apply(route, [].slice.call(arguments, 1));
    return this;
  };
});


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var debug = __webpack_require__(0)('express:router:route');
var methods = __webpack_require__(6);
var utils = __webpack_require__(2);

/**
 * Expose `Route`.
 */

module.exports = Route;

/**
 * Initialize `Route` with the given `path`,
 *
 * @param {String} path
 * @api private
 */

function Route(path) {
  debug('new %s', path);
  this.path = path;
  this.stack = undefined;

  // route handlers for various http methods
  this.methods = {};
}

/**
 * @return {Array} supported HTTP methods
 * @api private
 */

Route.prototype._options = function(){
  return Object.keys(this.methods).map(function(method) {
    return method.toUpperCase();
  });
};

/**
 * dispatch req, res into this route
 *
 * @api private
 */

Route.prototype.dispatch = function(req, res, done){
  var self = this;
  var method = req.method.toLowerCase();

  if (method === 'head' && !this.methods['head']) {
    method = 'get';
  }

  req.route = self;

  // single middleware route case
  if (typeof this.stack === 'function') {
    this.stack(req, res, done);
    return;
  }

  var stack = self.stack;
  if (!stack) {
    return done();
  }

  var idx = 0;
  (function next_layer(err) {
    if (err && err === 'route') {
      return done();
    }

    var layer = stack[idx++];
    if (!layer) {
      return done(err);
    }

    if (layer.method && layer.method !== method) {
      return next_layer(err);
    }

    var arity = layer.handle.length;
    if (err) {
      if (arity < 4) {
        return next_layer(err);
      }

      try {
        layer.handle(err, req, res, next_layer);
      } catch (err) {
        next_layer(err);
      }
      return;
    }

    if (arity > 3) {
      return next_layer();
    }

    try {
      layer.handle(req, res, next_layer);
    } catch (err) {
      next_layer(err);
    }
  })();
};

/**
 * Add a handler for all HTTP verbs to this route.
 *
 * Behaves just like middleware and can respond or call `next`
 * to continue processing.
 *
 * You can use multiple `.all` call to add multiple handlers.
 *
 *   function check_something(req, res, next){
 *     next();
 *   };
 *
 *   function validate_user(req, res, next){
 *     next();
 *   };
 *
 *   route
 *   .all(validate_user)
 *   .all(check_something)
 *   .get(function(req, res, next){
 *     res.send('hello world');
 *   });
 *
 * @param {function} handler
 * @return {Route} for chaining
 * @api public
 */

Route.prototype.all = function(){
  var self = this;
  var callbacks = utils.flatten([].slice.call(arguments));
  callbacks.forEach(function(fn) {
    if (typeof fn !== 'function') {
      var type = {}.toString.call(fn);
      var msg = 'Route.all() requires callback functions but got a ' + type;
      throw new Error(msg);
    }

    if (!self.stack) {
      self.stack = fn;
    }
    else if (typeof self.stack === 'function') {
      self.stack = [{ handle: self.stack }, { handle: fn }];
    }
    else {
      self.stack.push({ handle: fn });
    }
  });

  return self;
};

methods.forEach(function(method){
  Route.prototype[method] = function(){
    var self = this;
    var callbacks = utils.flatten([].slice.call(arguments));

    callbacks.forEach(function(fn) {
      if (typeof fn !== 'function') {
        var type = {}.toString.call(fn);
        var msg = 'Route.' + method + '() requires callback functions but got a ' + type;
        throw new Error(msg);
      }

      debug('%s %s', method, self.path);

      if (!self.methods[method]) {
        self.methods[method] = true;
      }

      if (!self.stack) {
        self.stack = [];
      }
      else if (typeof self.stack === 'function') {
        self.stack = [{ handle: self.stack }];
      }

      self.stack.push({ method: method, handle: fn });
    });
    return self;
  };
});


/***/ }),
/* 13 */
/***/ (function(module, exports) {


/**
 * Expose `fresh()`.
 */

module.exports = fresh;

/**
 * Check freshness of `req` and `res` headers.
 *
 * When the cache is "fresh" __true__ is returned,
 * otherwise __false__ is returned to indicate that
 * the cache is now stale.
 *
 * @param {Object} req
 * @param {Object} res
 * @return {Boolean}
 * @api public
 */

function fresh(req, res) {
  // defaults
  var etagMatches = true;
  var notModified = true;

  // fields
  var modifiedSince = req['if-modified-since'];
  var noneMatch = req['if-none-match'];
  var lastModified = res['last-modified'];
  var etag = res['etag'];
  var cc = req['cache-control'];

  // unconditional request
  if (!modifiedSince && !noneMatch) return false;

  // check for no-cache cache request directive
  if (cc && cc.indexOf('no-cache') !== -1) return false;  

  // parse if-none-match
  if (noneMatch) noneMatch = noneMatch.split(/ *, */);

  // if-none-match
  if (noneMatch) etagMatches = ~noneMatch.indexOf(etag) || '*' == noneMatch[0];

  // if-modified-since
  if (modifiedSince) {
    modifiedSince = new Date(modifiedSince);
    lastModified = new Date(lastModified);
    notModified = lastModified <= modifiedSince;
  }

  return !! (etagMatches && notModified);
}

/***/ }),
/* 14 */
/***/ (function(module, exports) {


/**
 * Parse "Range" header `str` relative to the given file `size`.
 *
 * @param {Number} size
 * @param {String} str
 * @return {Array}
 * @api public
 */

module.exports = function(size, str){
  var valid = true;
  var i = str.indexOf('=');

  if (-1 == i) return -2;

  var arr = str.slice(i + 1).split(',').map(function(range){
    var range = range.split('-')
      , start = parseInt(range[0], 10)
      , end = parseInt(range[1], 10);

    // -nnn
    if (isNaN(start)) {
      start = size - end;
      end = size - 1;
    // nnn-
    } else if (isNaN(end)) {
      end = size - 1;
    }

    // limit last-byte-pos to current length
    if (end > size - 1) end = size - 1;

    // invalid
    if (isNaN(start)
      || isNaN(end)
      || start > end
      || start < 0) valid = false;

    return {
      start: start,
      end: end
    };
  });

  arr.type = str.slice(0, i);

  return valid ? arr : -1;
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {


module.exports = __webpack_require__(39);

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var newrelic = __webpack_require__(51);
var http = __webpack_require__(1);
var express = __webpack_require__(23);
var app = express();

app.get('/',function(req,res){
  res.send("Home page");
});

http.createServer(app).listen(3300,function(){
  console.log('Starting....')
});

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var Negotiator = __webpack_require__(36)
var mime = __webpack_require__(4)

var slice = [].slice

module.exports = Accepts

function Accepts(req) {
  if (!(this instanceof Accepts))
    return new Accepts(req)

  this.headers = req.headers
  this.negotiator = Negotiator(req)
}

/**
 * Check if the given `type(s)` is acceptable, returning
 * the best match when true, otherwise `undefined`, in which
 * case you should respond with 406 "Not Acceptable".
 *
 * The `type` value may be a single mime type string
 * such as "application/json", the extension name
 * such as "json" or an array `["json", "html", "text/plain"]`. When a list
 * or array is given the _best_ match, if any is returned.
 *
 * Examples:
 *
 *     // Accept: text/html
 *     this.accepts('html');
 *     // => "html"
 *
 *     // Accept: text/*, application/json
 *     this.accepts('html');
 *     // => "html"
 *     this.accepts('text/html');
 *     // => "text/html"
 *     this.accepts('json', 'text');
 *     // => "json"
 *     this.accepts('application/json');
 *     // => "application/json"
 *
 *     // Accept: text/*, application/json
 *     this.accepts('image/png');
 *     this.accepts('png');
 *     // => undefined
 *
 *     // Accept: text/*;q=.5, application/json
 *     this.accepts(['html', 'json']);
 *     this.accepts('html', 'json');
 *     // => "json"
 *
 * @param {String|Array} type(s)...
 * @return {String|Array|Boolean}
 * @api public
 */

Accepts.prototype.type =
Accepts.prototype.types = function (types) {
  if (!Array.isArray(types)) types = slice.call(arguments);
  var n = this.negotiator;
  if (!types.length) return n.preferredMediaTypes();
  if (!this.headers.accept) return types[0];
  var mimes = types.map(extToMime);
  var accepts = n.preferredMediaTypes(mimes);
  var first = accepts[0];
  if (!first) return false;
  return types[mimes.indexOf(first)];
}

/**
 * Return accepted encodings or best fit based on `encodings`.
 *
 * Given `Accept-Encoding: gzip, deflate`
 * an array sorted by quality is returned:
 *
 *     ['gzip', 'deflate']
 *
 * @param {String|Array} encoding(s)...
 * @return {String|Array}
 * @api public
 */

Accepts.prototype.encoding =
Accepts.prototype.encodings = function (encodings) {
  if (!Array.isArray(encodings)) encodings = slice.call(arguments);
  var n = this.negotiator;
  if (!encodings.length) return n.preferredEncodings();
  return n.preferredEncodings(encodings)[0] || 'identity';
}

/**
 * Return accepted charsets or best fit based on `charsets`.
 *
 * Given `Accept-Charset: utf-8, iso-8859-1;q=0.2, utf-7;q=0.5`
 * an array sorted by quality is returned:
 *
 *     ['utf-8', 'utf-7', 'iso-8859-1']
 *
 * @param {String|Array} charset(s)...
 * @return {String|Array}
 * @api public
 */

Accepts.prototype.charset =
Accepts.prototype.charsets = function (charsets) {
  if (!Array.isArray(charsets)) charsets = [].slice.call(arguments);
  var n = this.negotiator;
  if (!charsets.length) return n.preferredCharsets();
  if (!this.headers['accept-charset']) return charsets[0];
  return n.preferredCharsets(charsets)[0] || false;
}

/**
 * Return accepted languages or best fit based on `langs`.
 *
 * Given `Accept-Language: en;q=0.8, es, pt`
 * an array sorted by quality is returned:
 *
 *     ['es', 'pt', 'en']
 *
 * @param {String|Array} lang(s)...
 * @return {Array|String}
 * @api public
 */

Accepts.prototype.lang =
Accepts.prototype.langs =
Accepts.prototype.language =
Accepts.prototype.languages = function (langs) {
  if (!Array.isArray(langs)) langs = slice.call(arguments);
  var n = this.negotiator;
  if (!langs.length) return n.preferredLanguages();
  if (!this.headers['accept-language']) return langs[0];
  return n.preferredLanguages(langs)[0] || false;
}

/**
 * Convert extnames to mime.
 *
 * @param {String} type
 * @return {String}
 * @api private
 */

function extToMime(type) {
  if (~type.indexOf('/')) return type;
  return mime.lookup(type);
}


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var Buffer = __webpack_require__(48).Buffer;

var CRC_TABLE = [
  0x00000000, 0x77073096, 0xee0e612c, 0x990951ba, 0x076dc419,
  0x706af48f, 0xe963a535, 0x9e6495a3, 0x0edb8832, 0x79dcb8a4,
  0xe0d5e91e, 0x97d2d988, 0x09b64c2b, 0x7eb17cbd, 0xe7b82d07,
  0x90bf1d91, 0x1db71064, 0x6ab020f2, 0xf3b97148, 0x84be41de,
  0x1adad47d, 0x6ddde4eb, 0xf4d4b551, 0x83d385c7, 0x136c9856,
  0x646ba8c0, 0xfd62f97a, 0x8a65c9ec, 0x14015c4f, 0x63066cd9,
  0xfa0f3d63, 0x8d080df5, 0x3b6e20c8, 0x4c69105e, 0xd56041e4,
  0xa2677172, 0x3c03e4d1, 0x4b04d447, 0xd20d85fd, 0xa50ab56b,
  0x35b5a8fa, 0x42b2986c, 0xdbbbc9d6, 0xacbcf940, 0x32d86ce3,
  0x45df5c75, 0xdcd60dcf, 0xabd13d59, 0x26d930ac, 0x51de003a,
  0xc8d75180, 0xbfd06116, 0x21b4f4b5, 0x56b3c423, 0xcfba9599,
  0xb8bda50f, 0x2802b89e, 0x5f058808, 0xc60cd9b2, 0xb10be924,
  0x2f6f7c87, 0x58684c11, 0xc1611dab, 0xb6662d3d, 0x76dc4190,
  0x01db7106, 0x98d220bc, 0xefd5102a, 0x71b18589, 0x06b6b51f,
  0x9fbfe4a5, 0xe8b8d433, 0x7807c9a2, 0x0f00f934, 0x9609a88e,
  0xe10e9818, 0x7f6a0dbb, 0x086d3d2d, 0x91646c97, 0xe6635c01,
  0x6b6b51f4, 0x1c6c6162, 0x856530d8, 0xf262004e, 0x6c0695ed,
  0x1b01a57b, 0x8208f4c1, 0xf50fc457, 0x65b0d9c6, 0x12b7e950,
  0x8bbeb8ea, 0xfcb9887c, 0x62dd1ddf, 0x15da2d49, 0x8cd37cf3,
  0xfbd44c65, 0x4db26158, 0x3ab551ce, 0xa3bc0074, 0xd4bb30e2,
  0x4adfa541, 0x3dd895d7, 0xa4d1c46d, 0xd3d6f4fb, 0x4369e96a,
  0x346ed9fc, 0xad678846, 0xda60b8d0, 0x44042d73, 0x33031de5,
  0xaa0a4c5f, 0xdd0d7cc9, 0x5005713c, 0x270241aa, 0xbe0b1010,
  0xc90c2086, 0x5768b525, 0x206f85b3, 0xb966d409, 0xce61e49f,
  0x5edef90e, 0x29d9c998, 0xb0d09822, 0xc7d7a8b4, 0x59b33d17,
  0x2eb40d81, 0xb7bd5c3b, 0xc0ba6cad, 0xedb88320, 0x9abfb3b6,
  0x03b6e20c, 0x74b1d29a, 0xead54739, 0x9dd277af, 0x04db2615,
  0x73dc1683, 0xe3630b12, 0x94643b84, 0x0d6d6a3e, 0x7a6a5aa8,
  0xe40ecf0b, 0x9309ff9d, 0x0a00ae27, 0x7d079eb1, 0xf00f9344,
  0x8708a3d2, 0x1e01f268, 0x6906c2fe, 0xf762575d, 0x806567cb,
  0x196c3671, 0x6e6b06e7, 0xfed41b76, 0x89d32be0, 0x10da7a5a,
  0x67dd4acc, 0xf9b9df6f, 0x8ebeeff9, 0x17b7be43, 0x60b08ed5,
  0xd6d6a3e8, 0xa1d1937e, 0x38d8c2c4, 0x4fdff252, 0xd1bb67f1,
  0xa6bc5767, 0x3fb506dd, 0x48b2364b, 0xd80d2bda, 0xaf0a1b4c,
  0x36034af6, 0x41047a60, 0xdf60efc3, 0xa867df55, 0x316e8eef,
  0x4669be79, 0xcb61b38c, 0xbc66831a, 0x256fd2a0, 0x5268e236,
  0xcc0c7795, 0xbb0b4703, 0x220216b9, 0x5505262f, 0xc5ba3bbe,
  0xb2bd0b28, 0x2bb45a92, 0x5cb36a04, 0xc2d7ffa7, 0xb5d0cf31,
  0x2cd99e8b, 0x5bdeae1d, 0x9b64c2b0, 0xec63f226, 0x756aa39c,
  0x026d930a, 0x9c0906a9, 0xeb0e363f, 0x72076785, 0x05005713,
  0x95bf4a82, 0xe2b87a14, 0x7bb12bae, 0x0cb61b38, 0x92d28e9b,
  0xe5d5be0d, 0x7cdcefb7, 0x0bdbdf21, 0x86d3d2d4, 0xf1d4e242,
  0x68ddb3f8, 0x1fda836e, 0x81be16cd, 0xf6b9265b, 0x6fb077e1,
  0x18b74777, 0x88085ae6, 0xff0f6a70, 0x66063bca, 0x11010b5c,
  0x8f659eff, 0xf862ae69, 0x616bffd3, 0x166ccf45, 0xa00ae278,
  0xd70dd2ee, 0x4e048354, 0x3903b3c2, 0xa7672661, 0xd06016f7,
  0x4969474d, 0x3e6e77db, 0xaed16a4a, 0xd9d65adc, 0x40df0b66,
  0x37d83bf0, 0xa9bcae53, 0xdebb9ec5, 0x47b2cf7f, 0x30b5ffe9,
  0xbdbdf21c, 0xcabac28a, 0x53b39330, 0x24b4a3a6, 0xbad03605,
  0xcdd70693, 0x54de5729, 0x23d967bf, 0xb3667a2e, 0xc4614ab8,
  0x5d681b02, 0x2a6f2b94, 0xb40bbe37, 0xc30c8ea1, 0x5a05df1b,
  0x2d02ef8d
];

function bufferizeInt(num) {
  var tmp = Buffer(4);
  tmp.writeInt32BE(num, 0);
  return tmp;
}

function _crc32(buf, previous) {
  if (!Buffer.isBuffer(buf)) {
    buf = Buffer(buf);
  }
  if (Buffer.isBuffer(previous)) {
    previous = previous.readUInt32BE(0);
  }
  var crc = ~~previous ^ -1;
  for (var n = 0; n < buf.length; n++) {
    crc = CRC_TABLE[(crc ^ buf[n]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ -1);
}

function crc32() {
  return bufferizeInt(_crc32.apply(null, arguments));
}
crc32.signed = function () {
  return _crc32.apply(null, arguments);
};
crc32.unsigned = function () {
  return _crc32.apply(null, arguments) >>> 0;
};

module.exports = crc32;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var crypto = __webpack_require__(49);

/**
 * Sign the given `val` with `secret`.
 *
 * @param {String} val
 * @param {String} secret
 * @return {String}
 * @api private
 */

exports.sign = function(val, secret){
  if ('string' != typeof val) throw new TypeError('cookie required');
  if ('string' != typeof secret) throw new TypeError('secret required');
  return val + '.' + crypto
    .createHmac('sha256', secret)
    .update(val)
    .digest('base64')
    .replace(/\=+$/, '');
};

/**
 * Unsign and decode the given `val` with `secret`,
 * returning `false` if the signature is invalid.
 *
 * @param {String} val
 * @param {String} secret
 * @return {String|Boolean}
 * @api private
 */

exports.unsign = function(val, secret){
  if ('string' != typeof val) throw new TypeError('cookie required');
  if ('string' != typeof secret) throw new TypeError('secret required');
  var str = val.slice(0, val.lastIndexOf('.'))
    , mac = exports.sign(str, secret);
  
  return exports.sign(mac, secret) == exports.sign(val, secret) ? str : false;
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {


/// Serialize the a name value pair into a cookie string suitable for
/// http headers. An optional options object specified cookie parameters
///
/// serialize('foo', 'bar', { httpOnly: true })
///   => "foo=bar; httpOnly"
///
/// @param {String} name
/// @param {String} val
/// @param {Object} options
/// @return {String}
var serialize = function(name, val, opt){
    opt = opt || {};
    var enc = opt.encode || encode;
    var pairs = [name + '=' + enc(val)];

    if (opt.maxAge) pairs.push('Max-Age=' + opt.maxAge);
    if (opt.domain) pairs.push('Domain=' + opt.domain);
    if (opt.path) pairs.push('Path=' + opt.path);
    if (opt.expires) pairs.push('Expires=' + opt.expires.toUTCString());
    if (opt.httpOnly) pairs.push('HttpOnly');
    if (opt.secure) pairs.push('Secure');

    return pairs.join('; ');
};

/// Parse the given cookie header string into an object
/// The object has the various cookies as keys(names) => values
/// @param {String} str
/// @return {Object}
var parse = function(str, opt) {
    opt = opt || {};
    var obj = {}
    var pairs = str.split(/[;,] */);
    var dec = opt.decode || decode;

    pairs.forEach(function(pair) {
        var eq_idx = pair.indexOf('=')

        // skip things that don't look like key=value
        if (eq_idx < 0) {
            return;
        }

        var key = pair.substr(0, eq_idx).trim()
        var val = pair.substr(++eq_idx, pair.length).trim();

        // quoted values
        if ('"' == val[0]) {
            val = val.slice(1, -1);
        }

        // only assign once
        if (undefined == obj[key]) {
            try {
                obj[key] = dec(val);
            } catch (e) {
                obj[key] = val;
            }
        }
    });

    return obj;
};

var encode = encodeURIComponent;
var decode = decodeURIComponent;

module.exports.serialize = serialize;
module.exports.parse = parse;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {


module.exports = process.env.EXPRESS_COV
  ? __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./lib-cov/express\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
  : __webpack_require__(26);

/***/ }),
/* 24 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 24;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var mixin = __webpack_require__(8);
var escapeHtml = __webpack_require__(9);
var Router = __webpack_require__(11);
var methods = __webpack_require__(6);
var middleware = __webpack_require__(27);
var query = __webpack_require__(10);
var debug = __webpack_require__(0)('express:application');
var View = __webpack_require__(31);
var http = __webpack_require__(1);

/**
 * Application prototype.
 */

var app = exports = module.exports = {};

/**
 * Initialize the server.
 *
 *   - setup default configuration
 *   - setup default middleware
 *   - setup route reflection methods
 *
 * @api private
 */

app.init = function(){
  this.cache = {};
  this.settings = {};
  this.engines = {};
  this.defaultConfiguration();
};

/**
 * Initialize application configuration.
 *
 * @api private
 */

app.defaultConfiguration = function(){
  // default settings
  this.enable('x-powered-by');
  this.enable('etag');
  var env = process.env.NODE_ENV || 'development';
  this.set('env', env);
  this.set('subdomain offset', 2);

  debug('booting in %s mode', env);

  // inherit protos
  this.on('mount', function(parent){
    this.request.__proto__ = parent.request;
    this.response.__proto__ = parent.response;
    this.engines.__proto__ = parent.engines;
    this.settings.__proto__ = parent.settings;
  });

  // setup locals
  this.locals = Object.create(null);

  // top-most app is mounted at /
  this.mountpath = '/';

  // default locals
  this.locals.settings = this.settings;

  // default configuration
  this.set('view', View);
  this.set('views', process.cwd() + '/views');
  this.set('jsonp callback name', 'callback');

  if (env === 'production') {
    this.enable('view cache');
  }

  Object.defineProperty(this, 'router', {
    get: function() {
      throw new Error('\'app.router\' is deprecated!\nPlease see the 3.x to 4.x migration guide for details on how to update your app.');
    }
  });
};

/**
 * lazily adds the base router if it has not yet been added.
 *
 * We cannot add the base router in the defaultConfiguration because
 * it reads app settings which might be set after that has run.
 *
 * @api private
 */
app.lazyrouter = function() {
  if (!this._router) {
    this._router = new Router({
      caseSensitive: this.enabled('case sensitive routing'),
      strict: this.enabled('strict routing')
    });

    this._router.use(query());
    this._router.use(middleware.init(this));
  }
};

/**
 * Dispatch a req, res pair into the application. Starts pipeline processing.
 *
 * If no _done_ callback is provided, then default error handlers will respond
 * in the event of an error bubbling through the stack.
 *
 * @api private
 */

app.handle = function(req, res, done) {
  var env = this.get('env');

  this._router.handle(req, res, function(err) {
    if (done) {
      return done(err);
    }

    // unhandled error
    if (err) {
      // default to 500
      if (res.statusCode < 400) res.statusCode = 500;
      debug('default %s', res.statusCode);

      // respect err.status
      if (err.status) res.statusCode = err.status;

      // production gets a basic error message
      var msg = 'production' == env
        ? http.STATUS_CODES[res.statusCode]
        : err.stack || err.toString();
      msg = escapeHtml(msg);

      // log to stderr in a non-test env
      if ('test' != env) console.error(err.stack || err.toString());
      if (res.headersSent) return req.socket.destroy();
      res.setHeader('Content-Type', 'text/html');
      res.setHeader('Content-Length', Buffer.byteLength(msg));
      if ('HEAD' == req.method) return res.end();
      res.end(msg);
      return;
    }

    // 404
    debug('default 404');
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    if ('HEAD' == req.method) return res.end();
    res.end('Cannot ' + escapeHtml(req.method) + ' ' + escapeHtml(req.originalUrl) + '\n');
  });
};

/**
 * Proxy `Router#use()` to add middleware to the app router.
 * See Router#use() documentation for details.
 *
 * If the _fn_ parameter is an express app, then it will be
 * mounted at the _route_ specified.
 *
 * @param {String|Function|Server} route
 * @param {Function|Server} fn
 * @return {app} for chaining
 * @api public
 */

app.use = function(route, fn){
  var mount_app;

  // default route to '/'
  if ('string' != typeof route) fn = route, route = '/';

  // express app
  if (fn.handle && fn.set) mount_app = fn;

  // restore .app property on req and res
  if (mount_app) {
    debug('.use app under %s', route);
    mount_app.mountpath = route;
    fn = function(req, res, next) {
      var orig = req.app;
      mount_app.handle(req, res, function(err) {
        req.__proto__ = orig.request;
        res.__proto__ = orig.response;
        next(err);
      });
    };
  }

  this.lazyrouter();
  this._router.use(route, fn);

  // mounted an app
  if (mount_app) {
    mount_app.parent = this;
    mount_app.emit('mount', this);
  }

  return this;
};

/**
 * Proxy to the app `Router#route()`
 * Returns a new `Route` instance for the _path_.
 *
 * Routes are isolated middleware stacks for specific paths.
 * See the Route api docs for details.
 *
 * @api public
 */

app.route = function(path){
  this.lazyrouter();
  return this._router.route(path);
};

/**
 * Register the given template engine callback `fn`
 * as `ext`.
 *
 * By default will `require()` the engine based on the
 * file extension. For example if you try to render
 * a "foo.jade" file Express will invoke the following internally:
 *
 *     app.engine('jade', require('jade').__express);
 *
 * For engines that do not provide `.__express` out of the box,
 * or if you wish to "map" a different extension to the template engine
 * you may use this method. For example mapping the EJS template engine to
 * ".html" files:
 *
 *     app.engine('html', require('ejs').renderFile);
 *
 * In this case EJS provides a `.renderFile()` method with
 * the same signature that Express expects: `(path, options, callback)`,
 * though note that it aliases this method as `ejs.__express` internally
 * so if you're using ".ejs" extensions you dont need to do anything.
 *
 * Some template engines do not follow this convention, the
 * [Consolidate.js](https://github.com/visionmedia/consolidate.js)
 * library was created to map all of node's popular template
 * engines to follow this convention, thus allowing them to
 * work seamlessly within Express.
 *
 * @param {String} ext
 * @param {Function} fn
 * @return {app} for chaining
 * @api public
 */

app.engine = function(ext, fn){
  if ('function' != typeof fn) throw new Error('callback function required');
  if ('.' != ext[0]) ext = '.' + ext;
  this.engines[ext] = fn;
  return this;
};

/**
 * Proxy to `Router#param()` with one added api feature. The _name_ parameter
 * can be an array of names.
 *
 * See the Router#param() docs for more details.
 *
 * @param {String|Array} name
 * @param {Function} fn
 * @return {app} for chaining
 * @api public
 */

app.param = function(name, fn){
  var self = this;
  self.lazyrouter();

  if (Array.isArray(name)) {
    name.forEach(function(key) {
      self.param(key, fn);
    });
    return this;
  }

  self._router.param(name, fn);
  return this;
};

/**
 * Assign `setting` to `val`, or return `setting`'s value.
 *
 *    app.set('foo', 'bar');
 *    app.get('foo');
 *    // => "bar"
 *
 * Mounted servers inherit their parent server's settings.
 *
 * @param {String} setting
 * @param {*} [val]
 * @return {Server} for chaining
 * @api public
 */

app.set = function(setting, val){
  if (1 == arguments.length) {
    return this.settings[setting];
  } else {
    this.settings[setting] = val;
    return this;
  }
};

/**
 * Return the app's absolute pathname
 * based on the parent(s) that have
 * mounted it.
 *
 * For example if the application was
 * mounted as "/admin", which itself
 * was mounted as "/blog" then the
 * return value would be "/blog/admin".
 *
 * @return {String}
 * @api private
 */

app.path = function(){
  return this.parent
    ? this.parent.path() + this.mountpath
    : '';
};

/**
 * Check if `setting` is enabled (truthy).
 *
 *    app.enabled('foo')
 *    // => false
 *
 *    app.enable('foo')
 *    app.enabled('foo')
 *    // => true
 *
 * @param {String} setting
 * @return {Boolean}
 * @api public
 */

app.enabled = function(setting){
  return !!this.set(setting);
};

/**
 * Check if `setting` is disabled.
 *
 *    app.disabled('foo')
 *    // => true
 *
 *    app.enable('foo')
 *    app.disabled('foo')
 *    // => false
 *
 * @param {String} setting
 * @return {Boolean}
 * @api public
 */

app.disabled = function(setting){
  return !this.set(setting);
};

/**
 * Enable `setting`.
 *
 * @param {String} setting
 * @return {app} for chaining
 * @api public
 */

app.enable = function(setting){
  return this.set(setting, true);
};

/**
 * Disable `setting`.
 *
 * @param {String} setting
 * @return {app} for chaining
 * @api public
 */

app.disable = function(setting){
  return this.set(setting, false);
};

/**
 * Delegate `.VERB(...)` calls to `router.VERB(...)`.
 */

methods.forEach(function(method){
  app[method] = function(path){
    if ('get' == method && 1 == arguments.length) return this.set(path);

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, [].slice.call(arguments, 1));
    return this;
  };
});

/**
 * Special-cased "all" method, applying the given route `path`,
 * middleware, and callback to _every_ HTTP method.
 *
 * @param {String} path
 * @param {Function} ...
 * @return {app} for chaining
 * @api public
 */

app.all = function(path){
  this.lazyrouter();

  var route = this._router.route(path);
  var args = [].slice.call(arguments, 1);
  methods.forEach(function(method){
    route[method].apply(route, args);
  });

  return this;
};

// del -> delete alias

app.del = app.delete;

/**
 * Render the given view `name` name with `options`
 * and a callback accepting an error and the
 * rendered template string.
 *
 * Example:
 *
 *    app.render('email', { name: 'Tobi' }, function(err, html){
 *      // ...
 *    })
 *
 * @param {String} name
 * @param {String|Function} options or fn
 * @param {Function} fn
 * @api public
 */

app.render = function(name, options, fn){
  var opts = {};
  var cache = this.cache;
  var engines = this.engines;
  var view;

  // support callback function as second arg
  if ('function' == typeof options) {
    fn = options, options = {};
  }

  // merge app.locals
  mixin(opts, this.locals);

  // merge options._locals
  if (options._locals) mixin(opts, options._locals);

  // merge options
  mixin(opts, options);

  // set .cache unless explicitly provided
  opts.cache = null == opts.cache
    ? this.enabled('view cache')
    : opts.cache;

  // primed cache
  if (opts.cache) view = cache[name];

  // view
  if (!view) {
    view = new (this.get('view'))(name, {
      defaultEngine: this.get('view engine'),
      root: this.get('views'),
      engines: engines
    });

    if (!view.path) {
      var err = new Error('Failed to lookup view "' + name + '" in views directory "' + view.root + '"');
      err.view = view;
      return fn(err);
    }

    // prime the cache
    if (opts.cache) cache[name] = view;
  }

  // render
  try {
    view.render(opts, fn);
  } catch (err) {
    fn(err);
  }
};

/**
 * Listen for connections.
 *
 * A node `http.Server` is returned, with this
 * application (which is a `Function`) as its
 * callback. If you wish to create both an HTTP
 * and HTTPS server you may do so with the "http"
 * and "https" modules as shown here:
 *
 *    var http = require('http')
 *      , https = require('https')
 *      , express = require('express')
 *      , app = express();
 *
 *    http.createServer(app).listen(80);
 *    https.createServer({ ... }, app).listen(443);
 *
 * @return {http.Server}
 * @api public
 */

app.listen = function(){
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var EventEmitter = __webpack_require__(50).EventEmitter;
var mixin = __webpack_require__(8);
var proto = __webpack_require__(25);
var Route = __webpack_require__(12);
var Router = __webpack_require__(11);
var req = __webpack_require__(28);
var res = __webpack_require__(29);

/**
 * Expose `createApplication()`.
 */

exports = module.exports = createApplication;

/**
 * Create an express application.
 *
 * @return {Function}
 * @api public
 */

function createApplication() {
  var app = function(req, res, next) {
    app.handle(req, res, next);
  };

  mixin(app, proto);
  mixin(app, EventEmitter.prototype);

  app.request = { __proto__: req, app: app };
  app.response = { __proto__: res, app: app };
  app.init();
  return app;
}

/**
 * Expose the prototypes.
 */

exports.application = proto;
exports.request = req;
exports.response = res;

/**
 * Expose constructors.
 */

exports.Route = Route;
exports.Router = Router;

/**
 * Expose middleware
 */

exports.query = __webpack_require__(10);
exports.static = __webpack_require__(41);

/**
 * Replace removed middleware with an appropriate error message.
 */

[
  'json',
  'urlencoded',
  'bodyParser',
  'compress',
  'cookieSession',
  'session',
  'logger',
  'cookieParser',
  'favicon',
  'responseTime',
  'errorHandler',
  'timeout',
  'methodOverride',
  'vhost',
  'csrf',
  'directory',
  'limit',
  'multipart',
  'staticCache',
].forEach(function (name) {
  Object.defineProperty(exports, name, {
    get: function () {
      throw new Error('Most middleware (like ' + name + ') is no longer bundled with Express and must be installed separately. Please see https://github.com/senchalabs/connect#middleware.');
    }
  });
});


/***/ }),
/* 27 */
/***/ (function(module, exports) {

/**
 * Initialization middleware, exposing the
 * request and response to eachother, as well
 * as defaulting the X-Powered-By header field.
 *
 * @param {Function} app
 * @return {Function}
 * @api private
 */

exports.init = function(app){
  return function expressInit(req, res, next){
    if (app.enabled('x-powered-by')) res.setHeader('X-Powered-By', 'Express');
    req.res = res;
    res.req = req;
    req.next = next;

    req.__proto__ = app.request;
    res.__proto__ = app.response;

    res.locals = res.locals || Object.create(null);

    next();
  };
};



/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var accepts = __webpack_require__(19);
var typeis = __webpack_require__(47);
var http = __webpack_require__(1);
var fresh = __webpack_require__(13);
var parseRange = __webpack_require__(14);
var parse = __webpack_require__(7);

/**
 * Request prototype.
 */

var req = exports = module.exports = {
  __proto__: http.IncomingMessage.prototype
};

/**
 * Return request header.
 *
 * The `Referrer` header field is special-cased,
 * both `Referrer` and `Referer` are interchangeable.
 *
 * Examples:
 *
 *     req.get('Content-Type');
 *     // => "text/plain"
 *
 *     req.get('content-type');
 *     // => "text/plain"
 *
 *     req.get('Something');
 *     // => undefined
 *
 * Aliased as `req.header()`.
 *
 * @param {String} name
 * @return {String}
 * @api public
 */

req.get =
req.header = function(name){
  switch (name = name.toLowerCase()) {
    case 'referer':
    case 'referrer':
      return this.headers.referrer
        || this.headers.referer;
    default:
      return this.headers[name];
  }
};

/**
 * To do: update docs.
 *
 * Check if the given `type(s)` is acceptable, returning
 * the best match when true, otherwise `undefined`, in which
 * case you should respond with 406 "Not Acceptable".
 *
 * The `type` value may be a single mime type string
 * such as "application/json", the extension name
 * such as "json", a comma-delimted list such as "json, html, text/plain",
 * an argument list such as `"json", "html", "text/plain"`,
 * or an array `["json", "html", "text/plain"]`. When a list
 * or array is given the _best_ match, if any is returned.
 *
 * Examples:
 *
 *     // Accept: text/html
 *     req.accepts('html');
 *     // => "html"
 *
 *     // Accept: text/*, application/json
 *     req.accepts('html');
 *     // => "html"
 *     req.accepts('text/html');
 *     // => "text/html"
 *     req.accepts('json, text');
 *     // => "json"
 *     req.accepts('application/json');
 *     // => "application/json"
 *
 *     // Accept: text/*, application/json
 *     req.accepts('image/png');
 *     req.accepts('png');
 *     // => undefined
 *
 *     // Accept: text/*;q=.5, application/json
 *     req.accepts(['html', 'json']);
 *     req.accepts('html', 'json');
 *     req.accepts('html, json');
 *     // => "json"
 *
 * @param {String|Array} type(s)
 * @return {String}
 * @api public
 */

req.accepts = function(){
  var accept = accepts(this);
  return accept.types.apply(accept, arguments);
};

/**
 * Check if the given `encoding` is accepted.
 *
 * @param {String} encoding
 * @return {Boolean}
 * @api public
 */

req.acceptsEncoding = // backwards compatibility
req.acceptsEncodings = function(){
  var accept = accepts(this);
  return accept.encodings.apply(accept, arguments);
};

/**
 * To do: update docs.
 *
 * Check if the given `charset` is acceptable,
 * otherwise you should respond with 406 "Not Acceptable".
 *
 * @param {String} charset
 * @return {Boolean}
 * @api public
 */

req.acceptsCharset = // backwards compatibility
req.acceptsCharsets = function(){
  var accept = accepts(this);
  return accept.charsets.apply(accept, arguments);
};

/**
 * To do: update docs.
 *
 * Check if the given `lang` is acceptable,
 * otherwise you should respond with 406 "Not Acceptable".
 *
 * @param {String} lang
 * @return {Boolean}
 * @api public
 */

req.acceptsLanguage = // backwards compatibility
req.acceptsLanguages = function(){
  var accept = accepts(this);
  return accept.languages.apply(accept, arguments);
};

/**
 * Parse Range header field,
 * capping to the given `size`.
 *
 * Unspecified ranges such as "0-" require
 * knowledge of your resource length. In
 * the case of a byte range this is of course
 * the total number of bytes. If the Range
 * header field is not given `null` is returned,
 * `-1` when unsatisfiable, `-2` when syntactically invalid.
 *
 * NOTE: remember that ranges are inclusive, so
 * for example "Range: users=0-3" should respond
 * with 4 users when available, not 3.
 *
 * @param {Number} size
 * @return {Array}
 * @api public
 */

req.range = function(size){
  var range = this.get('Range');
  if (!range) return;
  return parseRange(size, range);
};

/**
 * Return the value of param `name` when present or `defaultValue`.
 *
 *  - Checks route placeholders, ex: _/user/:id_
 *  - Checks body params, ex: id=12, {"id":12}
 *  - Checks query string params, ex: ?id=12
 *
 * To utilize request bodies, `req.body`
 * should be an object. This can be done by using
 * the `bodyParser()` middleware.
 *
 * @param {String} name
 * @param {Mixed} [defaultValue]
 * @return {String}
 * @api public
 */

req.param = function(name, defaultValue){
  var params = this.params || {};
  var body = this.body || {};
  var query = this.query || {};
  if (null != params[name] && params.hasOwnProperty(name)) return params[name];
  if (null != body[name]) return body[name];
  if (null != query[name]) return query[name];
  return defaultValue;
};

/**
 * Check if the incoming request contains the "Content-Type"
 * header field, and it contains the give mime `type`.
 *
 * Examples:
 *
 *      // With Content-Type: text/html; charset=utf-8
 *      req.is('html');
 *      req.is('text/html');
 *      req.is('text/*');
 *      // => true
 *
 *      // When Content-Type is application/json
 *      req.is('json');
 *      req.is('application/json');
 *      req.is('application/*');
 *      // => true
 *
 *      req.is('html');
 *      // => false
 *
 * @param {String} type
 * @return {Boolean}
 * @api public
 */

req.is = function(types){
  if (!Array.isArray(types)) types = [].slice.call(arguments);
  return typeis(this, types);
};

/**
 * Return the protocol string "http" or "https"
 * when requested with TLS. When the "trust proxy"
 * setting is enabled the "X-Forwarded-Proto" header
 * field will be trusted. If you're running behind
 * a reverse proxy that supplies https for you this
 * may be enabled.
 *
 * @return {String}
 * @api public
 */

req.__defineGetter__('protocol', function(){
  var trustProxy = this.app.get('trust proxy');
  if (this.connection.encrypted) return 'https';
  if (!trustProxy) return 'http';
  var proto = this.get('X-Forwarded-Proto') || 'http';
  return proto.split(/\s*,\s*/)[0];
});

/**
 * Short-hand for:
 *
 *    req.protocol == 'https'
 *
 * @return {Boolean}
 * @api public
 */

req.__defineGetter__('secure', function(){
  return 'https' == this.protocol;
});

/**
 * Return the remote address, or when
 * "trust proxy" is `true` return
 * the upstream addr.
 *
 * @return {String}
 * @api public
 */

req.__defineGetter__('ip', function(){
  return this.ips[0] || this.connection.remoteAddress;
});

/**
 * When "trust proxy" is `true`, parse
 * the "X-Forwarded-For" ip address list.
 *
 * For example if the value were "client, proxy1, proxy2"
 * you would receive the array `["client", "proxy1", "proxy2"]`
 * where "proxy2" is the furthest down-stream.
 *
 * @return {Array}
 * @api public
 */

req.__defineGetter__('ips', function(){
  var trustProxy = this.app.get('trust proxy');
  var val = this.get('X-Forwarded-For');
  return trustProxy && val
    ? val.split(/ *, */)
    : [];
});

/**
 * Return subdomains as an array.
 *
 * Subdomains are the dot-separated parts of the host before the main domain of
 * the app. By default, the domain of the app is assumed to be the last two
 * parts of the host. This can be changed by setting "subdomain offset".
 *
 * For example, if the domain is "tobi.ferrets.example.com":
 * If "subdomain offset" is not set, req.subdomains is `["ferrets", "tobi"]`.
 * If "subdomain offset" is 3, req.subdomains is `["tobi"]`.
 *
 * @return {Array}
 * @api public
 */

req.__defineGetter__('subdomains', function(){
  var offset = this.app.get('subdomain offset');
  return (this.host || '')
    .split('.')
    .reverse()
    .slice(offset);
});

/**
 * Short-hand for `url.parse(req.url).pathname`.
 *
 * @return {String}
 * @api public
 */

req.__defineGetter__('path', function(){
  return parse(this).pathname;
});

/**
 * Parse the "Host" header field hostname.
 *
 * @return {String}
 * @api public
 */

req.__defineGetter__('host', function(){
  var trustProxy = this.app.get('trust proxy');
  var host = trustProxy && this.get('X-Forwarded-Host');
  host = host || this.get('Host');
  if (!host) return;
  return host.split(':')[0];
});

/**
 * Check if the request is fresh, aka
 * Last-Modified and/or the ETag
 * still match.
 *
 * @return {Boolean}
 * @api public
 */

req.__defineGetter__('fresh', function(){
  var method = this.method;
  var s = this.res.statusCode;

  // GET or HEAD for weak freshness validation only
  if ('GET' != method && 'HEAD' != method) return false;

  // 2xx or 304 as per rfc2616 14.26
  if ((s >= 200 && s < 300) || 304 == s) {
    return fresh(this.headers, this.res._headers);
  }

  return false;
});

/**
 * Check if the request is stale, aka
 * "Last-Modified" and / or the "ETag" for the
 * resource has changed.
 *
 * @return {Boolean}
 * @api public
 */

req.__defineGetter__('stale', function(){
  return !this.fresh;
});

/**
 * Check if the request was an _XMLHttpRequest_.
 *
 * @return {Boolean}
 * @api public
 */

req.__defineGetter__('xhr', function(){
  var val = this.get('X-Requested-With') || '';
  return 'xmlhttprequest' == val.toLowerCase();
});


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var http = __webpack_require__(1);
var path = __webpack_require__(3);
var mixin = __webpack_require__(8);
var escapeHtml = __webpack_require__(9);
var sign = __webpack_require__(21).sign;
var normalizeType = __webpack_require__(2).normalizeType;
var normalizeTypes = __webpack_require__(2).normalizeTypes;
var etag = __webpack_require__(2).etag;
var statusCodes = http.STATUS_CODES;
var cookie = __webpack_require__(22);
var send = __webpack_require__(15);
var basename = path.basename;
var extname = path.extname;
var mime = send.mime;

/**
 * Response prototype.
 */

var res = module.exports = {
  __proto__: http.ServerResponse.prototype
};

/**
 * Set status `code`.
 *
 * @param {Number} code
 * @return {ServerResponse}
 * @api public
 */

res.status = function(code){
  this.statusCode = code;
  return this;
};

/**
 * Set Link header field with the given `links`.
 *
 * Examples:
 *
 *    res.links({
 *      next: 'http://api.example.com/users?page=2',
 *      last: 'http://api.example.com/users?page=5'
 *    });
 *
 * @param {Object} links
 * @return {ServerResponse}
 * @api public
 */

res.links = function(links){
  var link = this.get('Link') || '';
  if (link) link += ', ';
  return this.set('Link', link + Object.keys(links).map(function(rel){
    return '<' + links[rel] + '>; rel="' + rel + '"';
  }).join(', '));
};

/**
 * Send a response.
 *
 * Examples:
 *
 *     res.send(new Buffer('wahoo'));
 *     res.send({ some: 'json' });
 *     res.send('<p>some html</p>');
 *     res.send(404, 'Sorry, cant find that');
 *     res.send(404);
 *
 * @param {Mixed} body or status
 * @param {Mixed} body
 * @return {ServerResponse}
 * @api public
 */

res.send = function(body){
  var req = this.req;
  var head = 'HEAD' == req.method;
  var len;

  // settings
  var app = this.app;

  // allow status / body
  if (2 == arguments.length) {
    // res.send(body, status) backwards compat
    if ('number' != typeof body && 'number' == typeof arguments[1]) {
      this.statusCode = arguments[1];
    } else {
      this.statusCode = body;
      body = arguments[1];
    }
  }

  switch (typeof body) {
    // response status
    case 'number':
      this.get('Content-Type') || this.type('txt');
      this.statusCode = body;
      body = http.STATUS_CODES[body];
      break;
    // string defaulting to html
    case 'string':
      if (!this.get('Content-Type')) this.type('html');
      break;
    case 'boolean':
    case 'object':
      if (null == body) {
        body = '';
      } else if (Buffer.isBuffer(body)) {
        this.get('Content-Type') || this.type('bin');
      } else {
        return this.json(body);
      }
      break;
  }

  // populate Content-Length
  if (undefined !== body && !this.get('Content-Length')) {
    this.set('Content-Length', len = Buffer.isBuffer(body)
      ? body.length
      : Buffer.byteLength(body));
  }

  // ETag support
  // TODO: W/ support
  if (app.settings.etag && len && 'GET' == req.method) {
    if (!this.get('ETag')) {
      this.set('ETag', etag(body));
    }
  }

  // freshness
  if (req.fresh) this.statusCode = 304;

  // strip irrelevant headers
  if (204 == this.statusCode || 304 == this.statusCode) {
    this.removeHeader('Content-Type');
    this.removeHeader('Content-Length');
    this.removeHeader('Transfer-Encoding');
    body = '';
  }

  // respond
  this.end(head ? null : body);
  return this;
};

/**
 * Send JSON response.
 *
 * Examples:
 *
 *     res.json(null);
 *     res.json({ user: 'tj' });
 *     res.json(500, 'oh noes!');
 *     res.json(404, 'I dont have that');
 *
 * @param {Mixed} obj or status
 * @param {Mixed} obj
 * @return {ServerResponse}
 * @api public
 */

res.json = function(obj){
  // allow status / body
  if (2 == arguments.length) {
    // res.json(body, status) backwards compat
    if ('number' == typeof arguments[1]) {
      this.statusCode = arguments[1];
    } else {
      this.statusCode = obj;
      obj = arguments[1];
    }
  }

  // settings
  var app = this.app;
  var replacer = app.get('json replacer');
  var spaces = app.get('json spaces');
  var body = JSON.stringify(obj, replacer, spaces);

  // content-type
  this.get('Content-Type') || this.set('Content-Type', 'application/json');

  return this.send(body);
};

/**
 * Send JSON response with JSONP callback support.
 *
 * Examples:
 *
 *     res.jsonp(null);
 *     res.jsonp({ user: 'tj' });
 *     res.jsonp(500, 'oh noes!');
 *     res.jsonp(404, 'I dont have that');
 *
 * @param {Mixed} obj or status
 * @param {Mixed} obj
 * @return {ServerResponse}
 * @api public
 */

res.jsonp = function(obj){
  // allow status / body
  if (2 == arguments.length) {
    // res.json(body, status) backwards compat
    if ('number' == typeof arguments[1]) {
      this.statusCode = arguments[1];
    } else {
      this.statusCode = obj;
      obj = arguments[1];
    }
  }

  // settings
  var app = this.app;
  var replacer = app.get('json replacer');
  var spaces = app.get('json spaces');
  var body = JSON.stringify(obj, replacer, spaces)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
  var callback = this.req.query[app.get('jsonp callback name')];

  // content-type
  this.set('Content-Type', 'application/json');

  // jsonp
  if (callback) {
    if (Array.isArray(callback)) callback = callback[0];
    this.set('Content-Type', 'text/javascript');
    var cb = callback.replace(/[^\[\]\w$.]/g, '');
    body = 'typeof ' + cb + ' === \'function\' && ' + cb + '(' + body + ');';
  }

  return this.send(body);
};

/**
 * Transfer the file at the given `path`.
 *
 * Automatically sets the _Content-Type_ response header field.
 * The callback `fn(err)` is invoked when the transfer is complete
 * or when an error occurs. Be sure to check `res.sentHeader`
 * if you wish to attempt responding, as the header and some data
 * may have already been transferred.
 *
 * Options:
 *
 *   - `maxAge` defaulting to 0
 *   - `root`   root directory for relative filenames
 *
 * Examples:
 *
 *  The following example illustrates how `res.sendfile()` may
 *  be used as an alternative for the `static()` middleware for
 *  dynamic situations. The code backing `res.sendfile()` is actually
 *  the same code, so HTTP cache support etc is identical.
 *
 *     app.get('/user/:uid/photos/:file', function(req, res){
 *       var uid = req.params.uid
 *         , file = req.params.file;
 *
 *       req.user.mayViewFilesFrom(uid, function(yes){
 *         if (yes) {
 *           res.sendfile('/uploads/' + uid + '/' + file);
 *         } else {
 *           res.send(403, 'Sorry! you cant see that.');
 *         }
 *       });
 *     });
 *
 * @param {String} path
 * @param {Object|Function} options or fn
 * @param {Function} fn
 * @api public
 */

res.sendfile = function(path, options, fn){
  options = options || {};
  var self = this;
  var req = self.req;
  var next = this.req.next;
  var done;


  // support function as second arg
  if ('function' == typeof options) {
    fn = options;
    options = {};
  }

  // socket errors
  req.socket.on('error', error);

  // errors
  function error(err) {
    if (done) return;
    done = true;

    // clean up
    cleanup();
    if (!self.headersSent) self.removeHeader('Content-Disposition');

    // callback available
    if (fn) return fn(err);

    // list in limbo if there's no callback
    if (self.headersSent) return;

    // delegate
    next(err);
  }

  // streaming
  function stream(stream) {
    if (done) return;
    cleanup();
    if (fn) stream.on('end', fn);
  }

  // cleanup
  function cleanup() {
    req.socket.removeListener('error', error);
  }

  // transfer
  var file = send(req, path);
  if (options.root) file.root(options.root);
  file.maxage(options.maxAge || 0);
  file.on('error', error);
  file.on('directory', next);
  file.on('stream', stream);
  file.pipe(this);
  this.on('finish', cleanup);
};

/**
 * Transfer the file at the given `path` as an attachment.
 *
 * Optionally providing an alternate attachment `filename`,
 * and optional callback `fn(err)`. The callback is invoked
 * when the data transfer is complete, or when an error has
 * ocurred. Be sure to check `res.headersSent` if you plan to respond.
 *
 * This method uses `res.sendfile()`.
 *
 * @param {String} path
 * @param {String|Function} filename or fn
 * @param {Function} fn
 * @api public
 */

res.download = function(path, filename, fn){
  // support function as second arg
  if ('function' == typeof filename) {
    fn = filename;
    filename = null;
  }

  filename = filename || path;
  this.set('Content-Disposition', 'attachment; filename="' + basename(filename) + '"');
  return this.sendfile(path, fn);
};

/**
 * Set _Content-Type_ response header with `type` through `mime.lookup()`
 * when it does not contain "/", or set the Content-Type to `type` otherwise.
 *
 * Examples:
 *
 *     res.type('.html');
 *     res.type('html');
 *     res.type('json');
 *     res.type('application/json');
 *     res.type('png');
 *
 * @param {String} type
 * @return {ServerResponse} for chaining
 * @api public
 */

res.contentType =
res.type = function(type){
  return this.set('Content-Type', ~type.indexOf('/')
    ? type
    : mime.lookup(type));
};

/**
 * Respond to the Acceptable formats using an `obj`
 * of mime-type callbacks.
 *
 * This method uses `req.accepted`, an array of
 * acceptable types ordered by their quality values.
 * When "Accept" is not present the _first_ callback
 * is invoked, otherwise the first match is used. When
 * no match is performed the server responds with
 * 406 "Not Acceptable".
 *
 * Content-Type is set for you, however if you choose
 * you may alter this within the callback using `res.type()`
 * or `res.set('Content-Type', ...)`.
 *
 *    res.format({
 *      'text/plain': function(){
 *        res.send('hey');
 *      },
 *
 *      'text/html': function(){
 *        res.send('<p>hey</p>');
 *      },
 *
 *      'appliation/json': function(){
 *        res.send({ message: 'hey' });
 *      }
 *    });
 *
 * In addition to canonicalized MIME types you may
 * also use extnames mapped to these types:
 *
 *    res.format({
 *      text: function(){
 *        res.send('hey');
 *      },
 *
 *      html: function(){
 *        res.send('<p>hey</p>');
 *      },
 *
 *      json: function(){
 *        res.send({ message: 'hey' });
 *      }
 *    });
 *
 * By default Express passes an `Error`
 * with a `.status` of 406 to `next(err)`
 * if a match is not made. If you provide
 * a `.default` callback it will be invoked
 * instead.
 *
 * @param {Object} obj
 * @return {ServerResponse} for chaining
 * @api public
 */

res.format = function(obj){
  var req = this.req;
  var next = req.next;

  var fn = obj.default;
  if (fn) delete obj.default;
  var keys = Object.keys(obj);

  var key = req.accepts(keys);

  this.vary("Accept");

  if (key) {
    this.set('Content-Type', normalizeType(key).value);
    obj[key](req, this, next);
  } else if (fn) {
    fn();
  } else {
    var err = new Error('Not Acceptable');
    err.status = 406;
    err.types = normalizeTypes(keys).map(function(o){ return o.value });
    next(err);
  }

  return this;
};

/**
 * Set _Content-Disposition_ header to _attachment_ with optional `filename`.
 *
 * @param {String} filename
 * @return {ServerResponse}
 * @api public
 */

res.attachment = function(filename){
  if (filename) this.type(extname(filename));
  this.set('Content-Disposition', filename
    ? 'attachment; filename="' + basename(filename) + '"'
    : 'attachment');
  return this;
};

/**
 * Set header `field` to `val`, or pass
 * an object of header fields.
 *
 * Examples:
 *
 *    res.set('Foo', ['bar', 'baz']);
 *    res.set('Accept', 'application/json');
 *    res.set({ Accept: 'text/plain', 'X-API-Key': 'tobi' });
 *
 * Aliased as `res.header()`.
 *
 * @param {String|Object|Array} field
 * @param {String} val
 * @return {ServerResponse} for chaining
 * @api public
 */

res.set =
res.header = function(field, val){
  if (2 == arguments.length) {
    if (Array.isArray(val)) val = val.map(String);
    else val = String(val);
    field = field.toLowerCase();
    if ('content-type' == field && !/;\s*charset\s*=/.test(val)) {
      var charset = mime.charsets.lookup(val.split(';')[0]);
      if (charset) val += '; charset=' + charset.toLowerCase();
    }
    this.setHeader(field, val);
  } else {
    for (var key in field) {
      this.set(key, field[key]);
    }
  }
  return this;
};

/**
 * Get value for header `field`.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

res.get = function(field){
  return this.getHeader(field);
};

/**
 * Clear cookie `name`.
 *
 * @param {String} name
 * @param {Object} options
 * @param {ServerResponse} for chaining
 * @api public
 */

res.clearCookie = function(name, options){
  var opts = { expires: new Date(1), path: '/' };
  return this.cookie(name, '', options
    ? mixin(opts, options)
    : opts);
};

/**
 * Set cookie `name` to `val`, with the given `options`.
 *
 * Options:
 *
 *    - `maxAge`   max-age in milliseconds, converted to `expires`
 *    - `signed`   sign the cookie
 *    - `path`     defaults to "/"
 *
 * Examples:
 *
 *    // "Remember Me" for 15 minutes
 *    res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
 *
 *    // save as above
 *    res.cookie('rememberme', '1', { maxAge: 900000, httpOnly: true })
 *
 * @param {String} name
 * @param {String|Object} val
 * @param {Options} options
 * @api public
 */

res.cookie = function(name, val, options){
  options = mixin({}, options);
  var secret = this.req.secret;
  var signed = options.signed;
  if (signed && !secret) throw new Error('cookieParser("secret") required for signed cookies');
  if ('number' == typeof val) val = val.toString();
  if ('object' == typeof val) val = 'j:' + JSON.stringify(val);
  if (signed) val = 's:' + sign(val, secret);
  if ('maxAge' in options) {
    options.expires = new Date(Date.now() + options.maxAge);
    options.maxAge /= 1000;
  }
  if (null == options.path) options.path = '/';
  var headerVal = cookie.serialize(name, String(val), options);

  // supports multiple 'res.cookie' calls by getting previous value
  var prev = this.get('Set-Cookie');
  if (prev) {
    if (Array.isArray(prev)) {
      headerVal = prev.concat(headerVal);
    } else {
      headerVal = [prev, headerVal];
    }
  }
  this.set('Set-Cookie', headerVal);
  return this;
};


/**
 * Set the location header to `url`.
 *
 * The given `url` can also be "back", which redirects
 * to the _Referrer_ or _Referer_ headers or "/".
 *
 * Examples:
 *
 *    res.location('/foo/bar').;
 *    res.location('http://example.com');
 *    res.location('../login');
 *
 * @param {String} url
 * @api public
 */

res.location = function(url){
  var req = this.req;

  // "back" is an alias for the referrer
  if ('back' == url) url = req.get('Referrer') || '/';

  // Respond
  this.set('Location', url);
  return this;
};

/**
 * Redirect to the given `url` with optional response `status`
 * defaulting to 302.
 *
 * The resulting `url` is determined by `res.location()`, so
 * it will play nicely with mounted apps, relative paths,
 * `"back"` etc.
 *
 * Examples:
 *
 *    res.redirect('/foo/bar');
 *    res.redirect('http://example.com');
 *    res.redirect(301, 'http://example.com');
 *    res.redirect('http://example.com', 301);
 *    res.redirect('../login'); // /blog/post/1 -> /blog/login
 *
 * @param {String} url
 * @param {Number} code
 * @api public
 */

res.redirect = function(url){
  var head = 'HEAD' == this.req.method;
  var status = 302;
  var body;

  // allow status / url
  if (2 == arguments.length) {
    if ('number' == typeof url) {
      status = url;
      url = arguments[1];
    } else {
      status = arguments[1];
    }
  }

  // Set location header
  this.location(url);
  url = this.get('Location');

  // Support text/{plain,html} by default
  this.format({
    text: function(){
      body = statusCodes[status] + '. Redirecting to ' + encodeURI(url);
    },

    html: function(){
      var u = escapeHtml(url);
      body = '<p>' + statusCodes[status] + '. Redirecting to <a href="' + u + '">' + u + '</a></p>';
    },

    default: function(){
      body = '';
    }
  });

  // Respond
  this.statusCode = status;
  this.set('Content-Length', Buffer.byteLength(body));
  this.end(head ? null : body);
};

/**
 * Add `field` to Vary. If already present in the Vary set, then
 * this call is simply ignored.
 *
 * @param {Array|String} field
 * @param {ServerResponse} for chaining
 * @api public
 */

res.vary = function(field){
  var self = this;

  // nothing
  if (!field) return this;

  // array
  if (Array.isArray(field)) {
    field.forEach(function(field){
      self.vary(field);
    });
    return;
  }

  var vary = this.get('Vary');

  // append
  if (vary) {
    vary = vary.split(/ *, */);
    if (!~vary.indexOf(field)) vary.push(field);
    this.set('Vary', vary.join(', '));
    return this;
  }

  // set
  this.set('Vary', field);
  return this;
};

/**
 * Render `view` with the given `options` and optional callback `fn`.
 * When a callback function is given a response will _not_ be made
 * automatically, otherwise a response of _200_ and _text/html_ is given.
 *
 * Options:
 *
 *  - `cache`     boolean hinting to the engine it should cache
 *  - `filename`  filename of the view being rendered
 *
 * @param  {String} view
 * @param  {Object|Function} options or callback function
 * @param  {Function} fn
 * @api public
 */

res.render = function(view, options, fn){
  options = options || {};
  var self = this;
  var req = this.req;
  var app = req.app;

  // support callback function as second arg
  if ('function' == typeof options) {
    fn = options, options = {};
  }

  // merge res.locals
  options._locals = self.locals;

  // default callback to respond
  fn = fn || function(err, str){
    if (err) return req.next(err);
    self.send(str);
  };

  // render
  app.render(view, options, fn);
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var pathRegexp = __webpack_require__(37);
var debug = __webpack_require__(0)('express:router:layer');

/**
 * Expose `Layer`.
 */

module.exports = Layer;

function Layer(path, options, fn) {
  if (!(this instanceof Layer)) {
    return new Layer(path, options, fn);
  }

  debug('new %s', path);
  options = options || {};
  this.regexp = pathRegexp(path, this.keys = [], options);
  this.handle = fn;
}

/**
 * Check if this route matches `path`, if so
 * populate `.params`.
 *
 * @param {String} path
 * @return {Boolean}
 * @api private
 */

Layer.prototype.match = function(path){
  var keys = this.keys;
  var params = this.params = {};
  var m = this.regexp.exec(path);
  var n = 0;
  var key;
  var val;

  if (!m) return false;

  this.path = m[0];

  for (var i = 1, len = m.length; i < len; ++i) {
    key = keys[i - 1];

    try {
      val = 'string' == typeof m[i]
        ? decodeURIComponent(m[i])
        : m[i];
    } catch(e) {
      var err = new Error("Failed to decode param '" + m[i] + "'");
      err.status = 400;
      throw err;
    }

    if (key) {
      params[key.name] = val;
    } else {
      params[n++] = val;
    }
  }

  return true;
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var path = __webpack_require__(3);
var fs = __webpack_require__(5);
var utils = __webpack_require__(2);
var dirname = path.dirname;
var basename = path.basename;
var extname = path.extname;
var exists = fs.existsSync || path.existsSync;
var join = path.join;

/**
 * Expose `View`.
 */

module.exports = View;

/**
 * Initialize a new `View` with the given `name`.
 *
 * Options:
 *
 *   - `defaultEngine` the default template engine name
 *   - `engines` template engine require() cache
 *   - `root` root path for view lookup
 *
 * @param {String} name
 * @param {Object} options
 * @api private
 */

function View(name, options) {
  options = options || {};
  this.name = name;
  this.root = options.root;
  var engines = options.engines;
  this.defaultEngine = options.defaultEngine;
  var ext = this.ext = extname(name);
  if (!ext && !this.defaultEngine) throw new Error('No default engine was specified and no extension was provided.');
  if (!ext) name += (ext = this.ext = ('.' != this.defaultEngine[0] ? '.' : '') + this.defaultEngine);
  this.engine = engines[ext] || (engines[ext] = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()).__express);
  this.path = this.lookup(name);
}

/**
 * Lookup view by the given `path`
 *
 * @param {String} path
 * @return {String}
 * @api private
 */

View.prototype.lookup = function(path){
  var ext = this.ext;

  // <path>.<engine>
  if (!utils.isAbsolute(path)) path = join(this.root, path);
  if (exists(path)) return path;

  // <path>/index.<engine>
  path = join(dirname(path), basename(path, ext), 'index' + ext);
  if (exists(path)) return path;
};

/**
 * Render with the given `options` and callback `fn(err, str)`.
 *
 * @param {Object} options
 * @param {Function} fn
 * @api private
 */

View.prototype.render = function(options, fn){
  this.engine(this.path, options, fn);
};


/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = preferredCharsets;
preferredCharsets.preferredCharsets = preferredCharsets;

function parseAcceptCharset(accept) {
  return accept.split(',').map(function(e) {
    return parseCharset(e.trim());
  }).filter(function(e) {
    return e && e.q > 0;
  });
}

function parseCharset(s) {
  var match = s.match(/^\s*(\S+?)\s*(?:;(.*))?$/);
  if (!match) return null;

  var charset = match[1];
  var q = 1;
  if (match[2]) {
    var params = match[2].split(';')
    for (var i = 0; i < params.length; i ++) {
      var p = params[i].trim().split('=');
      if (p[0] === 'q') {
        q = parseFloat(p[1]);
        break;
      }
    }
  }

  return {
    charset: charset,
    q: q
  };
}

function getCharsetPriority(charset, accepted) {
  return (accepted.filter(function(a) {
    return specify(charset, a);
  }).sort(function (a, b) {
    // revsort
    return a.q === b.q ? 0 : a.q > b.q ? -1 : 1;
  })[0] || {q:0}).q;
}

function specify(charset, spec) {
  if (spec.charset === '*' || spec.charset === charset) {
    return spec;
  }
};

function preferredCharsets(accept, provided) {
  accept = parseAcceptCharset(accept || '');
  if (provided) {
    return provided.map(function(type) {
      return [type, getCharsetPriority(type, accept)];
    }).filter(function(pair) {
      return pair[1] > 0;
    }).sort(function(a, b) {
      // revsort
      return a[1] === b[1] ? 0 : a[1] > b[1] ? -1 : 1;
    }).map(function(pair) {
      return pair[0];
    });
  } else {
    return accept.sort(function (a, b) {
      // revsort
      return a.q < b.q ? 1 : -1;
    }).map(function(type) {
      return type.charset;
    });
  }
}


/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = preferredEncodings;
preferredEncodings.preferredEncodings = preferredEncodings;

function parseAcceptEncoding(accept) {
  var acceptableEncodings;

  if (accept) {
    acceptableEncodings = accept.split(',').map(function(e) {
      return parseEncoding(e.trim());
    });
  } else {
    acceptableEncodings = [];
  }

  if (!acceptableEncodings.some(function(e) {
    return e && e.encoding === 'identity';
  })) {
    acceptableEncodings.push({
      encoding: 'identity',
      q: 0.1
    });
  }

  return acceptableEncodings.filter(function(e) {
    return e && e.q > 0;
  });
}

function parseEncoding(s) {
  var match = s.match(/^\s*(\S+?)\s*(?:;(.*))?$/);

  if (!match) return null;

  var encoding = match[1];
  var q = 1;
  if (match[2]) {
    var params = match[2].split(';');
    for (var i = 0; i < params.length; i ++) {
      var p = params[i].trim().split('=');
      if (p[0] === 'q') {
        q = parseFloat(p[1]);
        break;
      }
    }
  }

  return {
    encoding: encoding,
    q: q
  };
}

function getEncodingPriority(encoding, accepted) {
  return (accepted.filter(function(a) {
    return specify(encoding, a);
  }).sort(function (a, b) {
    // revsort
    return a.q === b.q ? 0 : a.q > b.q ? -1 : 1;
  })[0] || {q:0}).q;
}

function specify(encoding, spec) {
  if (spec.encoding === '*' || spec.encoding === encoding) {
    return spec;
  }
}

function preferredEncodings(accept, provided) {
  accept = parseAcceptEncoding(accept || '');
  if (provided) {
    return provided.map(function(type) {
      return [type, getEncodingPriority(type, accept)];
    }).filter(function(pair) {
      return pair[1] > 0;
    }).sort(function(a, b) {
      // revsort
      return a[1] === b[1] ? 0 : a[1] > b[1] ? -1 : 1;
    }).map(function(pair) {
      return pair[0];
    });
  } else {
    return accept.sort(function (a, b) {
      // revsort
      return a.q < b.q ? 1 : -1;
    }).map(function(type) {
      return type.encoding;
    });
  }
}


/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = preferredLanguages;
preferredLanguages.preferredLanguages = preferredLanguages;

function parseAcceptLanguage(accept) {
  return accept.split(',').map(function(e) {
    return parseLanguage(e.trim());
  }).filter(function(e) {
    return e && e.q > 0;
  });
}

function parseLanguage(s) {
  var match = s.match(/^\s*(\S+?)(?:-(\S+?))?\s*(?:;(.*))?$/);
  if (!match) return null;

  var prefix = match[1],
      suffix = match[2],
      full = prefix;

  if (suffix) full += "-" + suffix;

  var q = 1;
  if (match[3]) {
    var params = match[3].split(';')
    for (var i = 0; i < params.length; i ++) {
      var p = params[i].split('=');
      if (p[0] === 'q') q = parseFloat(p[1]);
    }
  }

  return {
    prefix: prefix,
    suffix: suffix,
    q: q,
    full: full
  };
}

function getLanguagePriority(language, accepted) {
  var match = getClosestMatch(language, accepted);
  return match ? match.q : 0;
}

function getClosestMatch(language, accepted) {
  var parsed = parseLanguage(language);

  var matches = accepted.filter(function(a) {
    return a.full === parsed.full;
  });
  if (matches.length) return matches[0];

  matches = accepted.filter(function(a) {
    return a.prefix === parsed.prefix && !a.suffix;
  });
  if (matches.length) return matches[0];

  matches = accepted.filter(function(a) {
    return a.prefix === parsed.prefix;
  });
  if (matches.length) return matches[0];

  matches = accepted.filter(function(a) {
    return a.prefix === '*';
  });
  return matches[0];
}

function preferredLanguages(accept, provided) {
  accept = parseAcceptLanguage(accept || '');
  if (provided) {

    var ret = provided.map(function(type) {
      return [type, getLanguagePriority(type, accept)];
    }).filter(function(pair) {
      return pair[1] > 0;
    }).sort(function(a, b) {
      // revsort
      return a[1] === b[1] ? 0 : a[1] > b[1] ? -1 : 1;
    }).map(function(pair) {
      return pair[0];
    });
    return ret;

  } else {
    return accept.sort(function (a, b) {
      // revsort
      return a.q < b.q ? 1 : -1;
    }).map(function(type) {
      return type.full;
    });
  }
}


/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = preferredMediaTypes;
preferredMediaTypes.preferredMediaTypes = preferredMediaTypes;

function parseAccept(accept) {
  return accept.split(',').map(function(e) {
    return parseMediaType(e.trim());
  }).filter(function(e) {
    return e && e.q > 0;
  });
};

function parseMediaType(s) {
  var match = s.match(/\s*(\S+)\/([^;\s]+)\s*(?:;(.*))?/);
  if (!match) return null;

  var type = match[1],
      subtype = match[2],
      full = "" + type + "/" + subtype,
      params = {},
      q = 1;

  if (match[3]) {
    params = match[3].split(';').map(function(s) {
      return s.trim().split('=');
    }).reduce(function (set, p) {
      set[p[0]] = p[1];
      return set
    }, params);

    if (params.q != null) {
      q = parseFloat(params.q);
      delete params.q;
    }
  }

  return {
    type: type,
    subtype: subtype,
    params: params,
    q: q,
    full: full
  };
}

function getMediaTypePriority(type, accepted) {
  return (accepted.filter(function(a) {
    return specify(type, a);
  }).sort(function (a, b) {
    // revsort
    return a.q > b.q ? -1 : 1;
  })[0] || {q:0}).q;
}

function specifies(spec, type) {
  return spec === '*' || spec === type;
}

function specify(type, spec) {
  var p = parseMediaType(type);

  if (spec.params) {
    var keys = Object.keys(spec.params);
    if (keys.some(function (k) {
      return !specifies(spec.params[k], p.params[k]);
    })) {
      // some didn't specify.
      return null;
    }
  }

  if (specifies(spec.type, p.type) &&
      specifies(spec.subtype, p.subtype)) {
    return spec;
  }
}

function preferredMediaTypes(accept, provided) {
  accept = parseAccept(accept || '');
  if (provided) {
    return provided.map(function(type) {
      return [type, getMediaTypePriority(type, accept)];
    }).filter(function(pair) {
      return pair[1] > 0;
    }).sort(function(a, b) {
      // revsort
      return a[1] === b[1] ? 0 : a[1] > b[1] ? -1 : 1;
    }).map(function(pair) {
      return pair[0];
    });

  } else {
    return accept.sort(function (a, b) {
      // revsort
      return a.q < b.q ? 1 : -1;
    }).map(function(type) {
      return type.full;
    });
  }
}




/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = Negotiator;
Negotiator.Negotiator = Negotiator;

function Negotiator(request) {
  if (!(this instanceof Negotiator)) return new Negotiator(request);
  this.request = request;
}

var set = { preferredCharset: [__webpack_require__(32), 'accept-charset'],
            preferredEncoding: [__webpack_require__(33), 'accept-encoding'],
            preferredLanguage: [__webpack_require__(34), 'accept-language'],
            preferredMediaType: [__webpack_require__(35), 'accept'] };

Object.keys(set).forEach(function (k) {
  var mh = set[k],
      method = mh[0],
      header = mh[1],
      singular = k,
      plural = k + 's';

  Negotiator.prototype[plural] = function (available) {
    return method(this.request.headers[header], available);
  };

  Negotiator.prototype[singular] = function(available) {
    var set = this[plural](available);
    if (set) return set[0];
  };
})


/***/ }),
/* 37 */
/***/ (function(module, exports) {

/**
 * Expose `pathtoRegexp`.
 */

module.exports = pathtoRegexp;

/**
 * Normalize the given path string,
 * returning a regular expression.
 *
 * An empty array should be passed,
 * which will contain the placeholder
 * key names. For example "/user/:id" will
 * then contain ["id"].
 *
 * @param  {String|RegExp|Array} path
 * @param  {Array} keys
 * @param  {Object} options
 * @return {RegExp}
 * @api private
 */

function pathtoRegexp(path, keys, options) {
  options = options || {};
  var sensitive = options.sensitive;
  var strict = options.strict;
  var end = options.end !== false;
  keys = keys || [];

  if (path instanceof RegExp) return path;
  if (path instanceof Array) path = '(' + path.join('|') + ')';

  path = path
    .concat(strict ? '' : '/?')
    .replace(/\/\(/g, '/(?:')
    .replace(/([\/\.])/g, '\\$1')
    .replace(/(\\\/)?(\\\.)?:(\w+)(\(.*?\))?(\*)?(\?)?/g, function (match, slash, format, key, capture, star, optional) {
      slash = slash || '';
      format = format || '';
      capture = capture || '([^/' + format + ']+?)';
      optional = optional || '';

      keys.push({ name: key, optional: !!optional });

      return ''
        + (optional ? '' : slash)
        + '(?:'
        + format + (optional ? slash : '') + capture
        + (star ? '((?:[\\/' + format + '].+?)?)' : '')
        + ')'
        + optional;
    })
    .replace(/\*/g, '(.*)');

  return new RegExp('^' + path + (end ? '$' : '(?=\/|$)'), sensitive ? '' : 'i');
};


/***/ }),
/* 38 */
/***/ (function(module, exports) {

/**
 * Object#toString() ref for stringify().
 */

var toString = Object.prototype.toString;

/**
 * Object#hasOwnProperty ref
 */

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Array#indexOf shim.
 */

var indexOf = typeof Array.prototype.indexOf === 'function'
  ? function(arr, el) { return arr.indexOf(el); }
  : function(arr, el) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === el) return i;
      }
      return -1;
    };

/**
 * Array.isArray shim.
 */

var isArray = Array.isArray || function(arr) {
  return toString.call(arr) == '[object Array]';
};

/**
 * Object.keys shim.
 */

var objectKeys = Object.keys || function(obj) {
  var ret = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      ret.push(key);
    }
  }
  return ret;
};

/**
 * Array#forEach shim.
 */

var forEach = typeof Array.prototype.forEach === 'function'
  ? function(arr, fn) { return arr.forEach(fn); }
  : function(arr, fn) {
      for (var i = 0; i < arr.length; i++) fn(arr[i]);
    };

/**
 * Array#reduce shim.
 */

var reduce = function(arr, fn, initial) {
  if (typeof arr.reduce === 'function') return arr.reduce(fn, initial);
  var res = initial;
  for (var i = 0; i < arr.length; i++) res = fn(res, arr[i]);
  return res;
};

/**
 * Cache non-integer test regexp.
 */

var isint = /^[0-9]+$/;

function promote(parent, key) {
  if (parent[key].length == 0) return parent[key] = {}
  var t = {};
  for (var i in parent[key]) {
    if (hasOwnProperty.call(parent[key], i)) {
      t[i] = parent[key][i];
    }
  }
  parent[key] = t;
  return t;
}

function parse(parts, parent, key, val) {
  var part = parts.shift();
  
  // illegal
  if (Object.getOwnPropertyDescriptor(Object.prototype, key)) return;
  
  // end
  if (!part) {
    if (isArray(parent[key])) {
      parent[key].push(val);
    } else if ('object' == typeof parent[key]) {
      parent[key] = val;
    } else if ('undefined' == typeof parent[key]) {
      parent[key] = val;
    } else {
      parent[key] = [parent[key], val];
    }
    // array
  } else {
    var obj = parent[key] = parent[key] || [];
    if (']' == part) {
      if (isArray(obj)) {
        if ('' != val) obj.push(val);
      } else if ('object' == typeof obj) {
        obj[objectKeys(obj).length] = val;
      } else {
        obj = parent[key] = [parent[key], val];
      }
      // prop
    } else if (~indexOf(part, ']')) {
      part = part.substr(0, part.length - 1);
      if (!isint.test(part) && isArray(obj)) obj = promote(parent, key);
      parse(parts, obj, part, val);
      // key
    } else {
      if (!isint.test(part) && isArray(obj)) obj = promote(parent, key);
      parse(parts, obj, part, val);
    }
  }
}

/**
 * Merge parent key/val pair.
 */

function merge(parent, key, val){
  if (~indexOf(key, ']')) {
    var parts = key.split('[')
      , len = parts.length
      , last = len - 1;
    parse(parts, parent, 'base', val);
    // optimize
  } else {
    if (!isint.test(key) && isArray(parent.base)) {
      var t = {};
      for (var k in parent.base) t[k] = parent.base[k];
      parent.base = t;
    }
    set(parent.base, key, val);
  }

  return parent;
}

/**
 * Compact sparse arrays.
 */

function compact(obj) {
  if ('object' != typeof obj) return obj;

  if (isArray(obj)) {
    var ret = [];

    for (var i in obj) {
      if (hasOwnProperty.call(obj, i)) {
        ret.push(obj[i]);
      }
    }

    return ret;
  }

  for (var key in obj) {
    obj[key] = compact(obj[key]);
  }

  return obj;
}

/**
 * Parse the given obj.
 */

function parseObject(obj){
  var ret = { base: {} };

  forEach(objectKeys(obj), function(name){
    merge(ret, name, obj[name]);
  });

  return compact(ret.base);
}

/**
 * Parse the given str.
 */

function parseString(str){
  var ret = reduce(String(str).split('&'), function(ret, pair){
    var eql = indexOf(pair, '=')
      , brace = lastBraceInKey(pair)
      , key = pair.substr(0, brace || eql)
      , val = pair.substr(brace || eql, pair.length)
      , val = val.substr(indexOf(val, '=') + 1, val.length);

    // ?foo
    if ('' == key) key = pair, val = '';
    if ('' == key) return ret;

    return merge(ret, decode(key), decode(val));
  }, { base: {} }).base;

  return compact(ret);
}

/**
 * Parse the given query `str` or `obj`, returning an object.
 *
 * @param {String} str | {Object} obj
 * @return {Object}
 * @api public
 */

exports.parse = function(str){
  if (null == str || '' == str) return {};
  return 'object' == typeof str
    ? parseObject(str)
    : parseString(str);
};

/**
 * Turn the given `obj` into a query string
 *
 * @param {Object} obj
 * @return {String}
 * @api public
 */

var stringify = exports.stringify = function(obj, prefix) {
  if (isArray(obj)) {
    return stringifyArray(obj, prefix);
  } else if ('[object Object]' == toString.call(obj)) {
    return stringifyObject(obj, prefix);
  } else if ('string' == typeof obj) {
    return stringifyString(obj, prefix);
  } else {
    return prefix + '=' + encodeURIComponent(String(obj));
  }
};

/**
 * Stringify the given `str`.
 *
 * @param {String} str
 * @param {String} prefix
 * @return {String}
 * @api private
 */

function stringifyString(str, prefix) {
  if (!prefix) throw new TypeError('stringify expects an object');
  return prefix + '=' + encodeURIComponent(str);
}

/**
 * Stringify the given `arr`.
 *
 * @param {Array} arr
 * @param {String} prefix
 * @return {String}
 * @api private
 */

function stringifyArray(arr, prefix) {
  var ret = [];
  if (!prefix) throw new TypeError('stringify expects an object');
  for (var i = 0; i < arr.length; i++) {
    ret.push(stringify(arr[i], prefix + '[' + i + ']'));
  }
  return ret.join('&');
}

/**
 * Stringify the given `obj`.
 *
 * @param {Object} obj
 * @param {String} prefix
 * @return {String}
 * @api private
 */

function stringifyObject(obj, prefix) {
  var ret = []
    , keys = objectKeys(obj)
    , key;

  for (var i = 0, len = keys.length; i < len; ++i) {
    key = keys[i];
    if ('' == key) continue;
    if (null == obj[key]) {
      ret.push(encodeURIComponent(key) + '=');
    } else {
      ret.push(stringify(obj[key], prefix
        ? prefix + '[' + encodeURIComponent(key) + ']'
        : encodeURIComponent(key)));
    }
  }

  return ret.join('&');
}

/**
 * Set `obj`'s `key` to `val` respecting
 * the weird and wonderful syntax of a qs,
 * where "foo=bar&foo=baz" becomes an array.
 *
 * @param {Object} obj
 * @param {String} key
 * @param {String} val
 * @api private
 */

function set(obj, key, val) {
  var v = obj[key];
  if (Object.getOwnPropertyDescriptor(Object.prototype, key)) return;
  if (undefined === v) {
    obj[key] = val;
  } else if (isArray(v)) {
    v.push(val);
  } else {
    obj[key] = [v, val];
  }
}

/**
 * Locate last brace in `str` within the key.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function lastBraceInKey(str) {
  var len = str.length
    , brace
    , c;
  for (var i = 0; i < len; ++i) {
    c = str[i];
    if (']' == c) brace = false;
    if ('[' == c) brace = true;
    if ('=' == c && !brace) return i;
  }
}

/**
 * Decode `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

function decode(str) {
  try {
    return decodeURIComponent(str.replace(/\+/g, ' '));
  } catch (err) {
    return str;
  }
}


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var debug = __webpack_require__(0)('send')
  , parseRange = __webpack_require__(14)
  , Stream = __webpack_require__(16)
  , mime = __webpack_require__(4)
  , fresh = __webpack_require__(13)
  , path = __webpack_require__(3)
  , http = __webpack_require__(1)
  , fs = __webpack_require__(5)
  , basename = path.basename
  , normalize = path.normalize
  , join = path.join
  , utils = __webpack_require__(40);

/**
 * Expose `send`.
 */

exports = module.exports = send;

/**
 * Expose mime module.
 */

exports.mime = mime;

/**
 * Return a `SendStream` for `req` and `path`.
 *
 * @param {Request} req
 * @param {String} path
 * @param {Object} options
 * @return {SendStream}
 * @api public
 */

function send(req, path, options) {
  return new SendStream(req, path, options);
}

/**
 * Initialize a `SendStream` with the given `path`.
 *
 * Events:
 *
 *  - `error` an error occurred
 *  - `stream` file streaming has started
 *  - `end` streaming has completed
 *  - `directory` a directory was requested
 *
 * @param {Request} req
 * @param {String} path
 * @param {Object} options
 * @api private
 */

function SendStream(req, path, options) {
  var self = this;
  this.req = req;
  this.path = path;
  this.options = options || {};
  this.maxage(0);
  this.hidden(false);
  this.index('index.html');
}

/**
 * Inherits from `Stream.prototype`.
 */

SendStream.prototype.__proto__ = Stream.prototype;

/**
 * Enable or disable "hidden" (dot) files.
 *
 * @param {Boolean} path
 * @return {SendStream}
 * @api public
 */

SendStream.prototype.hidden = function(val){
  debug('hidden %s', val);
  this._hidden = val;
  return this;
};

/**
 * Set index `path`, set to a falsy
 * value to disable index support.
 *
 * @param {String|Boolean} path
 * @return {SendStream}
 * @api public
 */

SendStream.prototype.index = function(path){
  debug('index %s', path);
  this._index = path;
  return this;
};

/**
 * Set root `path`.
 *
 * @param {String} path
 * @return {SendStream}
 * @api public
 */

SendStream.prototype.root = 
SendStream.prototype.from = function(path){
  this._root = normalize(path);
  return this;
};

/**
 * Set max-age to `ms`.
 *
 * @param {Number} ms
 * @return {SendStream}
 * @api public
 */

SendStream.prototype.maxage = function(ms){
  if (Infinity == ms) ms = 60 * 60 * 24 * 365 * 1000;
  debug('max-age %d', ms);
  this._maxage = ms;
  return this;
};

/**
 * Emit error with `status`.
 *
 * @param {Number} status
 * @api private
 */

SendStream.prototype.error = function(status, err){
  var res = this.res;
  var msg = http.STATUS_CODES[status];
  err = err || new Error(msg);
  err.status = status;
  if (this.listeners('error').length) return this.emit('error', err);
  res.statusCode = err.status;
  res.end(msg);
};

/**
 * Check if the pathname is potentially malicious.
 *
 * @return {Boolean}
 * @api private
 */

SendStream.prototype.isMalicious = function(){
  return !this._root && ~this.path.indexOf('..');
};

/**
 * Check if the pathname ends with "/".
 *
 * @return {Boolean}
 * @api private
 */

SendStream.prototype.hasTrailingSlash = function(){
  return '/' == this.path[this.path.length - 1];
};

/**
 * Check if the basename leads with ".".
 *
 * @return {Boolean}
 * @api private
 */

SendStream.prototype.hasLeadingDot = function(){
  return '.' == basename(this.path)[0];
};

/**
 * Check if this is a conditional GET request.
 *
 * @return {Boolean}
 * @api private
 */

SendStream.prototype.isConditionalGET = function(){
  return this.req.headers['if-none-match']
    || this.req.headers['if-modified-since'];
};

/**
 * Strip content-* header fields.
 *
 * @api private
 */

SendStream.prototype.removeContentHeaderFields = function(){
  var res = this.res;
  Object.keys(res._headers).forEach(function(field){
    if (0 == field.indexOf('content')) {
      res.removeHeader(field);
    }
  });
};

/**
 * Respond with 304 not modified.
 *
 * @api private
 */

SendStream.prototype.notModified = function(){
  var res = this.res;
  debug('not modified');
  this.removeContentHeaderFields();
  res.statusCode = 304;
  res.end();
};

/**
 * Check if the request is cacheable, aka
 * responded with 2xx or 304 (see RFC 2616 section 14.2{5,6}).
 *
 * @return {Boolean}
 * @api private
 */

SendStream.prototype.isCachable = function(){
  var res = this.res;
  return (res.statusCode >= 200 && res.statusCode < 300) || 304 == res.statusCode;
};

/**
 * Handle stat() error.
 *
 * @param {Error} err
 * @api private
 */

SendStream.prototype.onStatError = function(err){
  var notfound = ['ENOENT', 'ENAMETOOLONG', 'ENOTDIR'];
  if (~notfound.indexOf(err.code)) return this.error(404, err);
  this.error(500, err);
};

/**
 * Check if the cache is fresh.
 *
 * @return {Boolean}
 * @api private
 */

SendStream.prototype.isFresh = function(){
  return fresh(this.req.headers, this.res._headers);
};

/**
 * Redirect to `path`.
 *
 * @param {String} path
 * @api private
 */

SendStream.prototype.redirect = function(path){
  if (this.listeners('directory').length) return this.emit('directory');
  var res = this.res;
  path += '/';
  res.statusCode = 301;
  res.setHeader('Location', path);
  res.end('Redirecting to ' + utils.escape(path));
};

/**
 * Pipe to `res.
 *
 * @param {Stream} res
 * @return {Stream} res
 * @api public
 */

SendStream.prototype.pipe = function(res){
  var self = this
    , args = arguments
    , path = this.path
    , root = this._root;

  // references
  this.res = res;

  // invalid request uri
  path = utils.decode(path);
  if (-1 == path) return this.error(400);

  // null byte(s)
  if (~path.indexOf('\0')) return this.error(400);

  // join / normalize from optional root dir
  if (root) path = normalize(join(this._root, path));

  // ".." is malicious without "root"
  if (this.isMalicious()) return this.error(403);

  // malicious path
  if (root && 0 != path.indexOf(root)) return this.error(403);

  // hidden file support
  if (!this._hidden && this.hasLeadingDot()) return this.error(404);

  // index file support
  if (this._index && this.hasTrailingSlash()) path += this._index;

  debug('stat "%s"', path);
  fs.stat(path, function(err, stat){
    if (err) return self.onStatError(err);
    if (stat.isDirectory()) return self.redirect(self.path);
    self.emit('file', path, stat);
    self.send(path, stat);
  });

  return res;
};

/**
 * Transfer `path`.
 *
 * @param {String} path
 * @api public
 */

SendStream.prototype.send = function(path, stat){
  var options = this.options;
  var len = stat.size;
  var res = this.res;
  var req = this.req;
  var ranges = req.headers.range;
  var offset = options.start || 0;

  // set header fields
  this.setHeader(stat);

  // set content-type
  this.type(path);

  // conditional GET support
  if (this.isConditionalGET()
    && this.isCachable()
    && this.isFresh()) {
    return this.notModified();
  }

  // adjust len to start/end options
  len = Math.max(0, len - offset);
  if (options.end !== undefined) {
    var bytes = options.end - offset + 1;
    if (len > bytes) len = bytes;
  }

  // Range support
  if (ranges) {
    ranges = parseRange(len, ranges);

    // unsatisfiable
    if (-1 == ranges) {
      res.setHeader('Content-Range', 'bytes */' + stat.size);
      return this.error(416);
    }

    // valid (syntactically invalid ranges are treated as a regular response)
    if (-2 != ranges) {
      options.start = offset + ranges[0].start;
      options.end = offset + ranges[0].end;

      // Content-Range
      res.statusCode = 206;
      res.setHeader('Content-Range', 'bytes '
        + ranges[0].start
        + '-'
        + ranges[0].end
        + '/'
        + len);
      len = options.end - options.start + 1;
    }
  }

  // content-length
  res.setHeader('Content-Length', len);

  // HEAD support
  if ('HEAD' == req.method) return res.end();

  this.stream(path, options);
};

/**
 * Stream `path` to the response.
 *
 * @param {String} path
 * @param {Object} options
 * @api private
 */

SendStream.prototype.stream = function(path, options){
  // TODO: this is all lame, refactor meeee
  var self = this;
  var res = this.res;
  var req = this.req;

  // pipe
  var stream = fs.createReadStream(path, options);
  this.emit('stream', stream);
  stream.pipe(res);

  // socket closed, done with the fd
  req.on('close', stream.destroy.bind(stream));

  // error handling code-smell
  stream.on('error', function(err){
    // no hope in responding
    if (res._header) {
      console.error(err.stack);
      req.destroy();
      return;
    }

    // 500
    err.status = 500;
    self.emit('error', err);
  });

  // end
  stream.on('end', function(){
    self.emit('end');
  });
};

/**
 * Set content-type based on `path`
 * if it hasn't been explicitly set.
 *
 * @param {String} path
 * @api private
 */

SendStream.prototype.type = function(path){
  var res = this.res;
  if (res.getHeader('Content-Type')) return;
  var type = mime.lookup(path);
  var charset = mime.charsets.lookup(type);
  debug('content-type %s', type);
  res.setHeader('Content-Type', type + (charset ? '; charset=' + charset : ''));
};

/**
 * Set reaponse header fields, most
 * fields may be pre-defined.
 *
 * @param {Object} stat
 * @api private
 */

SendStream.prototype.setHeader = function(stat){
  var res = this.res;
  if (!res.getHeader('Accept-Ranges')) res.setHeader('Accept-Ranges', 'bytes');
  if (!res.getHeader('ETag')) res.setHeader('ETag', utils.etag(stat));
  if (!res.getHeader('Date')) res.setHeader('Date', new Date().toUTCString());
  if (!res.getHeader('Cache-Control')) res.setHeader('Cache-Control', 'public, max-age=' + (this._maxage / 1000));
  if (!res.getHeader('Last-Modified')) res.setHeader('Last-Modified', stat.mtime.toUTCString());
};


/***/ }),
/* 40 */
/***/ (function(module, exports) {


/**
 * Return an ETag in the form of `"<size>-<mtime>"`
 * from the given `stat`.
 *
 * @param {Object} stat
 * @return {String}
 * @api private
 */

exports.etag = function(stat) {
  return '"' + stat.size + '-' + Number(stat.mtime) + '"';
};

/**
 * decodeURIComponent.
 *
 * Allows V8 to only deoptimize this fn instead of all
 * of send().
 *
 * @param {String} path
 * @api private
 */

exports.decode = function(path){
  try {
    return decodeURIComponent(path);
  } catch (err) {
    return -1;
  }
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function(html){
  return String(html)
    .replace(/&(?!\w+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Connect - static
 * Copyright(c) 2010 Sencha Inc.
 * Copyright(c) 2011 TJ Holowaychuk
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var send = __webpack_require__(44);
var url = __webpack_require__(17);

/**
 * Static:
 *
 *   Static file server with the given `root` path.
 *
 * Examples:
 *
 *     var oneDay = 86400000;
 *     var serveStatic = require('serve-static');
 *
 *     connect()
 *       .use(serveStatic(__dirname + '/public'))
 *
 *     connect()
 *       .use(serveStatic(__dirname + '/public', { maxAge: oneDay }))
 *
 * Options:
 *
 *    - `maxAge`     Browser cache maxAge in milliseconds. defaults to 0
 *    - `hidden`     Allow transfer of hidden files. defaults to false
 *    - `redirect`   Redirect to trailing "/" when the pathname is a dir. defaults to true
 *    - `index`      Default file name, defaults to 'index.html'
 *
 * @param {String} root
 * @param {Object} options
 * @return {Function}
 * @api public
 */

exports = module.exports = function(root, options){
  options = options || {};

  // root required
  if (!root) throw new TypeError('root path required');

  // default redirect
  var redirect = false !== options.redirect;

  return function staticMiddleware(req, res, next) {
    if ('GET' != req.method && 'HEAD' != req.method) return next();
    var originalUrl = url.parse(req.originalUrl);
    var path = parse(req).pathname;

    if (path == '/' && originalUrl.pathname[originalUrl.pathname.length - 1] != '/') {
      return directory();
    }

    function directory() {
      if (!redirect) return next();
      var target;
      originalUrl.pathname += '/';
      target = url.format(originalUrl);
      res.statusCode = 303;
      res.setHeader('Location', target);
      res.end('Redirecting to ' + escape(target));
    }

    function error(err) {
      if (404 == err.status) return next();
      next(err);
    }

    send(req, path)
      .maxage(options.maxAge || 0)
      .root(root)
      .index(options.index || 'index.html')
      .hidden(options.hidden)
      .on('error', error)
      .on('directory', directory)
      .pipe(res);
  };
};

/**
 * Expose mime module.
 *
 * If you wish to extend the mime table use this
 * reference to the "mime" module in the npm registry.
 */

exports.mime = send.mime;

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

function escape(html) {
  return String(html)
    .replace(/&(?!\w+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

/**
 * Parse the `req` url.
 *
 * @param {ServerRequest} req
 * @return {Object}
 * @api private
 */

function parse(req) {
  var parsed = url.parse(req.url);

  if (parsed.auth && !parsed.protocol && ~parsed.href.indexOf('//')) {
    // This parses pathnames, and a strange pathname like //r@e should work
    parsed = url.parse(req.url.replace(/@/g, '%40'));
  }

  return parsed;
};


/***/ }),
/* 42 */
/***/ (function(module, exports) {


/**
 * Expose `fresh()`.
 */

module.exports = fresh;

/**
 * Check freshness of `req` and `res` headers.
 *
 * When the cache is "fresh" __true__ is returned,
 * otherwise __false__ is returned to indicate that
 * the cache is now stale.
 *
 * @param {Object} req
 * @param {Object} res
 * @return {Boolean}
 * @api public
 */

function fresh(req, res) {
  // defaults
  var etagMatches = true;
  var notModified = true;

  // fields
  var modifiedSince = req['if-modified-since'];
  var noneMatch = req['if-none-match'];
  var lastModified = res['last-modified'];
  var etag = res['etag'];
  var cc = req['cache-control'];

  // unconditional request
  if (!modifiedSince && !noneMatch) return false;

  // check for no-cache cache request directive
  if (cc && cc.indexOf('no-cache') !== -1) return false;  

  // parse if-none-match
  if (noneMatch) noneMatch = noneMatch.split(/ *, */);

  // if-none-match
  if (noneMatch) etagMatches = ~noneMatch.indexOf(etag) || '*' == noneMatch[0];

  // if-modified-since
  if (modifiedSince) {
    modifiedSince = new Date(modifiedSince);
    lastModified = new Date(lastModified);
    notModified = lastModified <= modifiedSince;
  }

  return !! (etagMatches && notModified);
}

/***/ }),
/* 43 */
/***/ (function(module, exports) {


/**
 * Parse "Range" header `str` relative to the given file `size`.
 *
 * @param {Number} size
 * @param {String} str
 * @return {Array}
 * @api public
 */

module.exports = function(size, str){
  var valid = true;
  var i = str.indexOf('=');

  if (-1 == i) return -2;

  var arr = str.slice(i + 1).split(',').map(function(range){
    var range = range.split('-')
      , start = parseInt(range[0], 10)
      , end = parseInt(range[1], 10);

    // -nnn
    if (isNaN(start)) {
      start = size - end;
      end = size - 1;
    // nnn-
    } else if (isNaN(end)) {
      end = size - 1;
    }

    // limit last-byte-pos to current length
    if (end > size - 1) end = size - 1;

    // invalid
    if (isNaN(start)
      || isNaN(end)
      || start > end
      || start < 0) valid = false;

    return {
      start: start,
      end: end
    };
  });

  arr.type = str.slice(0, i);

  return valid ? arr : -1;
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {


module.exports = __webpack_require__(45);

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var debug = __webpack_require__(0)('send')
  , parseRange = __webpack_require__(43)
  , Stream = __webpack_require__(16)
  , mime = __webpack_require__(4)
  , fresh = __webpack_require__(42)
  , path = __webpack_require__(3)
  , http = __webpack_require__(1)
  , fs = __webpack_require__(5)
  , basename = path.basename
  , normalize = path.normalize
  , join = path.join
  , utils = __webpack_require__(46);

/**
 * Expose `send`.
 */

exports = module.exports = send;

/**
 * Expose mime module.
 */

exports.mime = mime;

/**
 * Return a `SendStream` for `req` and `path`.
 *
 * @param {Request} req
 * @param {String} path
 * @param {Object} options
 * @return {SendStream}
 * @api public
 */

function send(req, path, options) {
  return new SendStream(req, path, options);
}

/**
 * Initialize a `SendStream` with the given `path`.
 *
 * Events:
 *
 *  - `error` an error occurred
 *  - `stream` file streaming has started
 *  - `end` streaming has completed
 *  - `directory` a directory was requested
 *
 * @param {Request} req
 * @param {String} path
 * @param {Object} options
 * @api private
 */

function SendStream(req, path, options) {
  var self = this;
  this.req = req;
  this.path = path;
  this.options = options || {};
  this.maxage(0);
  this.hidden(false);
  this.index('index.html');
}

/**
 * Inherits from `Stream.prototype`.
 */

SendStream.prototype.__proto__ = Stream.prototype;

/**
 * Enable or disable "hidden" (dot) files.
 *
 * @param {Boolean} path
 * @return {SendStream}
 * @api public
 */

SendStream.prototype.hidden = function(val){
  debug('hidden %s', val);
  this._hidden = val;
  return this;
};

/**
 * Set index `path`, set to a falsy
 * value to disable index support.
 *
 * @param {String|Boolean} path
 * @return {SendStream}
 * @api public
 */

SendStream.prototype.index = function(path){
  debug('index %s', path);
  this._index = path;
  return this;
};

/**
 * Set root `path`.
 *
 * @param {String} path
 * @return {SendStream}
 * @api public
 */

SendStream.prototype.root = 
SendStream.prototype.from = function(path){
  this._root = normalize(path);
  return this;
};

/**
 * Set max-age to `ms`.
 *
 * @param {Number} ms
 * @return {SendStream}
 * @api public
 */

SendStream.prototype.maxage = function(ms){
  if (Infinity == ms) ms = 60 * 60 * 24 * 365 * 1000;
  debug('max-age %d', ms);
  this._maxage = ms;
  return this;
};

/**
 * Emit error with `status`.
 *
 * @param {Number} status
 * @api private
 */

SendStream.prototype.error = function(status, err){
  var res = this.res;
  var msg = http.STATUS_CODES[status];
  err = err || new Error(msg);
  err.status = status;
  if (this.listeners('error').length) return this.emit('error', err);
  res.statusCode = err.status;
  res.end(msg);
};

/**
 * Check if the pathname is potentially malicious.
 *
 * @return {Boolean}
 * @api private
 */

SendStream.prototype.isMalicious = function(){
  return !this._root && ~this.path.indexOf('..');
};

/**
 * Check if the pathname ends with "/".
 *
 * @return {Boolean}
 * @api private
 */

SendStream.prototype.hasTrailingSlash = function(){
  return '/' == this.path[this.path.length - 1];
};

/**
 * Check if the basename leads with ".".
 *
 * @return {Boolean}
 * @api private
 */

SendStream.prototype.hasLeadingDot = function(){
  return '.' == basename(this.path)[0];
};

/**
 * Check if this is a conditional GET request.
 *
 * @return {Boolean}
 * @api private
 */

SendStream.prototype.isConditionalGET = function(){
  return this.req.headers['if-none-match']
    || this.req.headers['if-modified-since'];
};

/**
 * Strip content-* header fields.
 *
 * @api private
 */

SendStream.prototype.removeContentHeaderFields = function(){
  var res = this.res;
  Object.keys(res._headers).forEach(function(field){
    if (0 == field.indexOf('content')) {
      res.removeHeader(field);
    }
  });
};

/**
 * Respond with 304 not modified.
 *
 * @api private
 */

SendStream.prototype.notModified = function(){
  var res = this.res;
  debug('not modified');
  this.removeContentHeaderFields();
  res.statusCode = 304;
  res.end();
};

/**
 * Check if the request is cacheable, aka
 * responded with 2xx or 304 (see RFC 2616 section 14.2{5,6}).
 *
 * @return {Boolean}
 * @api private
 */

SendStream.prototype.isCachable = function(){
  var res = this.res;
  return (res.statusCode >= 200 && res.statusCode < 300) || 304 == res.statusCode;
};

/**
 * Handle stat() error.
 *
 * @param {Error} err
 * @api private
 */

SendStream.prototype.onStatError = function(err){
  var notfound = ['ENOENT', 'ENAMETOOLONG', 'ENOTDIR'];
  if (~notfound.indexOf(err.code)) return this.error(404, err);
  this.error(500, err);
};

/**
 * Check if the cache is fresh.
 *
 * @return {Boolean}
 * @api private
 */

SendStream.prototype.isFresh = function(){
  return fresh(this.req.headers, this.res._headers);
};

/**
 * Redirect to `path`.
 *
 * @param {String} path
 * @api private
 */

SendStream.prototype.redirect = function(path){
  if (this.listeners('directory').length) return this.emit('directory');
  var res = this.res;
  path += '/';
  res.statusCode = 301;
  res.setHeader('Location', path);
  res.end('Redirecting to ' + utils.escape(path));
};

/**
 * Pipe to `res.
 *
 * @param {Stream} res
 * @return {Stream} res
 * @api public
 */

SendStream.prototype.pipe = function(res){
  var self = this
    , args = arguments
    , path = this.path
    , root = this._root;

  // references
  this.res = res;

  // invalid request uri
  path = utils.decode(path);
  if (-1 == path) return this.error(400);

  // null byte(s)
  if (~path.indexOf('\0')) return this.error(400);

  // join / normalize from optional root dir
  if (root) path = normalize(join(this._root, path));

  // ".." is malicious without "root"
  if (this.isMalicious()) return this.error(403);

  // malicious path
  if (root && 0 != path.indexOf(root)) return this.error(403);

  // hidden file support
  if (!this._hidden && this.hasLeadingDot()) return this.error(404);

  // index file support
  if (this._index && this.hasTrailingSlash()) path += this._index;

  debug('stat "%s"', path);
  fs.stat(path, function(err, stat){
    if (err) return self.onStatError(err);
    if (stat.isDirectory()) return self.redirect(self.path);
    self.emit('file', path, stat);
    self.send(path, stat);
  });

  return res;
};

/**
 * Transfer `path`.
 *
 * @param {String} path
 * @api public
 */

SendStream.prototype.send = function(path, stat){
  var options = this.options;
  var len = stat.size;
  var res = this.res;
  var req = this.req;
  var ranges = req.headers.range;
  var offset = options.start || 0;

  // set header fields
  this.setHeader(stat);

  // set content-type
  this.type(path);

  // conditional GET support
  if (this.isConditionalGET()
    && this.isCachable()
    && this.isFresh()) {
    return this.notModified();
  }

  // adjust len to start/end options
  len = Math.max(0, len - offset);
  if (options.end !== undefined) {
    var bytes = options.end - offset + 1;
    if (len > bytes) len = bytes;
  }

  // Range support
  if (ranges) {
    ranges = parseRange(len, ranges);

    // unsatisfiable
    if (-1 == ranges) {
      res.setHeader('Content-Range', 'bytes */' + stat.size);
      return this.error(416);
    }

    // valid (syntactically invalid ranges are treated as a regular response)
    if (-2 != ranges) {
      options.start = offset + ranges[0].start;
      options.end = offset + ranges[0].end;

      // Content-Range
      res.statusCode = 206;
      res.setHeader('Content-Range', 'bytes '
        + ranges[0].start
        + '-'
        + ranges[0].end
        + '/'
        + len);
      len = options.end - options.start + 1;
    }
  }

  // content-length
  res.setHeader('Content-Length', len);

  // HEAD support
  if ('HEAD' == req.method) return res.end();

  this.stream(path, options);
};

/**
 * Stream `path` to the response.
 *
 * @param {String} path
 * @param {Object} options
 * @api private
 */

SendStream.prototype.stream = function(path, options){
  // TODO: this is all lame, refactor meeee
  var self = this;
  var res = this.res;
  var req = this.req;

  // pipe
  var stream = fs.createReadStream(path, options);
  this.emit('stream', stream);
  stream.pipe(res);

  // socket closed, done with the fd
  req.on('close', stream.destroy.bind(stream));

  // error handling code-smell
  stream.on('error', function(err){
    // no hope in responding
    if (res._header) {
      console.error(err.stack);
      req.destroy();
      return;
    }

    // 500
    err.status = 500;
    self.emit('error', err);
  });

  // end
  stream.on('end', function(){
    self.emit('end');
  });
};

/**
 * Set content-type based on `path`
 * if it hasn't been explicitly set.
 *
 * @param {String} path
 * @api private
 */

SendStream.prototype.type = function(path){
  var res = this.res;
  if (res.getHeader('Content-Type')) return;
  var type = mime.lookup(path);
  var charset = mime.charsets.lookup(type);
  debug('content-type %s', type);
  res.setHeader('Content-Type', type + (charset ? '; charset=' + charset : ''));
};

/**
 * Set reaponse header fields, most
 * fields may be pre-defined.
 *
 * @param {Object} stat
 * @api private
 */

SendStream.prototype.setHeader = function(stat){
  var res = this.res;
  if (!res.getHeader('Accept-Ranges')) res.setHeader('Accept-Ranges', 'bytes');
  if (!res.getHeader('ETag')) res.setHeader('ETag', utils.etag(stat));
  if (!res.getHeader('Date')) res.setHeader('Date', new Date().toUTCString());
  if (!res.getHeader('Cache-Control')) res.setHeader('Cache-Control', 'public, max-age=' + (this._maxage / 1000));
  if (!res.getHeader('Last-Modified')) res.setHeader('Last-Modified', stat.mtime.toUTCString());
};


/***/ }),
/* 46 */
/***/ (function(module, exports) {


/**
 * Return an ETag in the form of `"<size>-<mtime>"`
 * from the given `stat`.
 *
 * @param {Object} stat
 * @return {String}
 * @api private
 */

exports.etag = function(stat) {
  return '"' + stat.size + '-' + Number(stat.mtime) + '"';
};

/**
 * decodeURIComponent.
 *
 * Allows V8 to only deoptimize this fn instead of all
 * of send().
 *
 * @param {String} path
 * @api private
 */

exports.decode = function(path){
  try {
    return decodeURIComponent(path);
  } catch (err) {
    return -1;
  }
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function(html){
  return String(html)
    .replace(/&(?!\w+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var mime = __webpack_require__(4);

/**
 * Check if the incoming request contains the "Content-Type"
 * header field, and it contains any of the give mime `type`s.
 * If there is no request body, `null` is returned.
 * If there is no content type, `false` is returned.
 * Otherwise, it returns the first `type` that matches.
 *
 * Examples:
 *
 *     // With Content-Type: text/html; charset=utf-8
 *     this.is('html'); // => 'html'
 *     this.is('text/html'); // => 'text/html'
 *     this.is('text/*', 'application/json'); // => 'text/html'
 *
 *     // When Content-Type is application/json
 *     this.is('json', 'urlencoded'); // => 'json'
 *     this.is('application/json'); // => 'application/json'
 *     this.is('html', 'application/*'); // => 'application/json'
 *
 *     this.is('html'); // => false
 *
 * @param {String|Array} types...
 * @return {String|false|null}
 * @api public
 */

module.exports = function (req, types) {
  // no request body
  var headers = req.headers
  if (!(parseInt(headers['content-length'], 10)
    || 'transfer-encoding' in headers)) return;

  var ct = headers['content-type']
  // no content-type
  if (!ct) return false

  // paramless
  ct = ct.split(';')[0];

  // no types, return the content type
  if (!types || !types.length) return ct;

  var type;
  for (var i = 0; i < types.length; i++)
    if (mimeMatch(normalize(type = types[i]), ct))
      return ~type.indexOf('*') ? ct : type

  // no matches
  return false;
}

/**
 * Normalize a mime type.
 * If it's a shorthand, expand it to a valid mime type.
 *
 * @param {String} type
 * @api private
 */

function normalize(type) {
  switch (type) {
    case 'urlencoded': return 'application/x-www-form-urlencoded';
  }

  return ~type.indexOf('/') ? type : mime.lookup(type);
}

/**
 * Check if `exected` mime type
 * matches `actual` mime type with
 * wildcard support.
 *
 * @param {String} expected
 * @param {String} actual
 * @return {Boolean}
 * @api private
 */

function mimeMatch(expected, actual) {
  if (expected == actual) return true;

  if (!~expected.indexOf('*')) return false;

  actual = actual.split('/');
  expected = expected.split('/');

  if ('*' == expected[0] && expected[1] == actual[1]) return true;
  if ('*' == expected[1] && expected[0] == actual[0]) return true;
}


/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("buffer");

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = require("newrelic");

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("tty");

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(18);


/***/ })
/******/ ])));