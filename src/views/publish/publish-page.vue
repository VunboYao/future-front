<!--
* @file: 发布笔记
* @author: VunboYao
* time: 2023-09-25 09:26:38

-->
<script setup>
import { usePublish } from '@/views/publish/usePublish'
const {
  title,
  desc,
  labels,
  labelOptions,
  fileList,
  dialogVisible,
  dialogImageUrl,
  isCanPublish,
  upload,
  handleRemove,
  handlePictureCardPreview,
} = await usePublish()
</script>

<template>
  <div class="x">
    <!--图片上传-->
    <div class="wrap">
      <el-upload
        v-model:file-list="fileList"
        class="upload-demo"
        :auto-upload="false"
        :drag="!fileList.length"
        multiple
        :limit="20"
        :list-type="fileList.length ? 'picture-card':'text'"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <template v-if="!fileList.length">
          <el-icon class="el-icon--upload">
            <upload-filled />
          </el-icon>
          <div class="el-upload__text">
            拖拽图片到此或点击上传
          </div>
          <div class="tips">
            （最多支持上传20张）
          </div>
          <el-button
            type="primary"
            class="mt20"
          >
            上传图片
          </el-button>
        </template>
        <el-icon v-else>
          <Plus />
        </el-icon>
      </el-upload>
    </div>
    <!--图片预览-->
    <el-dialog v-model="dialogVisible">
      <img
        w-full
        :src="dialogImageUrl"
        alt="Preview Image"
      >
    </el-dialog>

    <!--标题-->
    <el-input
      v-model="title"
      class="mt10"
      placeholder="填写标题，可能会有更多赞哦～"
      size="large"
      show-word-limit
      maxlength="20"
      clearable
    />
    <!--描述-->
    <el-input
      v-model="desc"
      class="mt10"
      size="large"
      maxlength="30"
      placeholder="填写更全面的描述信息，让更多的人看到你吧！"
      show-word-limit
      type="textarea"
    />
    <!--标签-->
    <div class="label">
      <el-select
        v-model="labels"
        size="large"
        multiple
        filterable
        clearable
        placeholder="给文章设置类别，用户更容易查阅哦！"
        style="min-width: 360px"
      >
        <el-option
          v-for="item in labelOptions"
          :key="item.id"
          :value="item.id"
          :label="item.name"
        />
      </el-select>
    </div>
    <el-button
      type="danger"
      class="mt20"
      size="large"
      :disabled="!isCanPublish"
      @click="upload"
    >
      立即发布 <el-icon><Position /></el-icon>
    </el-button>
  </div>
</template>

<style scoped lang="scss">
.x {
  color: #333;

  .tips {
    margin-top: 10px;
    font-size: 12px;
    color: #999;
  }

  .label {
    padding: 10px 0;
    display: flex;
    align-items: center;
    color: #333;
  }
}
</style>
