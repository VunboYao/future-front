import { postCreateLabel, postLabelList } from '@/api/label'

export const useLabel = async() => {
  const label = ref(null)
  const types = ['', 'success', 'info', 'danger', 'warning']
  const tagList = ref([])

  searchLabels()

  // 创建标签
  async function createLabel() {
    await postCreateLabel({ label: label.value })
    label.value = ''
    await searchLabels()
  }

  // 搜索label数据
  async function searchLabels() {
    tagList.value = []
    const { list } = await postLabelList({ label: label.value })
    list.forEach((item, index) => {
      tagList.value.push({
        name: item.name,
        id: item.id,
        type: types[index % types.length],
      })
    })
  }

  return {
    label,
    tagList,
    createLabel,
    searchLabels,
  }
}
