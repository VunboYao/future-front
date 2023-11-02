import { uploadList } from '@/api/file'
import { postLabelList } from '@/api/label'
import { PAGE_NAME } from '@/assets/constant'

export const usePublish = async() => {
  const router = useRouter()
  // 文件列表
  const fileList = ref([])
  // 预览框
  const dialogVisible = ref(false)
  // 预览图片地址
  const dialogImageUrl = ref('')
  // 文章标题
  const title = ref('')
  // 描述
  const desc = ref('')
  // 标签
  const labels = ref([])
  // 标签选项
  const labelOptions = ref([])

  getLabelOptions()

  // 可发布
  const isCanPublish = computed(() => {
    return title.value && fileList.value.length && labels.value.length
  })

  // 移除图片
  function handleRemove(uploadFile, uploadFiles) {
    console.log(uploadFile, uploadFiles)
  }

  // 预览图片
  function handlePictureCardPreview(uploadFile) {
    dialogImageUrl.value = uploadFile.url
    dialogVisible.value = true
  }

  // 获取标签选项
  function getLabelOptions() {
    postLabelList().then((res) => {
      labelOptions.value = res.list.map(({ id, name }) => ({ id, name: `${name} (${id})` }))
    })
  }

  // 上传
  async function upload() {
    const formData = new FormData()
    for (const file of fileList.value) {
      formData.append('list', file.raw)
    }

    formData.append('title', title.value)
    formData.append('desc', desc.value)
    formData.append('labels', JSON.stringify(labels.value))

    await uploadList(formData)

    // 成功发布后，前往列表管理界面
    router.push({ name: PAGE_NAME.ArticleManage })
  }

  return {
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
  }
}
