import { postLogin } from '@/api/user'
import { LOCAL_KEY, PAGE_NAME } from '@/assets/constant'
import { useStoreToken } from '@/stores/useStoreToken'
import { useUserInfo } from '@/stores/useUserInfo'
import { local } from '@/utils/common'

// 页面基础逻辑
export const useLogin = async() => {
  const router = useRouter()
  const { saveToken } = useStoreToken()
  const { saveUserInfo } = useUserInfo()

  const name = ref('')
  const password = ref('')
  const isCanLogin = computed(() => !!name.value && !!password.value)
  // 是否记住用户信息
  const isRememberUser = ref(true)

  // 从缓存中加载用户信息
  onMounted(() => {
    const userInfo = local.get(LOCAL_KEY.USER_LOGIN)
    if (userInfo) {
      name.value = userInfo.name
      password.value = userInfo.password
    }
  })

  // 登录操作
  async function onLogin() {
    const params = {
      name: name.value,
      password: password.value,
    }
    const res = await postLogin(params)
    // 记住用户信息
    if (isRememberUser.value) {
      local.set(LOCAL_KEY.USER_LOGIN, params)
    }

    // 保存token
    saveToken(res.token)

    // 保存用户信息
    saveUserInfo({
      name: res.name,
      id: res.id,
    })

    // 前往主页
    await router.push({ name: PAGE_NAME.IndexPage })
  }

  return {
    name,
    password,
    isCanLogin,
    isRememberUser,
    onLogin,
  }
}
