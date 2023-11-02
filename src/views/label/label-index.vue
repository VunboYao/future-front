<script setup>
import { useLabel } from '@/views/label/useLabel'
const { label, tagList, createLabel, searchLabels } = await useLabel()
</script>

<template>
  <div class="x">
    <div class="wrap">
      <header>
        <span class="label">标签查询/新增</span>
        <el-input
          v-model="label"
          placeholder="请输入标签名称"
          size="large"
          clearable
          @keyup.enter="searchLabels"
        >
          <template #prepend>
            <el-button @click="createLabel">
              <el-icon><Edit /></el-icon> 创建
            </el-button>
          </template>
          <template #append>
            <el-button @click="searchLabels">
              <el-icon><Search /></el-icon> 查询
            </el-button>
          </template>
        </el-input>
      </header>
      <el-tag
        v-for="tag in tagList"
        :key="tag.id"
        :type="tag.type"
        effect="dark"
        size="large"
      >
        {{ tag.name }}
      </el-tag>
      <el-empty
        v-if="tagList.length === 0"
        description="暂无数据"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrap {
  min-height: 335px;
}
:deep(.el-tag) {
  margin: 20px;
}

header {
  padding-left: 20px;
  display: flex;
  align-items: center;
  width: 600px;

  .label {
    width: 9em;
    color: #7292f7;
  }
}
</style>
