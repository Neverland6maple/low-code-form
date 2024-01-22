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
          <el-form-item label="组件类型" v-if="activeData._config_.layout !== 'rowItem'">
            <el-select v-model="activeData._config_.tagIcon" @change="tagChange">
              <el-option-group v-for="group in tagList" :key="group.title" :label="group.title">
                <el-option v-for="item in group.list" :key="item._config_.label" :label="item._config_.label"
                  :value="item._config_.tagIcon" />
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item label="字段名">
            <el-input v-model="activeData._vModel_" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="activeData._config_.label" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="占位提示" v-if="activeData.placeholder !== undefined">
            <el-input v-model="activeData.placeholder" placeholder="请输入占位提示"></el-input>
          </el-form-item>
          <el-form-item label="开始占位" v-if="activeData['start-placeholder'] !== undefined">
            <el-input v-model="activeData['start-placeholder']" placeholder="请输入开始占位"></el-input>
          </el-form-item>
          <el-form-item label="结束占位" v-if="activeData['end-placeholder'] !== undefined">
            <el-input v-model="activeData['end-placeholder']" placeholder="请输入结束占位"></el-input>
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
          <el-form-item label="组件宽度" v-if="activeData.style && activeData.style.width !== undefined">
            <el-input v-model="activeData.style.width" placeholder="请输入组件宽度" />
          </el-form-item>
          <el-form-item label="默认值" v-if="activeData._config_.defaultValue !== undefined">
            <el-input :modelValue="setDefaultValue(activeData._config_.defaultValue)"
              @update:modelValue="onDefaultValueInput" placeholder="请输入默认值" />
          </el-form-item>
          <el-form-item label="按钮文字" v-if="activeData._config_.tag === 'el-button'">
            <el-input v-model="activeData._slot_.default" placeholder="请输入按钮文字" />
          </el-form-item>
          <el-form-item label="文件字段名" v-if="activeData._config_.tag === 'el-upload'">
            <el-input v-model="activeData.name" placeholder="请输入文件字段名" />
          </el-form-item>
          <el-form-item label="文件类型" v-if="activeData._config_.tag === 'el-upload'">
            <el-select v-model="activeData.accept">
              <el-option label="图片" value="image/*" />
              <el-option label="视频" value="vodep/*" />
              <el-option label="音频" value="audio/*" />
              <el-option label="excel" value=".xls,.xlsx" />
              <el-option label="word" value=".doc,.docx" />
              <el-option label="pdf" value=".pdf" />
              <el-option label="txt" value=".txt" />
              <el-option label="任意" value="" />
            </el-select>
          </el-form-item>
          <el-form-item label="文件大小" v-if="activeData._config_.tag === 'el-upload'">
            <el-input type="number" min="0" v-model="activeData._config_.fileSize" placeholder="请输入文件大小">
              <template #append>
                <el-select v-model="activeData._config_.sizeUnit" style="width:66px">
                  <el-option label="KB" value="KB" />
                  <el-option label="MB" value="MB" />
                  <el-option label="GB" value="GB" />
                </el-select>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="上传地址" v-if="activeData._config_.tag === 'el-upload'">
            <el-input v-model="activeData.action" placeholder="请输入上传地址" />
          </el-form-item>
          <el-form-item label="时间段"
            v-if="activeData._config_.tag === 'el-time-picker' && activeData['is-range'] === undefined && (activeData._config_.defaultValue instanceof Date || activeData._config_.defaultValue === '')">
            <el-time-picker
              :modelValue="setDefaultTime(activeData['disabled-hours'], activeData['disabled-minutes'], activeData['disabled-seconds'])"
              @update:modelValue="onDefaultTime" is-range range-separator="至" start-placeholder="Start time"
              end-placeholder="End time" />
          </el-form-item>
          <el-form-item label="时间类型" v-if="activeData._config_.tag === 'el-date-picker'">
            <el-select v-model="activeData.type" size="large" @change="changeFormat">
              <template v-if="activeData._config_.tagIcon === 'date'">
                <el-option label="日(date)" value="date" />
                <el-option label="周(week)" value="week" />
                <el-option label="月(month)" value="month" />
                <el-option label="年(year)" value="year" />
                <el-option label="日期时间(datetime)" value="datetime" />
              </template>
              <template v-else>
                <el-option label="日期范围(daterange)" value="daterange" />
                <el-option label="月范围(monthrange)" value="monthrange" />
                <el-option label="日期时间范围(datetimerange)" value="datetimerange" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="按钮类型" v-if="activeData._config_.tag === 'el-button'">
            <el-select v-model="activeData.type" size="large" placeholder="请选择按钮类型">
              <el-option label="primary" value="primary" />
              <el-option label="success" value="success" />
              <el-option label="warning" value="warning" />
              <el-option label="danger" value="danger" />
              <el-option label="info" value="info" />
              <el-option label="text" value="text" />
            </el-select>
          </el-form-item>
          <el-form-item label="颜色格式" v-if="activeData._config_.tag === 'el-color-picker'">
            <el-select v-model="activeData['color-format']" @change="updateColorFormat" size="large"
              placeholder="请选择颜色格式">
              <el-option label="hsl" value="hsl" />
              <el-option label="hsv" value="hsv" />
              <el-option label="hex" value="hex" />
              <el-option label="rgb" value="rgb" />
            </el-select>
          </el-form-item>
          <el-form-item label="分隔符" v-if="activeData['range-separator'] !== undefined">
            <el-input v-model="activeData['range-separator']" placeholder="请输入分隔符" />
          </el-form-item>
          <el-form-item label="时间格式" v-if="activeData.format !== undefined">
            <el-input :modelValue="activeData.format" @update:modelValue="setTimeValue" placeholder="请输入时间格式" />
          </el-form-item>
          <el-form-item label="开启提示" v-if="activeData._config_.tag === 'el-switch'">
            <el-input v-model="activeData['active-text']" placeholder="请输入开启提示" />
          </el-form-item>
          <el-form-item label="关闭提示" v-if="activeData._config_.tag === 'el-switch'">
            <el-input v-model="activeData['inactive-text']" placeholder="请输入关闭提示" />
          </el-form-item>
          <el-form-item label="开启值" v-if="activeData._config_.tag === 'el-switch'">
            <el-input :modelValue="setDefaultValue(activeData['active-value'])"
              @update:modelValue="onSwitchValueInput($event, 'active-value')" placeholder="请输入开启值" />
          </el-form-item>
          <el-form-item label="关闭值" v-if="activeData._config_.tag === 'el-switch'">
            <el-input :modelValue="setDefaultValue(activeData['inactive-value'])"
              @update:modelValue="onSwitchValueInput($event, 'inactive-value')" placeholder="请输入关闭值" />
          </el-form-item>
          <el-form-item label="开启颜色" v-if="activeData._config_.tag === 'el-switch'">
            <el-color-picker v-model="activeData.style['--el-switch-on-color']" />
          </el-form-item>
          <el-form-item label="关闭颜色" v-if="activeData._config_.tag === 'el-switch'">
            <el-color-picker v-model="activeData.style['--el-switch-off-color']" />
          </el-form-item>
          <el-form-item label="至少应选" v-if="activeData._config_.tag === 'el-checkbox-group'">
            <el-input-number v-model="activeData.min" :min="0" placeholder="至少应选" />
          </el-form-item>
          <el-form-item label="最多可选" v-if="activeData._config_.tag === 'el-checkbox-group'">
            <el-input-number v-model="activeData.max" :min="0" placeholder="最多可选" />
          </el-form-item>
          <el-form-item label="最小值" v-if="isShowMin">
            <el-input-number v-model="activeData.min" :min="0" placeholder="最小值" />
          </el-form-item>
          <el-form-item label="最大值" v-if="isShowMax">
            <el-input-number v-model="activeData.max" :min="0" placeholder="最大值" />
          </el-form-item>
          <el-form-item label="最小行数" v-if="activeData.autosize !== undefined">
            <el-input-number v-model="activeData.autosize.minRows" :min="1" placeholder="最小行数" />
          </el-form-item>
          <el-form-item label="最大行数" v-if="activeData.autosize !== undefined">
            <el-input-number v-model="activeData.autosize.maxRows" :min="1" placeholder="最大行数" />
          </el-form-item>
          <el-form-item label="步长" v-if="isShowStep">
            <el-input-number v-model="activeData.step" placeholder="步长" />
          </el-form-item>
          <el-form-item label="精度" v-if="activeData._config_.tag === 'el-input-number'">
            <el-input-number v-model="activeData.precision" :min="0" placeholder="精度" />
          </el-form-item>
          <el-form-item label="前缀" v-if="activeData._slot_ && activeData._slot_.prepend !== undefined">
            <el-input v-model="activeData._slot_.prepend" placeholder="请输入前缀" />
          </el-form-item>
          <el-form-item label="后缀" v-if="activeData._slot_ && activeData._slot_.append !== undefined">
            <el-input v-model="activeData._slot_.append" placeholder="请输入后缀" />
          </el-form-item>
          <el-form-item label="按钮图标" v-if="activeData._config_.tag === 'el-button'">
            <el-input v-model="activeData.icon" placeholder="请选择按钮图标" readonly>
              <template #append>
                <el-button icon="Pointer" @click="openIconsDialog('icon')">
                  选择</el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="前图标" v-if="activeData['prefix-icon'] !== undefined">
            <el-input v-model="activeData['prefix-icon']" placeholder="请选择前图标" readonly>
              <template #append>
                <el-button icon="Pointer" @click="openIconsDialog('prefix-icon')">
                  选择</el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="后图标" v-if="activeData['suffix-icon'] !== undefined">
            <el-input v-model="activeData['suffix-icon']" placeholder="请选择后图标" readonly>
              <template #append>
                <el-button icon="Pointer" @click="openIconsDialog('suffix-icon')">
                  选择</el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="最多输入" v-if="activeData.maxlength !== undefined">
            <el-input v-model="activeData.maxlength" placeholder="请输入最多输入">
              <template #append>个字符</template>
            </el-input>
          </el-form-item>
          <el-form-item label="按钮文字" v-if="activeData._config_.tag === 'el-upload'">
            <el-input v-model="activeData._slot_.default" placeholder="请输入按钮文字" />
          </el-form-item>
          <template v-if="isShowOptions">
            <el-divider>选项</el-divider>
            <draggable class="drawing-board" :list="activeData._slot_.default" item-key="right-components"
              :animation="340" handle=".options-drag">
              <template #item="{ element, index }">
                <div class="options-item">
                  <el-icon class="options-drag">
                    <Operation />
                  </el-icon>
                  <el-input v-model="element.label"></el-input>
                  <el-input v-model="element.value"></el-input>
                  <el-icon color="#f56c6c" style="cursor: pointer;" @click="activeData._slot_.default.splice(index, 1)">
                    <Remove />
                  </el-icon>
                </div>
              </template>
            </draggable>
            <el-button text icon="CirclePlus" @click="activeData._slot_.default.push({ label: '', value: '' })"
              class="add-options">
              添加选项
            </el-button>
            <el-divider />
          </template>
          <template v-if="activeData._config_.tag === 'el-cascader'">
            <el-divider>选项</el-divider>
            <el-tree :data="activeData.options" :expand-on-click-node="false" draggable :render-content="renderContent" />
            <el-button text icon="CirclePlus" @click="addTreeItem" class="add-options">
              添加父级
            </el-button>
            <el-divider />
          </template>

          <el-form-item label="列表类型" v-if="activeData._config_.tag === 'el-upload'">
            <el-radio-group v-model="activeData['list-type']" size="default">
              <el-radio-button label="text"></el-radio-button>
              <el-radio-button label="picture"></el-radio-button>
              <el-radio-button label="picture-card"></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="按钮位置" v-if="activeData['controls-position'] !== undefined">
            <el-radio-group v-model="activeData['controls-position']" size="large">
              <el-radio-button label="">默认</el-radio-button>
              <el-radio-button label="right">右侧</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="选项样式" v-if="activeData._config_.optionType !== undefined">
            <el-radio-group v-model="activeData._config_.optionType" size="large">
              <el-radio-button label="">默认</el-radio-button>
              <el-radio-button label="button">按钮</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="显示标签" v-if="activeData._config_.showLabel !== undefined
            && activeData._config_.labelWidth !== undefined
            ">
            <el-switch v-model="activeData._config_.showLabel" />
          </el-form-item>
          <el-form-item label="显示提示" v-if="activeData._config_.tag === 'el-upload'">
            <el-switch v-model="activeData._slot_.tip" />
          </el-form-item>
          <el-form-item label="多选文件" v-if="activeData._config_.tag === 'el-upload'">
            <el-switch v-model="activeData.multiple" />
          </el-form-item>
          <el-form-item label="自动上传" v-if="activeData._config_.tag === 'el-upload'">
            <el-switch v-model="activeData['auto-upload']" />
          </el-form-item>
          <el-form-item label="支持透明度" v-if="activeData._config_.tag === 'el-color-picker'">
            <el-switch v-model="activeData['show-alpha']" @change="updateColorFormat" />
          </el-form-item>
          <el-form-item label="允许半选" v-if="activeData['allow-half'] !== undefined">
            <el-switch v-model="activeData['allow-half']" />
          </el-form-item>
          <el-form-item label="显示分数" v-if="activeData['show-score'] !== undefined">
            <el-switch v-model="activeData['show-score']" />
          </el-form-item>
          <el-form-item label="显示间断点" v-if="activeData['show-stops'] !== undefined">
            <el-switch v-model="activeData['show-stops']" />
          </el-form-item>
          <el-form-item label="范围选择" v-if="activeData.range !== undefined">
            <el-switch v-model="activeData.range" />
          </el-form-item>
          <!-- <el-form-item label="是否带边框" v-if="activeData.border !== undefined">
            <el-switch v-model="activeData.border" />
          </el-form-item> -->
          <el-form-item label="任选层级" v-if="activeData._config_.tag === 'el-cascader'">
            <el-switch v-model="activeData.props.checkStrictly" />
          </el-form-item>
          <el-form-item label="是否多选" v-if="activeData._config_.tag === 'el-cascader'">
            <el-switch v-model="activeData.props.multiple" />
          </el-form-item>
          <el-form-item label="展示全路径" v-if="activeData._config_.tag === 'el-cascader'">
            <el-switch v-model="activeData['show-all-levels']" />
          </el-form-item>
          <el-form-item label="严格步数" v-if="activeData['step-strictly'] !== undefined">
            <el-switch v-model="activeData['step-strictly']" />
          </el-form-item>
          <el-form-item label="输入统计" v-if="activeData['show-word-limit'] !== undefined">
            <el-switch v-model="activeData['show-word-limit']" />
          </el-form-item>
          <el-form-item label="能否清空" v-if="activeData.clearable !== undefined">
            <el-switch v-model="activeData.clearable" />
          </el-form-item>
          <el-form-item label="是否只读" v-if="activeData.readonly !== undefined">
            <el-switch v-model="activeData.readonly" />
          </el-form-item>
          <el-form-item label="是否带边框"
            v-if="activeData.border !== undefined && activeData._config_.optionType !== 'el-radio-button'">
            <el-switch v-model="activeData.border" />
          </el-form-item>
          <el-form-item label="组件尺寸" v-if="activeData.size">
            <el-radio-group v-model="activeData.size" size="large">
              <el-radio-button label="large">中等</el-radio-button>
              <el-radio-button label="default">较小</el-radio-button>
              <el-radio-button label="small">迷你</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否禁用" v-if="activeData.disabled !== undefined">
            <el-switch v-model="activeData.disabled" />
          </el-form-item>
          <el-form-item label="能否搜索" v-if="activeData.filterable !== undefined">
            <el-switch v-model="activeData.filterable" />
          </el-form-item>
          <el-form-item label="是否多选" v-if="activeData._config_.tag === 'el-select'">
            <el-switch v-model="activeData.multiple" @change="multipleChange" />
          </el-form-item>
          <el-form-item label="是否必填" v-if="activeData._config_.required !== undefined">
            <el-switch v-model="activeData._config_.required" />
          </el-form-item>
          <template v-if="activeData._config_.regList !== undefined">
            <el-divider>正则校验</el-divider>
            <div class="reg-item" v-for="(item, index) in activeData._config_.regList" :key="index">
              <el-form-item label="表达式">
                <el-input v-model="item.pattern" />
              </el-form-item>
              <el-form-item label="错误提示">
                <el-input v-model="item.message" />
              </el-form-item>
              <el-icon @click="activeData._config_.regList.splice(index, 1)" class="close-btn">
                <CircleCloseFilled />
              </el-icon>
            </div>
            <el-button text icon="CirclePlus" @click="addReg" class="add-options">
              添加规则
            </el-button>
          </template>
        </el-form>
        <!-- 表单属性 -->
        <el-form v-show="activeName === 'form'" label-width="90px" class="right-form">
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
            <el-radio-group v-model="formConf.labelPosition">
              <el-radio-button label="left">左对齐</el-radio-button>
              <el-radio-button label="right">右对齐</el-radio-button>
              <el-radio-button label="top">顶部对齐</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="标签宽度">
            <el-input type="number" v-model="formConf.labelWidth" :min="1" placeholder="请输入标签宽度" />
          </el-form-item>
          <!-- <el-form-item label="栅格间隔">
            <el-input-number v-model="formConf.gutter" :min="0" placeholder="栅格间隔" />
          </el-form-item> -->
          <el-form-item label="禁用表单">
            <el-switch v-model="formConf.disabled" />
          </el-form-item>
          <el-form-item label="显示未选中组件边框">
            <el-switch v-model="formConf.unFocusedComponentBorder" />
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </div>
    <!-- <icons-dialog v-model="activeData[currentIconModel]"></icons-dialog> -->
    <icons-dialog v-model="iconsVisible" :current="activeData[currentIconModel]" width="60%"
      @select="setIcon"></icons-dialog>
    <TreeNodeDialog v-model="dialogVisible" @commit="addNode"></TreeNodeDialog>
  </div>
