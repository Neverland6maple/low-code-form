<template>
  <div>
    <el-dialog v-bind="$attrs" @open="onOpen">
      <el-row>
        <el-col>
          <el-form label-width="110px" ref="elFormRef" :model="formData" :rules="rules">
            <el-form-item label="生成类型" prop="type">
              <el-radio-group v-model="formData.type" size="large">
                <el-radio-button label="file">页面</el-radio-button>
                <el-radio-button label="dialog">弹窗</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="文件名" prop="fileName" v-if="showFileName">
              <el-input v-model="formData.fileName" placeholder="请输入文件名" clearable />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row justify="end">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确认</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>
<script setup>
import { defineOptions, reactive, defineEmits, ref, toRaw, defineProps } from 'vue';
defineOptions({ inheritAttrs: false });
const emit = defineEmits('')
const props = defineProps(['showFileName'])
const elFormRef = ref(null)
const formData = reactive({
  fileName: undefined,
  type: 'file'
})
const rules = {
  type: [
    { required: true, message: '生成类型不能为空', trigger: 'change' }
  ]
}
const close = () => {
  emit('update:modelValue', false)
}
const handelConfirm = () => {
  toRaw(elFormRef.value).validate(valid => {
    if (valid) {
      emit('confirm', toRaw(formData))
      close();
    }
  })
}
const onOpen = () => {
  if (props.showFileName) {
    formData.fileName = `${+new Date()}.vue`
  }
}
</script>
<style scoped lang='scss'></style>
