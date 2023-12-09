import { PAGE_NAME } from '@/assets/constant'
import { useUserInfo } from '@/stores/useUserInfo'

export const useAppLayout = async function() {
  const router = useRouter()
  const { getUserInfo } = useUserInfo()

  // 用户头像地址
  const avatarUrl = getUserInfo.avatar_url
  const menuMap = [
    { title: '管理中心', code: 'center', icon: 'ChromeFilled' },
    { title: '发布笔记', code: 'publish', icon: 'Operation' },
    { title: '标签管理', code: 'label', icon: 'CollectionTag' },
    { title: '编辑资料', code: 'user', icon: 'Avatar' },
  ]

  // 菜单导航
  function onMenu(item) {
    switch (item.code) {
      case 'center':
        router.push({ name: PAGE_NAME.IndexPage })
        break
      case 'label':
        router.push({ name: PAGE_NAME.LabelPage })
        break
      case 'user':
        router.push({ name: PAGE_NAME.UserInfo })
        break
      case 'publish':
        router.push({ name: PAGE_NAME.PublishPage })
        break
    }
  }

  // 退出登录
  function onQuit() {
    localStorage.clear()
    router.replace({ name: PAGE_NAME.LoginPage })
  }

  return {
    avatarUrl,
    menuMap,
    getUserInfo,
    onMenu,
    onQuit,
  }
}