</template>
<script setup lang="jsx">
import { defineProps, ref, reactive, defineEmits, computed, nextTick, watch } from 'vue'
import { inputComponents, selectComponents, } from '@/components/generator/config.js'
import IconsDialog from './IconsDialog.vue';
import draggable from "vuedraggable";
import TreeNodeDialog from './TreeNodeDialog.vue';
import { isNumberStr, deepClone } from '@/utils';
import { setFormData } from '@/utils/db'
import dayjs from 'dayjs';
const props = defineProps(['activeData', 'showField', 'formConf'])
const emit = defineEmits(['tag-change'])
const activeName = ref('field')
const iconsVisible = ref(false);
const currentIconModel = ref(null);
const dialogVisible = ref(false);
const currentNode = ref(null);
const dateTimeFormat = {
  'date': 'YYYY-MM-DD',
  'week': 'YYYY 第 ww 周',
  'month': 'YYYY-MM',
  'year': 'YYYY',
  'datetime': 'YYYY-MM-DD HH:mm:ss',
  'daterange': 'YYYY-MM-DD',
  'monthrange': 'YYYY-MM',
  'datetimerange': 'YYYY-MM-DD HH:mm:ss'
}
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
  if (!target) target = selectComponents.find(item => item._config_.tagIcon === value);
  emit('tag-change', target);
}
const setIcon = (icon) => {
  props.activeData[currentIconModel.value] = icon;
}

