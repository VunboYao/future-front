<script setup>
import { useAppLayout } from '@/components/Layout/useAppLayout'
const route = useRoute()
const {
  avatarUrl,
  menuMap,
  getUserInfo,
  onMenu,
  onQuit,
} = await useAppLayout()
</script>

<template>
  <div class="container-body">
    <header>
      <div class="left">
        <div class="logo">
          文化人
        </div>
        <div class="menu">
          <el-button
            v-for="(item, index) in menuMap"
            :key="index"
            text
            type="info"
            :icon="item.icon"
            @click="onMenu(item)"
          >
            {{ item.title }}
          </el-button>
        </div>
      </div>
      <div class="right">
        <el-dropdown>
          <el-button
            type="info"
            text
            size="large"
          >
            <!--头像展示-->
            <el-avatar
              shape="square"
              :size="38"
              :src="avatarUrl"
            >
              <!--回退处理-->
              <img
                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
              >
            </el-avatar>
            <span class="ml10">{{ getUserInfo.name }}</span>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="onQuit">
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </header>
    <main>
      <span class="title">{{ route.meta.title || '' }}</span>
      <router-view />
    </main>
  </div>
</template>

<style scoped lang="scss">
.container-body {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background: #EEF0F8 url('@/assets/img/bg.png') no-repeat center top;
  background-size: 100% 350px;

  header {
    padding: 20px var(--layoutPadding);
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255,255,255,.1);

    .logo {
      //color: #fafafa;
      color: #0e2333;
      white-space: nowrap;
      letter-spacing: 0;
      font-size: 1.5em;
      text-shadow: 0 1px 0 #999, 0 2px 0 #888, 0 3px 0 #777, 0 4px 0 #666, 0 5px 0 #555, 0 6px 0 #444, 0 7px 0 #333, 0 8px 7px #001135;
    }

    .left {
      display: flex;
      align-items: center;

      .menu {
        margin-left: 20px;
      }
    }

    .right {
      display: flex;
      align-items: center;
    }
  }

  main {
    padding: 20px var(--layoutPadding);
    flex: 1;

    .title {
      display: block;
      font-size: 20px;
      padding-bottom: 20px;
    }
  }
}
</style>
