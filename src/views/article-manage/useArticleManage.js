import { ElMessageBox } from 'element-plus'
import { postArticleDelete, postArticleDetail, postArticleList } from '@/api/article'
import { postLabelList } from '@/api/label'

export const useArticleManage = async() => {
  // 表单查询的数据
  const form = reactive({
    title: '',
    label: '',
    date: [],
  })
  // label选项
  const labelOptions = ref([])
  // 分页器配置
  const pagination = ref({
    page: 1,
    limit: 10,
    total: 0,
  })
  // 表格数据
  const tableData = ref([])
  // 表格配置
  const propsList = reactive([
    { prop: 'poster', label: '封面' },
    { prop: 'title', label: '标题' },
    { prop: 'description', label: '描述' },
    { prop: 'label', label: '类别' },
    { prop: 'create_at', label: '发布时间' },
    { prop: 'user', label: '作者' },
    { prop: 'avatar', label: '头像' },
    { prop: 'operation', label: '操作' },
  ])
  // 显示详情
  const showDetail = ref(false)
  // 详情列表
  const detailList = ref([])

  // 监听分页配置改动，获取文章列表数据
  watch(pagination, () => {
    getArticleList()
  })

  getArticleList()
  getLabelOptions()

  // 查询
  function onSearch() {
    getArticleList()
  }

  // 文章详情
  async function onDetail(row) {
    const res = await postArticleDetail({ article_id: row.id })
    detailList.value = res.list || []
    showDetail.value = true
  }

  // 重置
  function onReset() {
    form.title = ''
    form.label = ''
    form.date = []
    onSearch()
  }

  async function onDelete(row) {
    ElMessageBox.confirm('删除无法恢复， 是否确认删除', '提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
    }).then(async() => {
      await postArticleDelete({ id: row.id })
      onSearch()
    }).catch(() => {
      console.log('取消')
    })
  }

  // get the label select data
  function getLabelOptions() {
    postLabelList().then((res) => {
      labelOptions.value = res.list.map(item => ({ name: item.name, id: item.id }))
    })
  }

  // 获取文章列表
  async function getArticleList() {
    const params = {
      ...pagination.value,
      ...form,
    }

    const res = await postArticleList(params)
    tableData.value = res.list
    pagination.value.total = res.total
  }

  return {
    form,
    pagination,
    tableData,
    propsList,
    labelOptions,
    showDetail,
    detailList,
    onSearch,
    onReset,
    onDetail,
    onDelete,
  }
}
