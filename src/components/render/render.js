import { h } from 'vue';
import {
  ElInput, ElButton, ElCascader, ElCheckbox, ElColorPicker,
  ElDatePicker, ElInputNumber, ElRadio, ElRate, ElSelect, ElSlider,
  ElSwitch, ElTimePicker, ElUpload, ElTimeSelect
} from 'element-plus';
import { deepClone } from '@/utils';
const mapping = {
  'el-input': ElInput,
  'el-button': ElButton,
  'el-cascader': ElCascader,
  'el-checkbox': ElCheckbox,
  'el-color-picker': ElColorPicker,
  'el-date-picker': ElDatePicker,
  'el-input-number': ElInputNumber,
  'el-radio': ElRadio,
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


function mountSlotFiles(conf, children) {
  const childObjs = componentChild[conf._config_.tag];
  if (childObjs) {
    Object.keys(childObjs).forEach(key => {
      if (conf._slot_[key]) {
        children[key] = childObjs[key](conf._slot_[key]);
      }
    })
  }
}

function vModel(target, defaultValue) {
  target.modelValue = defaultValue;

  // target['onUpdate:modelValue'] = (event) => {
  // this.$emit('onUpdate:modelValue', event)
  // this.$emit('input', event)
  // };
}
function buildDataObject(item) {
  const clone = { type: item._config_.type };
  Object.keys(item).forEach(key => {
    if (key === '_vModel_' && item._vModel_ !== undefined) {
      vModel.call(this, clone, item._config_.defaultValue);
    } else {
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
  props: ['item'],
  render(context) {
    const children = {};
    mountSlotFiles(context.item, children);
    return h(mapping[context.item._config_.tag], buildDataObject.call(context, context.item), children)
  }
}
