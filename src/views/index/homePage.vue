<template>
  <div class="contanier">
    <div class="left-board">
      <el-scrollbar>
        <div class="component-list">
          <div v-for="(item) in leftComponents" :key="item.title">
            <div class="component-title">
              {{ item.title }}
            </div>
            <draggable :list="item.list" draggable=".component-item" :sort="false"
              :group="{ name: 'componentsGroup', pull: 'clone', put: false }" item-key="left-components">
              <template #item="{ element }">
                <div class="component-item">
                  <div class="component-body">
                    {{ element._config_.label }}
                  </div>
                </div>
              </template>
            </draggable>

          </div>
        </div>

      </el-scrollbar>
    </div>
    <div class="center-board">
      {{ drawingList }}
      <el-button>default</el-button>
      <!-- <el-input /> -->
      <draggable :list="drawingList" :sort="false" group="componentsGroup" style="min-height: 50px;"
        item-key="center-components">
        <template #item="{ element }">
          <draggable-item :conf="element" />
        </template>
      </draggable>
    </div>
    <div class="right-board">
      3
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import draggable from "vuedraggable";
import DraggableItem from './DraggableItem'
import { inputComponents } from '@/components/generator/config.js'

const leftComponents = reactive([{
  title: '输入型组件',
  list: inputComponents
}])

const arr = reactive([{ level: 1, context: 'fuck you' },
{ level: 2, context: 'you' },
{ level: 3, context: 'damn!' }]);
const drawingList = reactive([]);
const onSubmit = () => {
  console.log('submit!')
}
</script>
<style scoped lang='scss'>
@import url('@/styles/home.scss');
</style>
