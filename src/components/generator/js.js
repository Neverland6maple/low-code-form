const inheritAttrs = {
  file: '',
  dialog: 'inheritAttrs:false,',
}
const mixinMethod = {
  'dialog': [
    `onOpened(){},`,
    `onClosed(){},`
  ],
}

function buildAttributes(scheme, dataList, optionsList, methodList, timeList) {
  buildData(scheme, dataList, timeList)

  if (['el-select'].includes(scheme._config_.tag)) {
    buildOptions(scheme, optionsList)
  } else if (['el-cascader', 'el-checkbox-group'].includes(scheme._config_.tag)) {
    optionsList.push(`${scheme._vModel_}Options:${JSON.stringify(scheme.options)},`);
  }

  if (scheme._config_.tag === 'el-time-picker' && scheme['is-range'] === undefined) {
    buildLimitTime(scheme, timeList, methodList)
  }
  if (scheme._config_.fileSize !== undefined) {
    methodList.push(`beforeAvatarUpload(fileSize, sizeUnit) {
      return (rawFile) => {
        let size = rawFile.size;
        let turn;
        switch (sizeUnit) {
          case 'KB':
            turn = 1;
            break;
          case 'MB':
            turn = 2;
            break;
          case 'GB':
            turn = 3;
            break;
        }
        while (turn-- > 0) {
          size /= 1024;
        }
        if (fileSize >= size) {
          return true
        }
        this.$message.error('上传文件大小需小于' + fileSize + sizeUnit)
        return false;
      }
    }`)
  }
}

function buildData(scheme, dataList, timeList) {
  if (!scheme._vModel_) return;
  if (scheme._config_.tagIcon !== 'time') {
    dataList.push(`${scheme._vModel_}:${JSON.stringify(scheme._config_.defaultValue)},`);
  } else {
    timeList.push(`${scheme._vModel_}:${JSON.stringify(scheme._config_.defaultValue)},`);
  }
}

function buildOptions(scheme, optionsList) {
  if (!scheme._slot_.default.length === 0) return [];
  optionsList.push(`${scheme._vModel_}Options:${JSON.stringify(scheme._slot_.default)},`);
}
function buildLimitTime(scheme, timeList, methodList) {
  timeList.push(`${scheme._vModel_}DH:${JSON.stringify(scheme['disabled-hours'])},`);
  timeList.push(`${scheme._vModel_}DM:${JSON.stringify(scheme['disabled-minutes'])},`);
  timeList.push(`${scheme._vModel_}DS:${JSON.stringify(scheme['disabled-seconds'])},`);

  const buildLimitTime = `buildLimitTime(dataKey, key) {
    return () => {
      if (!(this.timeData[dataKey] instanceof Date)) return;
      const total = key === 'disabled-hours' ? 24 : 60;
      let arr = [];
      const h = this.timeData[dataKey].getHours();
      const m = this.timeData[dataKey].getMinutes();
      const s = this.timeData[dataKey].getSeconds();

      if (key === 'disabled-minutes') {
        if (h > this.timeData[dataKey + 'DH'][0] && h < this.timeData[dataKey + 'DH'][1]) {
          arr = this.makeRange(0, 59);
        } else if (h === this.timeData[dataKey + 'DH'][0]) {
          arr = this.makeRange(this.timeData[dataKey + 'DM'][0], 59);
        } else if (h === this.timeData[dataKey + 'DH'][1]) {
          arr = this.makeRange(0, this.timeData[dataKey + 'DM'][1]);
        }
      } else if (key === 'disabled-seconds') {
        if (h > this.timeData[dataKey + 'DH'][0] && h < this.timeData[dataKey + 'DH'][1]) {
          arr = this.makeRange(0, 59);
        } else if (h === this.timeData[dataKey + 'DH'][0]) {
          if (m > this.timeData[dataKey + 'DM'][0]) {
            arr = this.makeRange(0, 59);
          } else if (m === this.timeData[dataKey + 'DM'][0]) {
            arr = this.makeRange(this.timeData[dataKey + 'DS'][0], 59);
          }
        } else if (h === this.timeData[dataKey + 'DH'][1]) {
          if (m < this.timeData[dataKey + 'DM'][1]) {
            arr = this.makeRange(0, 59);
          } else if (m === this.timeData[dataKey + 'DM'][1]) {
            arr = this.makeRange(0, this.timeData[dataKey + 'DS'][1]);
          }
        }
      } else {
        arr = this.makeRange(this.timeData[dataKey + 'DH'][0], this.timeData[dataKey + 'DH'][1])
      }
      return Array.from(Array(total), (v, i) => i).filter(item => !arr.includes(item));
    }
  },`
  methodList.push(`makeRange(start, end) {
    const arr = [];
    while (start <= end) {
      arr.push(start++);
    }
    return arr;
  },`)
  methodList.push(buildLimitTime)
}

function buildexport(data, options, methods, timeList, type) {
  return `export default {
    ${inheritAttrs[type]}
    props:[],
    data(){
      return {
        formData:{
          ${data}
        },
        timeData:{
          ${timeList}
        },
        ${options}
      }
    },
    methods:{
      buildTimeAttr(key){
        return ()=>{
          console.log(this.key);
        }
      },
      ${methods}
    },
    created(){
      Object.keys(this.timeData).forEach(key=>{
        if(!Array.isArray(this.timeData[key]) && this.timeData[key] !== ''){
          this.timeData[key] = new Date(this.timeData[key]);
        }
      })

    }
  }`
}

export function makeUpJs(formConfig, type) {
  const dataList = [];
  const optionsList = [];
  const methodList = mixinMethod[type] || [];
  const timeList = [];
  formConfig.fields.forEach(el => {
    buildAttributes(el, dataList, optionsList, methodList, timeList)
  })
  return buildexport(dataList.join('\n'), optionsList.join('\n'), methodList.join('\n'), timeList.join('\n'), type)
}
