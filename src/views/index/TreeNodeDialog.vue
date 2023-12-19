<template>
  <div>
    <el-dialog v-bind="$attrs" title="添加选项" @open="onOpen">
      <div>
        <el-form label-width="100px" :model="formData" :rules="rules" ref="ruleFormRef">
          <el-form-item required label="选项名" prop="label">
            <el-input v-model="formData.label" clearable></el-input>
          </el-form-item>
          <el-form-item required label="选项值" prop="value">
            <el-input v-model="formData.value" clearable>
              <template #append>
                <el-select v-model="dataType" style="width: 120px;">
                  <el-option v-for="item in dataTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
        <el-row justify="end">
          <el-button type="primary" @click="handelConfirm">确定</el-button>
          <el-button @click="$emit('update:modelValue', false)">取消</el-button>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script setup>
import { defineOptions, reactive, ref, defineEmits } from 'vue';
import { isNumberStr, deepClone } from '@/utils/index'
defineOptions({ inheritAttrs: false });
const formData = reactive({
  label: '',
  value: ''
})
const emit = defineEmits(['commit'])
const ruleFormRef = ref(null)
const dataType = ref('string');
const dataTypeOptions = [
  { label: '字符串', value: 'string' },
  { label: '数字', value: 'number' },
]
const onOpen = () => {
  ruleFormRef.value.resetFields();
}
const rules = reactive({
  label: [
    { required: true, message: '请输入选项名', triegger: 'blur' }
  ],
  value: [
    { required: true, message: '请输入选项值', triegger: 'blur' }
  ]
})
const handelConfirm = () => {
  ruleFormRef.value.validate((res) => {
    if (res) {
      if (dataType.value === 'number') {
        formData.value = parseFloat(formData.value);
      }
      emit('commit', deepClone(formData));
      emit('update:modelValue', false);
    }
  })
}
</script>
<style scoped lang='scss'></style>
