<template>
  <!-- <tinymce v-model="content" @change="handleChange" width="100%"></tinymce> -->
  <div>123</div>
</template>
<script setup>
import tinymce from '@/components/tinymce/MyTinymce.vue'
import { ref } from 'vue'
let content = ref('')
function handleChange(item) {
  console.log('change', item)
}

</script>
