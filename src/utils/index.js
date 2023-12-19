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

export const beautifierConf = {
  html: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'separate',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true
  },
  js: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'normal',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: true,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true
  }
}

export const isNumberStr = (str) => {
  return !isNaN(str);
}
