<script setup>
import { useArticleManage } from '@/views/article-manage/useArticleManage'

const {
  form,
  tableData,
  pagination,
  propsList,
  labelOptions,
  showDetail,
  detailList,
  onReset, onSearch, onDetail, onDelete,
} = await useArticleManage()
</script>

<template>
  <div class="x">
    <header>
      <el-form
        :model="form"
        inline
        label-width="100px"
        size="large"
      >
        <el-form-item label="文章标题">
          <el-input
            v-model="form.title"
            clearable
            @keyup.enter="onSearch"
          />
        </el-form-item>
        <el-form-item label="文章类别">
          <el-select
            v-model="form.label"
            clearable
            filterable
            placeholder="请选择"
            @keyup.enter="onSearch"
          >
            <el-option
              v-for="item in labelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="时间范围">
          <el-date-picker
            v-model="form.date"
            type="daterange"
            range-separator="To"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="YYYY/MM/DD"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSearch"
          >
            搜索
          </el-button>
          <el-button @click="onReset">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </header>

    <main>
      <table-pagination
        v-model:pagination="pagination"
        :props-list="propsList"
        :list-data="tableData"
      >
        <template #poster="{row}">
          <img
            class="poster"
            :src="row.poster"
            alt="poster"
          >
        </template>
        <template #label="{row}">
          <el-tag
            v-for="item in row.label"
            :key="item.id"
            class="ml10 mb10"
          >
            {{ item.name }}
          </el-tag>
        </template>
        <template #avatar="{row}">
          <el-avatar :size="50" :src="row.avatar">
            <!--回退处理-->
            <img
              src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
            >
          </el-avatar>
        </template>
        <template #operation="{row}">
          <el-button
            link
            type="primary"
            @click="onDetail(row)"
          >
            详情
          </el-button>
          <el-button
            link
            type="primary"
            @click="onDelete(row)"
          >
            删除
          </el-button>
        </template>
      </table-pagination>
    </main>

    <!--图片详情列表-->
    <ModalLayout v-model:show="showDetail" title="文章详情">
      <el-image
        v-for="(item, index) in detailList"
        :key="index"
        style="width: 100px; height: 100px"
        :src="item"
        :infinite="false"
        :zoom-rate="1.2"
        :preview-src-list="detailList"
        :initial-index="index"
        fit="cover"
      />
    </ModalLayout>
  </div>
</template>

<style scoped lang="scss">
.x {
  :deep(.el-input) {
    width: 220px;
  }

  .poster {
    width: 120px;
  }
}

.el-image {
  width: 146px!important;
  height: 166px!important;
  border: 1px solid #999;
  padding: 5px;
  border-radius: 10px;
  overflow: hidden;
  margin: 0 8px 8px 0;

  &:hover {
    box-shadow: 0 0 2px 2px #409eff;
  }
}
</style>
