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
  },
  'rowItem'(scheme) {
    const child = scheme._config_.children;
    const tagDom = child.map(item => {
      return layouts[item._config_.layout](item)
    })
    let str = `<el-row>
      ${scheme.type === 'default' ? `<div>` + tagDom.join('\n') + `</div>` : tagDom.join('\n')}
    </el-row>`
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
  ['el-slider'](scheme) {
    const { tag, disabled, vModel, min, max } = attrBuilder(scheme);
    const step = scheme.step ? `:step="${scheme.step}"` : '';
    const showStops = scheme['show-stops'] ? `show-stops` : '';
    const range = scheme.range ? `range` : '';
    return `<${tag} ${min} ${max} ${range} ${showStops} ${step} ${disabled} ${vModel} />`
  },
  ['el-time-picker'](scheme) {
    if (scheme['is-range'] === undefined) {
      const { tag, placeholder, clearable, disabled, style } = attrBuilder(scheme);
      const vModel = scheme._vModel_ ? `v-model="timeData.${scheme._vModel_}"` : '';
      const format = `format="${scheme.format}"`;
      const disabledHours = `:disabled-hours="buildLimitTime('${scheme._vModel_}','disabled-hours')"`;
      const disabledMinutes = `:disabled-minutes="buildLimitTime('${scheme._vModel_}','disabled-minutes')"`;
      const disabledSeconds = `:disabled-seconds="buildLimitTime('${scheme._vModel_}','disabled-seconds')"`;
      return `<${tag} ${style} ${disabledSeconds} ${disabledMinutes} ${disabledHours} ${clearable} ${placeholder} ${format} ${disabled} ${vModel} />`
    } else {
      const { tag, placeholder, clearable, disabled, style, vModel } = attrBuilder(scheme);
      const isRange = 'is-range';
      const format = `format="${scheme.format}"`;
      const valueFormat = `value-format="${scheme.format}"`
      const startPlaceholder = `start-placeholder="${scheme['start-placeholder']}"`;
      const endPlaceholder = `end-placeholder="${scheme['end-placeholder']}"`;
      const rangeSeparator = `range-separator="${scheme['range-separator']}"`;
      return `<${tag} ${valueFormat} ${rangeSeparator} ${endPlaceholder} ${isRange} ${startPlaceholder} ${style} ${clearable} ${placeholder} ${format} ${disabled} ${vModel} />`
    }
  },
  ['el-date-picker'](scheme) {
    const { tag, disabled, vModel, type, readonly, clearable, placeholder, style } = attrBuilder(scheme);
    const format = `format="${scheme.format}"`;
    const valueFormat = `value-format="${scheme['value-format']}"`;
    const startPlaceholder = scheme['start-placeholder'] !== undefined ? `start-placeholder="${scheme['start-placeholder']}"` : '';
    const endPlaceholder = scheme['end-placeholder'] !== undefined ? `end-placeholder="${scheme['end-placeholder']}"` : '';
    const rangeSeparator = scheme['range-separator'] !== undefined ? `range-separator="${scheme['range-separator']}"` : '';
    return `<${tag} ${rangeSeparator} ${endPlaceholder} ${startPlaceholder} ${valueFormat} ${format} ${style} ${placeholder} ${clearable} ${readonly} ${type}  ${disabled} ${vModel} />`
  },
  ['el-rate'](scheme) {
    const { tag, disabled, vModel, max } = attrBuilder(scheme);
    const allowHalf = scheme['allow-half'] ? 'allow-half' : '';
    const showScore = scheme['show-score'] ? 'show-score' : '';
    return `<${tag} ${max} ${allowHalf} ${showScore} ${disabled} ${vModel} />`
  },
  ['el-color-picker'](scheme) {
    const { tag, disabled, vModel, size } = attrBuilder(scheme);
    const showAlpha = scheme['show-alpha'] ? 'show-alpha' : '';
    const colorFormat = scheme['color-format'] !== '' ? `color-format="${scheme['color-format']}"` : '';
    return `<${tag} ${showAlpha} ${colorFormat} ${size} ${disabled} ${vModel} />`
  },
  ['el-upload'](scheme) {
    const { tag, disabled, vModel } = attrBuilder(scheme);
    const action = `action="${scheme.action}"`;
    const listType = scheme['list-type'] !== 'text' ? `list-type="${scheme['list-type']}"` : '';
    const multiple = scheme.multiple ? 'multiple' : '';
    const autoUpload = !scheme['auto-upload'] ? ':auto-upload="false"' : '';
    const name = `name="${scheme.name}"`;
    const accept = scheme.accept !== '' ? `accept="${scheme.accept}"` : '';
    const child = buildElUploadChild(scheme);
    const beforeUpload = scheme._config_.fileSize !== undefined ? `:before-upload="beforeAvatarUpload(${scheme._config_.fileSize},'${scheme._config_.sizeUnit}')"` : '';
    return `<${tag} ${beforeUpload} ${accept} ${name} ${autoUpload} ${multiple} ${listType} ${action} ${disabled} ${vModel}>${child}</${tag}>`
  },
  ['el-button'](scheme) {
    const { tag, disabled, vModel, type, size } = attrBuilder(scheme);
    const icon = scheme.icon !== undefined ? `icon="${scheme.icon}"` : '';
    return `<${tag} ${icon} ${type} ${size} ${disabled} ${vModel}>${scheme._slot_.default}</${tag}>`
  },
  tinymce(scheme) {
    const { tag, vModel, placeholder } = attrBuilder(scheme);
    return `<${tag} ${vModel} ${placeholder} />`
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
  // if (someSpanIsNot24 || scheme._config_.span !== 24) {
  const span = `:span="${scheme._config_.span}"`
  return `<el-col ${span}>
      ${str}
    </el-col>`
  // }
  // return str
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
function buildElUploadChild(scheme) {
  const childList = [''];
  if (scheme['list-type'] === 'text') {
    if (scheme['auto-upload']) {
      childList.push(`<template #default><el-button type="primary">${scheme._slot_.default}</el-button></template>`)
    } else {
      childList.push(`<template #default><el-button type="primary">${scheme._slot_.default}</el-button></template>`)
    }
  }
  if (scheme['list-type'] !== 'text') {
    childList.push(`<template #trigger><el-icon><Plus /></el-icon></template>`)
  } else if (!scheme['auto-upload']) {
    childList.push(`<template #trigger><el-button type="success" style="margin-right:10px">${scheme._slot_.trigger}</el-button></template>`)
  }
  if (scheme._slot_.tip) {
    if (scheme._config_.fileSize) {
      childList.push(`<template #tip><div>只能上传不超过${scheme._config_.fileSize + scheme._config_.sizeUnit}的${scheme.accept}文件</div></template>`)
    } else if (scheme.accept) {
      childList.push(`<template #tip><div>只能上传${scheme.accept}文件</div></template>`)
    } else {
      childList.push(`<template #tip><div>选择要上传的文件</div></template>`)
    }
  }
  childList.push('');
  return childList.join('\n');
}
function buildDialog(str) {
  return `<el-dialog v-bind="$attrs" @open="onOpened" :title="$attrs.title || '默认标题'">
    ${str}
    <template #footer>
      <el-button @click="$emit('update:modelValue',false)">取消</el-button>
      <el-button type="primary">确认</el-button>
    </template>
  </el-dialog>`
}
export function makeUpHtml(formConfig, type) {
  const htmlList = [];
  someSpanIsNot24 = formConfig.fields.some(el => el._config_.span !== 24);

  formConfig.fields.forEach(item => {
    htmlList.push(layouts[item._config_.layout](item))
  });
  const htmlStr = htmlList.join('\n');
  // console.log(htmlList);
  let str = buildFormTemplate(formConfig, htmlStr);
  if (type === 'dialog') {
    str = buildDialog(str)
  }
  return str;
}
export function vueTemplate(str) {
  return `<template>
  ${str}
  </template>`
}
export function vueScript(str) {
  return `<script>
    ${str}
  </script>`
}
export function cssStyle(str) {
  return `<style>
    ${str}
  </style>`
}
