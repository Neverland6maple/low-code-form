export default {
  default: (slot, item) => {
    if (item._config_.optionType === 'button') {
      return () => {
        return slot.map(el => {
          return <el-radio-button label={el.value} >{el.label}</el-radio-button>
        })
      }
    } else {
      return () => {
        return slot.map(el => {
          return <el-radio label={el.value} border={item.border}>{el.label}</el-radio>
        })
      }
    }
  }
}
