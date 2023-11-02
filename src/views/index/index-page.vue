<script setup>
import { PAGE_NAME } from '@/assets/constant'

const router = useRouter()
const menuMap = [
  {
    title: '发布笔记',
    color: '#e2e9fd',
    func: 'push',
  },
  {
    title: '标签管理',
    color: '#d2f6f4',
    func: 'label',
  },
  {
    title: '文章管理',
    color: '#fdf4e0',
    func: 'article',
  },
  {
    title: '功能区域',
    color: '#fae3e5',
    func: '',
  },
]

// 菜单选择
function onFunc(item) {
  switch (item.func) {
    case 'label':
      router.push({ name: PAGE_NAME.LabelPage })
      break
    case 'push':
      router.push({ name: PAGE_NAME.PublishPage })
      break
    case 'article':
      router.push({ name: PAGE_NAME.ArticleManage })
  }
}
</script>

<template>
  <div class="container">
    <div
      v-for="(item,index) in menuMap"
      :key="index"
      class="menu"
      :style="{background: item.color}"
      @click="onFunc(item)"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .menu {
    margin: 0 20px 20px 0;
    position: relative;
    padding: 20px;
    flex: 1;
    display: flex;
    align-items: center;
    max-width: 352px;
    min-width: 300px;
    height: 140px;
    font-weight: 500;
    color: #212121;
    border-radius: var(--radius);
    overflow: hidden;
    cursor: pointer;

    &::before {
      position: absolute;
      right: -50%;
      content: '';
      width: 100%;
      height: 100%;
      display: block;
      background: #fff;
      transform: rotateZ(-70deg);
    }
  }
}
</style>
