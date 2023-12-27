let confGlobal;
let someSpanIsNot24;

const layouts = {
  'colItem'(scheme) {
    const tagDom = tags[scheme._config_.tag](scheme);
    const label = `label="${scheme._config_.showLabel ? scheme._config_.label : ''}"`;
    const labelWidth = `label-width="${scheme._config_.showLabel ? scheme._config_.labelWidth ? scheme._config_.labelWidth + 'px' : '' : '0px'}"`;
    let str = `<el-form-item ${label} ${labelWidth}>
      ${tagDom}
    </el-form-item>`
    str = colWrapper(str, scheme);
    return str;
  }
}

const tags = {
  ['el-input'](scheme) {
    const { tag, placeholder, type, readonly, disabled, clearable, style, vModel } = attrBuilder(scheme);
    const prefix = scheme['prefix-icon'] ? `prefix-icon="${scheme['prefix-icon']}"` : '';
    const suffix = scheme['suffix-icon'] ? `suffix-icon="${scheme['suffix-icon']}"` : '';
    const showWordLimit = scheme['show-word-limit'] ? 'show-word-limit' : '';
    const maxlength = scheme.maxlength ? `maxlength="${scheme.maxlength}"` : '';
    const autosize = scheme.autosize ? `:autosize="{minRows:${scheme.autosize.minRows},maxRows:${scheme.autosize.maxRows}}"` : '';
    const showPassword = scheme['show-password'] ? `show-password` : '';
    let prepend, append;
    prepend = append = '';
    if (scheme._slot_ && scheme._slot_.prepend) prepend = `<template #prepend>${scheme._slot_.prepend}</template>`;
    if (scheme._slot_ && scheme._slot_.append) append = `<template #append>${scheme._slot_.append}</template>`;
    return `<${tag} ${placeholder} ${type} ${readonly} ${disabled} ${style} ${vModel} ${prefix} ${suffix} ${showWordLimit} ${clearable} ${maxlength} ${autosize} ${showPassword}>${prepend}${append}</el-input>`
  }
}

function attrBuilder(el) {
  return {
    tag: el._config_.tag,
    placeholder: el.placeholder ? `placeholder="${el.placeholder}"` : '',
    type: el.type ? `type="${el.type}"` : '',
    readonly: el.readonly ? 'readonly' : '',
    disabled: el.disabled ? 'disabled' : '',
    clearable: el.clearable ? 'clearable' : '',
    style: el.style ? `style="width:${el.style.width}"` : '',
    vModel: el._vModel_ ? `v-model="formData.${el._vModel_}"` : '',
  }
}

function buildFormTemplate(scheme, child, type) {
  const labelWidth = `label-width="${scheme.labelWidth}px"`;
  const size = `size="${scheme.size}"`;
  const labelPosition = `label-position="${scheme.labelPosition}"`;
  const disabled = scheme.disabled ? 'disabled' : '';
  if (someSpanIsNot24) {
    child = `<el-row>
      ${child}
    </el-row>`
  }
  return `<el-form ${labelWidth} ${size} ${labelPosition} ${disabled} >
    ${child}
  </el-form>`
}

function colWrapper(str, scheme) {
  if (someSpanIsNot24 || scheme._config_.span !== 24) {
    const span = `:span="${scheme._config_.span}"`
    return `<el-col ${span}>
      ${str}
    </el-col>`
  }
  return str
}

export function makeUpHtml(formConfig) {
  const htmlList = [];
  someSpanIsNot24 = formConfig.fields.some(el => el._config_.span !== 24);
  const tempList = formConfig.fields.filter(item => {
    return item._config_.tag === 'el-input';
  })
  tempList.forEach(item => {
    htmlList.push(layouts[item._config_.layout](item))
  });
  const htmlStr = htmlList.join('\n')
  // console.log(htmlList);
  const str = buildFormTemplate(formConfig, htmlStr)
  return str;
}
