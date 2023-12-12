import { h } from 'vue';
import {
  ElInput, ElButton, ElCascader, ElCheckbox, ElColorPicker,
  ElDatePicker, ElInputNumber, ElRadio, ElRate, ElSelect, ElSlider,
  ElSwitch, ElTimePicker, ElUpload, ElTimeSelect
} from 'element-plus';

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


export default {
  props: ['conf'],
  render() {
    return h(mapping[this.conf.tag], { type: this.conf.type }, () => { })
  }
}
