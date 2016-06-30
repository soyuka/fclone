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
    refs.push(obj);
    let l = obj.length;
    let copy = [];

    for (let i = 0; i < l; i++) {
      copy[i] = ~refs.indexOf(obj[i]) ? '[Circular]' : clone(obj[i], refs);
    }

    refs.pop();
    return copy;
  }

  refs.push(obj);
  let copy = {};

  if (obj instanceof Error) {
    copy.name = obj.name;
    copy.message = obj.message;
    copy.stack = obj.stack;
    refs.pop();
    return copy;
  }

  for(let i in obj) {
    copy[i] = ~refs.indexOf(obj[i]) ? '[Circular]' : clone(obj[i], refs);
  }

  refs.pop();
  return copy;
}
