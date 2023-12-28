function buildAttributes(scheme, dataList, optionsList) {
  buildData(scheme, dataList)

  if (['el-select'].includes(scheme._config_.tag)) {
    buildOptions(scheme, optionsList)
  } else if (['el-cascader', 'el-checkbox-group'].includes(scheme._config_.tag)) {
    optionsList.push(`${scheme._vModel_}Options:${JSON.stringify(scheme.options)},`);
  }
}

function buildData(scheme, dataList) {
  if (!scheme._vModel_) return;
  dataList.push(`${scheme._vModel_}:${JSON.stringify(scheme._config_.defaultValue)},`);
}

function buildOptions(scheme, optionsList) {
  if (!scheme._slot_.default.length === 0) return [];
  optionsList.push(`${scheme._vModel_}Options:${JSON.stringify(scheme._slot_.default)},`);
}

function buildexport(data, options) {
  return `export default {
    props:['str'],
    data(){
      return {
        formData:{
          ${data}
        },
        ${options}
      }
    }
  }`
}

export function makeUpJs(formConfig) {
  const dataList = [];
  const optionsList = [];
  formConfig.fields.forEach(el => {
    buildAttributes(el, dataList, optionsList)
  })

  return buildexport(dataList.join('\n'), optionsList.join('\n'))
}
