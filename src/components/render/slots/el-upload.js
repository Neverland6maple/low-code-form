export default {
  default: (slot, item) => {
    if (item['list-type'] === 'text') {
      if (item['auto-upload']) {
        return () => {
          return <el-button type="primary">{slot}</el-button>
        }
      } else {
        return () => {
          return <el-button type="primary">{slot}</el-button>
        }
      }
    }
  },
  trigger: (slot, item) => {
    if (item['list-type'] !== 'text') {
      return () => <el-icon><Plus /></el-icon>
    }
    if (!item['auto-upload']) {
      return () => <el-button type="success" style="margin-right:10px">{slot}</el-button>
    }
  },
  tip: (slot, item) => {
    if (item._config_.fileSize) {
      return () => <div>只能上传不超过{item._config_.fileSize + item._config_.sizeUnit}的{item.accept}文件</div>
    } else if (item.accept) {
      return () => <div>只能上传{item.accept}文件</div>
    } else {
      return () => <div>选择要上传的文件</div>
    }
  }
}
