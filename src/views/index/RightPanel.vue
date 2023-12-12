<template>
  <div class="right-board">
    <el-tabs v-model="activeName" class="center-tabs" :stretch="true">
      <el-tab-pane label="组件属性" name="field"></el-tab-pane>
      <el-tab-pane label="表单属性" name="form"></el-tab-pane>
    </el-tabs>

    <div class="field-box">
      <el-scrollbar class="right-scrollbar">
        <!-- 组件属性 -->
        <el-form v-show="activeName === 'field' && showField" label-width="90px">
          {{ activeData }}
          <el-form-item label="标题">
            <el-input v-model="activeData._config_.label"></el-input>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="activeData._config_.label"></el-input>
          </el-form-item>
          <el-form-item label="标签对齐" v-show="activeData._config_.layout === 'rowItem'">
            <el-radio-group v-model="activeData.type">
              <el-radio-button label="default">default</el-radio-button>
              <el-radio-button label="flex">flex</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="表单栅格">
            <el-slider v-model="activeData._config_.span" :min="1" :max="24" :marks="{ 12: '' }" />
          </el-form-item>
        </el-form>
        <!-- 表单属性 -->
        <el-form v-show="activeName === 'form'" label-width="90px">
          <el-form-item label="表单名">
            <el-input v-model="formConf.formRef" placeholder="请输入表单名" />
          </el-form-item>
          <el-form-item label="表单模型">
            <el-input v-model="formConf.formModel" placeholder="请输入表单模型" />
          </el-form-item>
          <el-form-item label="表单尺寸">
            <el-radio-group v-model="formConf.size">
              <el-radio-button label="large">较大</el-radio-button>
              <el-radio-button label="default">默认</el-radio-button>
              <el-radio-button label="small">较小</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="标签对齐">
            <el-radio-group v-model="formConf.labelPositon">
              <el-radio-button label="left">左对齐</el-radio-button>
              <el-radio-button label="right">右对齐</el-radio-button>
              <el-radio-button label="top">顶部对齐</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="标签宽度">
            <el-input type="number" v-model="formConf.labelWidth" :min="1" placeholder="请输入标签宽度" />
          </el-form-item>
          <el-form-item label="栅格间隔">
            <el-input-number v-model="formConf.gutter" :min="0" placeholder="栅格间隔" />
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </div>

  </div>
</template>
<script setup>
import { defineProps, ref } from 'vue'
const props = defineProps(['activeData', 'showField', 'formConf'])
const activeName = ref('field')
</script>
<style scoped lang='scss'>
.right-board {
  position: absolute;
  right: 0;
  top: 0;
  height: 100vh;
  width: 350px;
  box-sizing: border-box;
}

.right-scrollbar {
  padding: 12px 18px 15px 15px;
}

.center-tabs {
  height: 42px;
}

:deep(.el-tabs__item) {
  height: 42px;
}

:deep(.el-radio-button__inner) {
  font-size: 12px;
}

:deep(.el-slider) {
  width: 92%;
}
</style>
