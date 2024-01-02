const styles = {
  'el-rate': '.el-rate{display: inline-block; vertical-align: text-top;}',
  'el-upload': '.el-upload__tip{line-height: 1.2;}'
}

function addCss(scheme, childList) {
  const item = styles[scheme._config_.tag];
  if (item && !childList.includes(item)) {
    childList.push(item);
  }
  if (scheme._config_.childList) {
    scheme._config_.childList.forEach(scheme2 => {
      addCss(scheme2, childList)
    })
  }
}

export function makeUpCss(formConfig) {
  const childList = [];
  formConfig.fields.forEach(scheme => {
    addCss(scheme, childList)
  })
  return childList.join('\n');
}
