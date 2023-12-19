<template>
  <!-- <div>
    <el-button @click="$emit('update:modelValue', 'Calendar')">123</el-button>
  </div> -->
  <div>
    <el-dialog :modelValue="$attrs.modelValue" @update:modelValue="$emit('update:modelValue', $event)" align-center
      :width="$attrs.width" @open="onOpen" @close="onClose">
      <template #header>
        <div class="my-header">
          选择图标
          <el-input v-model="key" placeholder="请输入图标名称" prefix-icon="Search" style="width: 260px;" clearable></el-input>
          <el-button @click="clear">取消选择</el-button>
        </div>
      </template>
      <div class="icon-grid">
        <div :class="active === icon ? 'icon-item active-item' : 'icon-item'" @click="onSelect(icon)"
          v-for="icon in iconList" :key="icon">
          <el-icon :size="30" style="height: 50px;">
            <component :is="icon"></component>
          </el-icon>
          <div>{{ icon }}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script setup>
import { defineOptions, ref, useAttrs, defineProps, reactive, h, watch, defineEmits } from 'vue'
import originList from '@/utils/icon.json'
defineOptions({ inheritAttrs: false })
const props = defineProps(['current']);
const emit = defineEmits(['select', 'update:modelValue'])
const attrs = useAttrs();
const active = ref('');
const iconList = ref(originList);
const getNode = (tag) => {
  return h('div');
}
const key = ref('')
const onSelect = (icon) => {
  emit('select', icon);
  emit('update:modelValue', false)
}
watch(key, (val) => {
  iconList.value = originList.filter(item => {
    return item.includes(val);
  })
})
const onOpen = () => {
  active.value = props.current;
  key.value = '';
}
const onClose = () => { }
const clear = () => {
  emit('select', '');
  emit('update:modelValue', false);
}
</script>
<style scoped lang='scss'>
:deep(.el-dialog) {
  border-radius: 8px;
  max-height: 92vh;
  overflow: hidden;
}

:deep(.el-dialog__body) {
  padding: 0 20px 20px 20px;
  overflow: auto;
  height: calc(92vh - 62px)
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  align-items: center;
}

.icon-item {
  height: 87px;
  padding: 15px 6px 6px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }

  &.active-item {
    background-color: #e1f3fb;
    color: #7a6df0;
  }
}
</style>
