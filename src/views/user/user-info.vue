<script setup>
import { uploadAvatar } from '@/api/file'
import { useUserInfo } from '@/stores/useUserInfo'

const imageUrl = ref('')
const avatar = ref()
const { saveUserInfo } = useUserInfo()

// 监听选择头像
function onChange(file) {
  avatar.value = file.raw
  imageUrl.value = URL.createObjectURL(file.raw)
}

// 上传操作
async function onUpload() {
  const formData = new FormData()
  formData.append('avatar', avatar.value)

  const res = await uploadAvatar(formData)
  saveUserInfo({
    avatar_url: res,
  })
  imageUrl.value = ''
  location.reload()
}
</script>

<template>
  <div class="x">
    <el-upload
      class="avatar-uploader"
      :auto-upload="false"
      :show-file-list="false"
      :on-change="onChange"
    >
      <img
        v-if="imageUrl"
        :src="imageUrl"
        class="avatar"
      >
      <el-icon v-else class="avatar-uploader-icon">
        <Plus />
      </el-icon>
    </el-upload>
    <el-button
      type="primary"
      class="ml10"
      size="large"
      :disabled="!avatar"
      @click="onUpload"
    >
      修改头像
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
.x {
  display: flex;
  align-items: center;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
