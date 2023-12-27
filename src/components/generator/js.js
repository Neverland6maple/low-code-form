function buildAttributes(scheme, dataList) {
  buildData(scheme, dataList)
}

function buildData(scheme, dataList) {
  if (!scheme._vModel_) return;
  dataList.push(`${scheme._vModel_}:${JSON.stringify(scheme._config_.defaultValue)},`);
}

function buildexport(data) {
  return `export default {
    props:['str'],
    data(){
      return {
        formData:{
          ${data}
        }
      }
    }
  }`
}

export function makeUpJs(formConfig) {
  const dataList = [];
  formConfig.fields.forEach(el => {
    buildAttributes(el, dataList)
  })

  return buildexport(dataList.join('\n'))
}
