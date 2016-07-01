'use strict';

function clone(obj, refs) {
  if (!obj || "object" !== typeof obj) return obj;

  if (obj instanceof Date) {
    let copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  if (Buffer !== undefined && Buffer.isBuffer(obj)) {
    return new Buffer(obj);
  }

  if (!refs) { refs = []; }

  if (Array.isArray(obj)) {
    refs[refs.length] = obj;
    let l = obj.length;
    let i = -1;
    let copy = [];

    while (l > ++i) {
      copy[i] = ~refs.indexOf(obj[i]) ? '[Circular]' : clone(obj[i], refs);
    }

    refs.length && refs.length--
    return copy;
  }

  refs[refs.length] = obj;
  let copy = {};

  if (obj instanceof Error) {
    copy.name = obj.name;
    copy.message = obj.message;
    copy.stack = obj.stack;
    refs.length--
    return copy;
  }

  let keys = Object.keys(obj);
  let l = keys.length;

  while(l--) {
    let k = keys[l]
    copy[k] = ~refs.indexOf(obj[k]) ? '[Circular]' : clone(obj[k], refs);
  }

  refs.length && refs.length--
  return copy;
}
