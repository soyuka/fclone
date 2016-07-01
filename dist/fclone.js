(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define('fclone', [], factory);
    } else if (typeof module === 'object' && module.exports) {
			  //node
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.fclone = factory();
    }
}(this, function () {
  'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function fclone(obj, refs) {
  if (!obj || "object" !== (typeof obj === 'undefined' ? 'undefined' : _typeof(obj))) return obj;

  if (obj instanceof Date) {
    var _copy = new Date();
    _copy.setTime(obj.getTime());
    return _copy;
  }

  if (Buffer !== undefined && Buffer.isBuffer(obj)) {
    return new Buffer(obj);
  }

  if (!refs) {
    refs = [];
  }

  if (Array.isArray(obj)) {
    refs[refs.length] = obj;
    var _l = obj.length;
    var i = -1;
    var _copy2 = [];

    while (_l > ++i) {
      _copy2[i] = ~refs.indexOf(obj[i]) ? '[Circular]' : fclone(obj[i], refs);
    }

    refs.length && refs.length--;
    return _copy2;
  }

  refs[refs.length] = obj;
  var copy = {};

  if (obj instanceof Error) {
    copy.name = obj.name;
    copy.message = obj.message;
    copy.stack = obj.stack;
    refs.length && refs.length--;
    return copy;
  }

  var keys = Object.keys(obj);
  var l = keys.length;

  while (l--) {
    var k = keys[l];
    copy[k] = ~refs.indexOf(obj[k]) ? '[Circular]' : fclone(obj[k], refs);
  }

  refs.length && refs.length--;
  return copy;
}
  return fclone
}));