import { defineStore } from 'pinia'
import { local } from '@/utils/common'
import { LOCAL_KEY } from '@/assets/constant'

// 用户信息存储
export const useUserInfo = defineStore('user', () => {
  const userInfo = reactive({
    name: '',
    id: '',
    avatar_url: '',
  })

  // 获取用户信息
  const getUserInfo = computed(() => {
    if (!userInfo.name) {
      const localData = local.get(LOCAL_KEY.USER_INFO)
      userInfo.name = localData.name
      userInfo.id = localData.id
      userInfo.avatar_url = localData.avatar_url
    }
    return userInfo
  })

  // 保存用户信息
  function saveUserInfo(user) {
    userInfo.name = user.name || userInfo.name
    userInfo.id = user.id || userInfo.id
    userInfo.avatar_url = user.avatar_url || userInfo.avatar_url
    local.set(LOCAL_KEY.USER_INFO, userInfo)
  }

  return {
    saveUserInfo,
    getUserInfo,
  }
})
