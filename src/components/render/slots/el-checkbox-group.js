export default {
  default: (options, item) => {
    if (item._config_.optionType === 'button') {
      return () => options.map(el => <el-checkbox-button label={el.value}>{el.label}</el-checkbox-button>)
    } else {
      return () => options.map(el => <el-checkbox label={el.value} border={item.border}>{el.label}</el-checkbox>)
    }
  }
}
