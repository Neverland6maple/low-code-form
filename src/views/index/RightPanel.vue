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
          <el-form-item label="组件类型">
            <el-select v-model="activeData._config_.tagIcon" @change="tagChange">
              <el-option-group v-for="group in tagList" :key="group.title" :label="group.title">
                <el-option v-for="item in group.list" :key="item._config_.label" :label="item._config_.label"
                  :value="item._config_.tagIcon" />
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="activeData._config_.label" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="字段名">
            <el-input v-model="activeData._vModel_" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="占位提示">
            <el-input v-model="activeData.placeholder" placeholder="请输入占位提示"></el-input>
          </el-form-item>
          <el-form-item label="表单栅格">
            <el-slider v-model="activeData._config_.span" :min="1" :max="24" :marks="{ 12: '' }" />
          </el-form-item>
          <el-form-item label="标签对齐" v-show="activeData._config_.layout === 'rowItem'">
            <el-radio-group v-model="activeData.type">
              <el-radio-button label="default">default</el-radio-button>
              <el-radio-button label="flex">flex</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="标签宽度">
            <el-input type="number" v-model="activeData._config_.labelWidth" placeholder="请输入标签宽度" />
          </el-form-item>
          <el-form-item label="前缀">
            <el-input v-model="activeData._slot_.prepend" placeholder="请输入前缀" />
          </el-form-item>
          <el-form-item label="后缀">
            <el-input v-model="activeData._slot_.append" placeholder="请输入后缀" />
          </el-form-item>
          <el-form-item label="前图标">
            <el-input v-model="activeData['prefix-icon']" placeholder="请选择前图标" disabled>
              <template #append>
                <el-button icon="Pointer" @click="openIconsDialog('prefix-icon')">
                  选择</el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="最多输入">
            <el-input v-model="activeData.maxLength" placeholder="请输入最多输入">
              <template #append>个字符</template>
            </el-input>
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
    <!-- <icons-dialog v-model="activeData[currentIconModel]"></icons-dialog> -->
    <icons-dialog v-model="iconsVisible" :current="activeData[currentIconModel]"></icons-dialog>
  </div>
</template>
<script setup>
import { defineProps, ref, reactive, defineEmits } from 'vue'
import { inputComponents, selectComponents, } from '@/components/generator/config.js'
import IconsDialog from './IconsDialog.vue';
const props = defineProps(['activeData', 'showField', 'formConf'])
const emit = defineEmits(['tag-change'])
const activeName = ref('field')
const iconsVisible = ref(false);
const currentIconModel = ref(null)
const openIconsDialog = (way) => {
  iconsVisible.value = true;
  currentIconModel.value = way;
}
const tagList = reactive([{
  title: '输入型组件',
  list: inputComponents
}, {
  title: '选择性组件',
  list: selectComponents
}])
const tagChange = (value) => {
  let target = inputComponents.find(item => item._config_.tagIcon === value);
  if (!target) selectComponents.find(item => item._config_.tagIcon === value);
  emit('tag-change', target);
}
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
