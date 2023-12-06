import { h } from 'vue';
import { ElInput } from 'element-plus';


const mapping = {
  'el-input': ElInput
}


export default {
  props: ['conf'],
  render() {
    return h(mapping[this.conf.tag], { type: this.conf.type }, 123)
  }
}
