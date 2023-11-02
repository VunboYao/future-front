import { defineStore } from 'pinia'
import { local } from '@/utils/common'
import { LOCAL_KEY } from '@/assets/constant'

// 用户信息存储
export const useUserInfo = defineStore('user', () => {
  const userInfo = reactive({
    name: '',
    id: '',
  })

  // 获取用户信息
  const getUserInfo = computed(() => {
    if (!userInfo.name) {
      const localData = local.get(LOCAL_KEY.USER_INFO)
      userInfo.name = localData.name
      userInfo.id = localData.id
    }
    return userInfo
  })

  // 保存用户信息
  function saveUserInfo(user) {
    userInfo.name = user.name
    userInfo.id = user.id
    local.set(LOCAL_KEY.USER_INFO, userInfo)
  }

  return {
    saveUserInfo,
    getUserInfo,
  }
})
