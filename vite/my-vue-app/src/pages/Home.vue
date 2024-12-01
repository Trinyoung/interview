<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>
          <div>
            <img :src="logo" alt="" width="200px;">
          </div>
        </el-header>
        <el-main>
          <el-form v-model="form">
            <el-form-item label="姓名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input-number v-model="form.age"></el-input-number>
            </el-form-item>
          </el-form>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import logo from '@/assets/vue.svg'

import { reactive } from 'vue';

  const form = reactive({
    name: '',
    age: undefined
  })
</script>