<template>
  <div :class="dark ? 'contanier dark-theme' : 'contanier light-theme'" v-loading="asking">
    <div class="left-board">
      <el-switch v-model="dark" active-color="#000" inactive-color="#aaa" inline-prompt active-text="dark"
        inactive-text="light" />
      <div class="user-profile">
        <div class="user-block">
          <el-avatar :size="80" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
        </div>
        <div class="user-name">Neverland6Maple</div>
        <div class="repository-button"><el-button>个人仓库</el-button></div>
      </div>
      <div class="action-block">

        <div style="padding: 10px 0;">搜索表单；</div>
        <el-input v-model="input1" placeholder="Search repository">
          <template #append>
            <el-button :icon="Search" />
          </template>
        </el-input>
      </div>
    </div>

    <div class="right-board">
      <el-scrollbar>
        <div class="result-tabs">
          <h2>repository results</h2>
          <el-dropdown class="sort-button">
            <el-button type="primary">
              Sort:
              <span class="sort-button-main">
                Best match
              </span>
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Action 1</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
                <el-dropdown-item>Action 4</el-dropdown-item>
                <el-dropdown-item>Action 5</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="result-list" v-loading="loading">
          <div class="result-item" v-for="item in resultArr" :key="item.fid">
            <h3 class="result-title" @click="getDetail(item.fid)">{{ item.author }} / {{ item.title }}</h3>
            <div class="result-intro">{{ item.intro }}</div>
            <div class="result-tag">
              <span class="tag-item" v-for="(tag, index) in item.tags" :key="index">{{ tag }}</span>
            </div>
            <div class="result-others">
              <div class="result-liked">
                <el-icon :size="14">
                  <Star />
                </el-icon>
                {{ item.liked }}
              </div>
              <div class="result-update">
                {{ item.date }}
              </div>
            </div>
          </div>
        </div>
        <div class="result-pagination"> <el-pagination background layout="prev, pager, next" :current-page="currentPage"
            @update:current-page="pageChange" :default-page-size="5" :total="50" /></div>
      </el-scrollbar>
    </div>
    <FormDrawer :generateConf="generateConf" v-model="drawerVisible" size="100%" :detail-obj="detailObj"></FormDrawer>
  </div>
</template>
<script setup>
import { ArrowDown, Search, Star } from '@element-plus/icons-vue'
import FormDrawer from './FormDrawer.vue';
import { ref } from 'vue';
import axios from 'axios';
const dark = ref(false);
const loading = ref(false);
const asking = ref(false);
const detailObj = ref({});
const drawerVisible = ref(false);
const resultArr = ref([]);
const currentPage = ref(1);
const generateConf = { type: 'file', fileName: undefined, };
const getDetail = (fid) => {
  asking.value = true;
  axios.get(`/api/form?fid=${fid}`)
    .then(response => {
      detailObj.value = response.data.data
      drawerVisible.value = true;
    })
    .catch(error => {
      console.log(error);
    }).finally(_ => {
      asking.value = false;
    })
}
const pageChange = (page) => {
  currentPage.value = page;
  getResult();
}
const getResult = () => {
  loading.value = true;
  axios.get('/api/search')
    .then(response => {
      resultArr.value = response.data.data
    })
    .catch(error => {
      console.log(error);
    }).finally(_ => {
      loading.value = false;
    })
}
getResult();
</script>
<style scoped lang='scss'>
@import '@/styles/square.scss';
</style>
