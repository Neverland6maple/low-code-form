<template>
  <!-- <div>
    <el-button @click="$emit('update:modelValue', 'Calendar')">123</el-button>
  </div> -->
  <el-dialog :modelValue="$attrs.modelValue" @update:modelValue="$emit('update:modelValue', $event)">
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">This is a custom header!</h4>
        <el-button type="danger" @click="close">
          <el-icon class="el-icon--left">
            <CircleCloseFilled />
          </el-icon>
          Close
        </el-button>
      </div>
    </template>
    This is dialog content.
  </el-dialog>
</template>
<script setup>
import { defineOptions, ref, useAttrs } from 'vue'
defineOptions({ inheritAttrs: false })
const attrs = useAttrs();
console.log(attrs);
</script>
<style scoped lang='scss'></style>
