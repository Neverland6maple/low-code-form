import { h, ref } from 'vue';
import {
  ElInput, ElButton, ElCascader, ElCheckboxGroup, ElColorPicker,
  ElDatePicker, ElInputNumber, ElRadioGroup, ElRate, ElSelect, ElSlider,
  ElSwitch, ElTimePicker, ElUpload, ElTimeSelect
} from 'element-plus';
import { deepClone } from '@/utils';
const mapping = {
  'el-input': ElInput,
  'el-button': ElButton,
  'el-cascader': ElCascader,
  'el-checkbox-group': ElCheckboxGroup,
  'el-color-picker': ElColorPicker,
  'el-date-picker': ElDatePicker,
  'el-input-number': ElInputNumber,
  'el-radio-group': ElRadioGroup,
  'el-rate': ElRate,
  'el-select': ElSelect,
  'el-slider': ElSlider,
  'el-switch': ElSwitch,
  'el-time-picker': ElTimePicker,
  'el-upload': ElUpload,
  'el-time-select': ElTimeSelect,
}
const componentChild = {};
const slotsFiles = require.context('./slots', false, /\.js$/);
slotsFiles.keys().forEach(fileName => {
  const key = fileName.replace(/\.\/(.*)\.js/g, '$1');
  componentChild[key] = slotsFiles(fileName).default
})
function makeRange(start, end) {
  const arr = [];
  while (start <= end) {
    arr.push(start++);
  }
  return arr;
}

function mountSlotFiles(conf, children) {
  const childObjs = componentChild[conf._config_.tag];
  if (childObjs) {
    Object.keys(childObjs).forEach(key => {
      if (conf._slot_ && conf._slot_[key]) {
        children[key] = childObjs[key](conf._slot_[key], conf);
      }
    })
  }
}

function vModel(target, defaultValue) {
  target.modelValue = defaultValue;
  target['onUpdate:modelValue'] = (event) => {
    this.$emit('update:modelValue', event)
  };
}
function buildDataObject(item) {
  const clone = {};
  Object.keys(item).forEach(key => {
    if (key === '_vModel_' && item._vModel_ !== undefined) {
      vModel.call(this, clone, item._config_.defaultValue);
    } else if (key === 'disabled-hours' || key === 'disabled-minutes' || key === 'disabled-seconds') {
      clone[key] = () => {
        if (item._config_.defaultValue === '') return;
        const total = key === 'disabled-hours' ? 24 : 60;
        let arr;
        const h = item._config_.defaultValue.getHours();
        const m = item._config_.defaultValue.getMinutes();
        const s = item._config_.defaultValue.getSeconds();
        if (key === 'disabled-minutes') {
          if (h > item['disabled-hours'][0] && h < item['disabled-hours'][1]) {
            arr = makeRange(0, 59);
          } else if (h === item['disabled-hours'][0]) {
            arr = makeRange(item[key][0], 59);
          } else if (h === item['disabled-hours'][1]) {
            arr = makeRange(0, item[key][1]);
          }
        } else if (key === 'disabled-seconds') {
          arr = makeRange(0, 59);
          if (h > item['disabled-hours'][0] && h < item['disabled-hours'][1]) {
          } else if (h === item['disabled-hours'][0]) {
            if (m > item['disabled-minutes'][0]) {
              arr = makeRange(0, 59);
            } else if (m === item['disabled-minutes'][0]) {
              arr = makeRange(item[key][0], 59);
            }
          } else if (h === item['disabled-hours'][1]) {
            if (m < item['disabled-minutes'][1]) {
              arr = makeRange(0, 59);
            } else if (m === item['disabled-minutes'][1]) {
              arr = makeRange(0, item[key][1]);
            }
          }
        } else {
          arr = makeRange(item[key][0], item[key][1])
        }
        return Array.from(Array(total), (v, i) => i).filter(item => !arr.includes(item));
      }
    }
    else {
      clone[key] = item[key];
    }
  });
  clearAttrs(clone);
  return clone;
}

function clearAttrs(obj) {
  delete obj._config_;
}

export default {
  inheritAttrs: false,
  props: ['item'],
  render(context) {
    const children = {};
    mountSlotFiles(context.item, children);
    return h(mapping[context.item._config_.tag], buildDataObject.call(context, context.item), children)
  }
}
