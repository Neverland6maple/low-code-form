let confGlobal;
let someSpanIsNot24;

const layouts = {
  'colItem'(scheme) {
    if (!tags[scheme._config_.tag]) return;
    const tagDom = tags[scheme._config_.tag](scheme);
    const label = `label="${scheme._config_.showLabel ? scheme._config_.label : ''}"`;
    const labelWidth = `${scheme._config_.showLabel ? scheme._config_.labelWidth ? 'label-width="' + scheme._config_.labelWidth + 'px"' : '' : 'label-width=0px'}`;
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
    return `<${tag} ${placeholder} ${type} ${readonly} ${disabled} ${style} ${vModel} ${prefix} ${suffix} ${showWordLimit} ${clearable} ${maxlength} ${autosize} ${showPassword}>${prepend}${append}</${tag}>`
  },
  ['el-input-number'](scheme) {
    const { tag, placeholder, readonly, disabled, vModel, min, max } = attrBuilder(scheme);
    const step = scheme.step ? `:step="${scheme.step}"` : '';
    const precision = scheme.precision ? `:precision="${scheme.precision}"` : '';
    const controlsPosition = scheme['controls-position'] ? `controls-position="${scheme['controls-position']}"` : '';
    const stepStrictly = scheme['step-strictly'] ? `step-strictly` : '';
    return `<${tag} ${step} ${precision} ${controlsPosition} ${stepStrictly} ${placeholder} ${readonly} ${disabled} ${vModel} ${min} ${max}></${tag}>`
  },
  ['el-select'](scheme) {
    const { tag, placeholder, readonly, disabled, vModel, clearable, style } = attrBuilder(scheme);
    const filterable = scheme.filterable ? `filterable` : '';
    const multiple = scheme.multiple ? `multiple` : '';
    const child = buildOptions(scheme)
    return `<${tag} ${clearable} ${filterable} ${multiple} ${placeholder} ${style} ${readonly} ${disabled} ${vModel}>${child}</${tag}>`
  },
  ['el-cascader'](scheme) {
    const { tag, placeholder, readonly, disabled, vModel, clearable, style } = attrBuilder(scheme);
    const props = `:props="{'checkStrictly':${scheme.props.checkStrictly},'multiple':${scheme.props.multiple}}"`;
    const options = `:options="${scheme._vModel_}Options"`
    const filterable = scheme.filterable ? `filterable` : '';
    const showAllLevels = scheme['show-all-levels'] ? `show-all-levels` : '';
    return `<${tag} ${props} ${options} ${filterable} ${showAllLevels} ${clearable} ${placeholder} ${style} ${readonly} ${disabled} ${vModel}></${tag}>`
  },
  ['el-radio-group'](scheme) {
    const { tag, placeholder, disabled, vModel, size } = attrBuilder(scheme);
    const child = buildElRadioGroupChild(scheme);
    return `<${tag} ${size} ${placeholder} ${disabled} ${vModel}>
      ${child}
    </${tag}>`
  },
  ['el-checkbox-group'](scheme) {
    const { tag, placeholder, disabled, vModel, size, min, max } = attrBuilder(scheme);
    const child = buildElCheckboxGroupChild(scheme);
    return `<${tag} ${size} ${min} ${max} ${placeholder} ${disabled} ${vModel}>
      ${child}
    </${tag}>`
  },
  ['el-switch'](scheme) {
    const { tag, disabled, vModel } = attrBuilder(scheme);
    const activeText = scheme['active-text'] !== '' ? `active-text="${scheme['active-text']}"` : '';
    const inactiveText = scheme['inactive-text'] !== '' ? `inactive-text="${scheme['inactive-text']}"` : '';
    const activeValue = scheme['active-value'] !== undefined ? `:active-value='${JSON.stringify(scheme['active-value'])}'` : '';
    const inactiveValue = scheme['inactive-value'] !== undefined ? `:inactive-value='${JSON.stringify(scheme['inactive-value'])}'` : '';
    const style = `:style='{${scheme.style['--el-switch-on-color'] !== undefined ? '"--el-switch-on-color":"' + scheme.style['--el-switch-on-color'] + '",' : ''}${scheme.style['--el-switch-off-color'] !== undefined ? '"--el-switch-off-color":"' + scheme.style['--el-switch-off-color'] + '"' : ''}}'`
    return `<${tag} ${activeText} ${style} ${inactiveValue} ${activeValue} ${inactiveText} ${disabled} ${vModel} />`
  },
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
    size: el.size ? `size="${el.size}"` : '',
    min: el.min !== undefined ? `:min="${el.min}"` : '',
    max: el.max !== undefined ? `:max="${el.max}"` : '',
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

function buildOptions(scheme) {
  if (scheme._slot_.default.length >= 1) {
    return `\n<el-option v-for="item in ${scheme._vModel_}Options" :key="item.value" :label="item.label" :value="item.value"></el-option>\n`
  }
  return '';
}
function buildElRadioGroupChild(scheme) {
  let tag = 'el-radio';
  if (scheme._config_.optionType === 'button') tag += '-button';
  const border = scheme.border ? `border` : '';
  const childList = scheme._slot_.default.map(item => {
    return `<${tag} label="${item.value}" ${border}>${item.label}</${tag}>`
  })
  return childList.join('\n');
}
function buildElCheckboxGroupChild(scheme) {
  let tag = 'el-checkbox';
  if (scheme._config_.optionType === 'button') tag += '-button';
  const border = scheme.border ? `border` : '';
  const childList = scheme._slot_.default.map(item => {
    return `<${tag} label="${item.value}" ${border}>${item.label}</${tag}>`
  })
  return childList.join('\n');
}
export function makeUpHtml(formConfig) {
  const htmlList = [];
  someSpanIsNot24 = formConfig.fields.some(el => el._config_.span !== 24);

  formConfig.fields.forEach(item => {
    htmlList.push(layouts[item._config_.layout](item))
  });
  const htmlStr = htmlList.join('\n');
  // console.log(htmlList);
  const str = buildFormTemplate(formConfig, htmlStr)
  return str;
}
