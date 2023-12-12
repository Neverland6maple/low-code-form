export const deepClone = (obj) => {
  const _toString = Object.prototype.toString;
  //no-object function null undefined
  if (!obj || typeof obj !== 'object') {
    return obj
  }
  //Dom
  if (obj.nodeType && 'cloneNode' in obj) {
    return obj.cloneNode(true)
  }
  const type = _toString.call(obj);
  //RegExp
  if (type === '[object RegExp]') {
    let flags = '';
    if (obj.global) flags += 'g';
    if (obj.multiline) flags += 'm';
    if (obj.ignoreCase) flags += 'i';

    return new RegExp(obj.source, flags)
  }
  //Date
  if (type === '[object Date]') {
    return new Date(new obj.getTime())
  }
  const o = Array.isArray(obj) ? [] : obj.constructor ? new obj.constructor() : {};

  for (let key in obj) {
    o[key] = deepClone(obj[key])
  }
  return o;

}
