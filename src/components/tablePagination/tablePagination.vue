<script setup>
const props = defineProps({
  // 标题
  title: {
    type: String,
    default: '',
  },
  // 表格数据
  listData: {
    type: Array,
    required: true,
  },
  // 选择框
  showSelection: {
    type: Boolean,
    default: false,
  },
  // 索引
  showIndex: {
    type: Boolean,
    default: false,
  },
  // 表格列配置
  propsList: {
    type: Array,
    required: true,
  },
  // 分页器配置
  pagination: {
    type: Object,
    default: () => ({
      page: 1,
      limit: 10,
      total: 0,
    }),
  },
})

const emit = defineEmits(['update:pagination'])

// 每页显示的数量变化
function onSizeChange(number) {
  emit('update:pagination', {
    ...props.pagination,
    limit: number,
  })
}

// 当前页变化
function onCurrentChange(number) {
  emit('update:pagination', {
    ...props.pagination,
    page: number,
  })
}
</script>

<template>
  <div class="table">
    <el-table
      v-bind="$attrs"
      :data="listData"
      border
    >
      <!--多选框-->
      <el-table-column
        v-if="showSelection"
        align="center"
        type="selection"
      />
      <!--排序-->
      <el-table-column
        v-if="showIndex"
        type="index"
        width="60px"
        align="center"
        label="序号"
      />
      <!--插槽内容注入-->
      <template v-for="item in propsList" :key="item.prop">
        <el-table-column
          show-overflow-tooltip
          v-bind="item"
          align="center"
        >
          <template #default="{row}">
            <!--默认插槽中，根据表格prop注入具名插槽。同时展示默认数据-->
            <slot :name="item.prop" :row="row">
              {{ row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <!--分页器：total大于0时展示-->
    <div v-if="pagination.total > 0" class="footer">
      <el-pagination
        :current-page="pagination.page"
        :page-size="pagination.limit"
        :page-sizes="[10, 20, 50]"
        layout="total, prev, pager, next, sizes"
        :total="pagination.total"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>

.table {
  padding: 20px;
  overflow: hidden;
  background-color: #fff;
}
.header {
  height: 40px;
  align-items: center;
  justify-content: space-between;
  display: flex;
}
.title {
  font-size: 18px;
  font-weight: 600;
}
.footer {
  display: flex;
  flex-direction: row-reverse;
  margin-top: 20px;
}
</style>
