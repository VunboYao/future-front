import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
import { PAGE_NAME } from '@/assets/constant'
import { useStoreToken } from '@/stores/useStoreToken'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: PAGE_NAME.LoginPage,
      component: () => import('@/views/login/login-main.vue'),
    },
    {
      path: '/admin',
      component: () => import('@/components/Layout/AppLayout.vue'),
      redirect: '/admin/index',
      children: [
        {
          path: 'index',
          name: PAGE_NAME.IndexPage,
          component: () => import('@/views/index/index-page.vue'),
          meta: {
            title: '管理中心',
          },
        },
        {
          path: 'label',
          name: PAGE_NAME.LabelPage,
          component: () => import('@/views/label/label-index.vue'),
          meta: {
            title: '标签管理',
          },
        },
        {
          path: 'publish',
          name: PAGE_NAME.PublishPage,
          component: () => import('@/views/publish/publish-page.vue'),
          meta: {
            title: '发布文章',
          },
        },
        {
          path: 'article-manage',
          name: PAGE_NAME.ArticleManage,
          component: () => import('@/views/article-manage/article-manage.vue'),
          meta: {
            title: '文章管理',
          },
        },
        {
          path: 'user-info',
          name: PAGE_NAME.UserInfo,
          component: () => import('@/views/user/user-info.vue'),
          meta: {
            title: '用户信息',
          },
        },
      ],
    },
  ],
})

router.beforeEach((to) => {
  const { getToken } = useStoreToken()

  if (to.name !== PAGE_NAME.LoginPage && !getToken) {
    ElMessage.error('token丢失，请重新登录～')
    return { name: PAGE_NAME.LoginPage }
  }
})

export default router