const isShowMin = computed(() => {
  return ['el-input-number', 'el-slider'].indexOf(props.activeData._config_.tag) > -1
})
const isShowMax = computed(() => {
  return ['el-input-number', 'el-slider', 'el-rate'].indexOf(props.activeData._config_.tag) > -1
})
const isShowStep = computed(() => {
  return ['el-input-number', 'el-slider'].indexOf(props.activeData._config_.tag) > -1
})
const isShowOptions = computed(() => {
  return ['el-select', 'el-radio-group', 'el-checkbox-group'].indexOf(props.activeData._config_.tag) > -1
})
const multipleChange = (state) => {
  props.activeData._config_.defaultValue = state ? [] : '';
}
const addTreeItem = () => {
  dialogVisible.value = true;
  currentNode.value = props.activeData.options;
}
const append = (data) => {
  dialogVisible.value = true;
  currentNode.value = data;
  if (!currentNode.value.children) currentNode.value.children = [];
}
const addNode = (data) => {
  const children = currentNode.value.children || currentNode.value;
  children.push(data);
}
const remove = (node, data) => {
  const parent = node.parent;
  const children = parent.data.children || parent.data;
  const index = children.indexOf(data);
  children.splice(index, 1)
}
const renderContent = (h, { node, data, store }) => {
  return <div class={'custom-tree-node'}>
    <div>{node.label}</div>
    <div>
      <el-icon onClick={e => append(data)} title="添加" style="margin-right:4px"><Plus /></el-icon>
      <el-icon onClick={e => remove(node, data)} title="删除"><Delete /></el-icon>
    </div>
  </div>
}
const setDefaultValue = (val) => {
  if (typeof val === 'boolean') {
    return val + '';
  } else if (Array.isArray(val)) {
    return val.join(',');
  } else if (val instanceof Date) {
    return dayjs(val).format(props.activeData.format)
  }
  return val;
}
const onSwitchValueInput = (val, type) => {
  if (['false', 'true'].includes(val)) {
    props.activeData[type] = JSON.parse(val);
  } else {
    props.activeData[type] = isNumberStr(val) ? +val : val;
  }
}
const onDefaultValueInput = (val) => {
  if (['false', 'true'].includes(val)) {
    props.activeData._config_.defaultValue = JSON.parse(val);
  } else if (Array.isArray(props.activeData._config_.defaultValue)) {
    props.activeData._config_.defaultValue = val.split(',')
  } else {
    if (props.activeData._config_.tag !== 'tinymce') {
      props.activeData._config_.defaultValue = isNumberStr(val) ? +val : val;
    } else {
      props.activeData._config_.defaultValue = val;
    }
  }
}
const setDefaultTime = (h, m, s) => {
  return [new Date(`2023 ${h[0]}:${m[0]}:${s[0]}`), new Date(`2023 ${h[1]}:${m[1]}:${s[1]}`)]
}
const onDefaultTime = (arr) => {
  props.activeData['disabled-hours'] = [arr[0].getHours(), arr[1].getHours()]
  props.activeData['disabled-minutes'] = [arr[0].getMinutes(), arr[1].getMinutes()]
  props.activeData['disabled-seconds'] = [arr[0].getSeconds(), arr[1].getSeconds()]
}
const setTimeValue = (val, type) => {
  const valueFormat = type === 'week' ? 'YYYY-MM-DD' : val;
  props.activeData._config_.defaultValue = '';
  if (props.activeData['is-range'] !== undefined || props.activeData._config_.tag !== 'el-time-picker') props.activeData['value-format'] = valueFormat;
  props.activeData.format = val;
}
const changeFormat = (val) => {
  setTimeValue(dateTimeFormat[val], val);
}
const updateColorFormat = () => {
  props.activeData._config_.defaultValue = null;
  props.activeData._config_.tag = 'div';
  nextTick(() => {
    props.activeData._config_.tag = 'el-color-picker'; //强制刷新
  })
}
const addReg = () => {
  if (props.activeData._config_.tag.includes('input')) {
    props.activeData._config_.regList.push({ pattern: '//', message: '', trigger: 'blur' })
  } else {
    props.activeData._config_.regList.push({ pattern: '//', message: '', trigger: 'change' })
  }

}
watch(() => props.formConf, (val) => {
  setFormData(val);
}, {
  deep: true
})
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

:deep(.custom-tree-node) {
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
}

.add-options {
  color: #409EFF;
}

.options-item {
  display: flex;
  align-items: center;
  font-size: 20px;
  margin-bottom: 4px;

  .el-input {
    margin: 0 3px;
  }
}

.right-scrollbar {
  padding: 12px 18px 15px 15px;
  height: calc(100vh - 42px);
  box-sizing: border-box;
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

.close-btn {
  color: #c6c6c6;
  font-size: 19px;
  cursor: pointer;
  position: absolute;
  right: -6px;
  top: -6px;
}

.reg-item {
  position: relative;
  background-color: #f8f8f8;
  border-radius: 6px;
  padding: 12px 8px 1px 0px;
  margin-right: 4px;
  margin-bottom: 14px;
}
</style>
