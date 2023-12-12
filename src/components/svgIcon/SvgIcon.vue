<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script setup>
import { computed, defineProps } from 'vue';

const props = defineProps(['iconClass']);
const iconName = computed(() => {
  return `#icon-${props.iconClass}`
})
</script>
<style scoped lang='scss'></style>
