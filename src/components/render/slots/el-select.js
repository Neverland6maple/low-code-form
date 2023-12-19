export default {
  default: (options) => {
    return () => options.map(item => {
      return <el-option label={item.label} value={item.value}></el-option>
    })
  }
}
