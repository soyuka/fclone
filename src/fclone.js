'use strict';

function fclone(obj, refs) {
  if (!obj || "object" !== typeof obj) return obj;

  if (obj instanceof Date) {
    return new Date(obj);
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
      copy[i] = ~refs.indexOf(obj[i]) ? '[Circular]' : fclone(obj[i], refs);
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
  }

  let keys = Object.keys(obj);
  let l = keys.length;

  while(l--) {
    let k = keys[l]
    copy[k] = ~refs.indexOf(obj[k]) ? '[Circular]' : fclone(obj[k], refs);
  }

  refs.length && refs.length--
  return copy;
}
