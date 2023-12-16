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
function vModel(target, defaultValue) {
  target.modelValue = defaultValue;

  // target['onUpdate:modelValue'] = (event) => {
  // this.$emit('onUpdate:modelValue', event)
  // this.$emit('input', event)
  // };
}
function buildDataObject(conf) {
  const clone = { type: conf.type };
  if (conf._vModel_ !== undefined) {
    vModel.call(this, clone, conf.defaultValue);
  }
  return clone;
}

export default {
  props: ['conf'],
  render(context) {

    return h(mapping[context.conf.tag], buildDataObject.call(context, context.conf), () => { })
  }
}
