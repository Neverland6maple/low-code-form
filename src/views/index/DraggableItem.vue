<script lang="jsx">
import { h } from 'vue';
import render from '@/components/render/render.js'

const layouts = {
  colItem(conf) {
    return <render conf={conf} ></render>
  },
}

export default {
  props: ['conf'],
  render() {
    // return <h1>text</h1>
    // return h('el-button', {}, this.conf._config_.tag)

    return layouts[this.conf._config_.layout](this.conf._config_);
  }
}
</script>
