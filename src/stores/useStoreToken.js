import { defineStore } from 'pinia'
import { LOCAL_KEY } from '@/assets/constant'
import { local } from '@/utils/common'

/**
 * token 管理
 */
export const useStoreToken = defineStore('token', () => {
  const token = ref(null)

  const getToken = computed(() => {
    return token.value || local.get(LOCAL_KEY.TOKEN)
  })

  function saveToken(data) {
    token.value = data
    local.set(LOCAL_KEY.TOKEN, data)
  }

  return {
    getToken,
    saveToken,
  }
})
