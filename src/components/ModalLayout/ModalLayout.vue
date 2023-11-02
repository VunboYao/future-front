<script setup>
const props = defineProps({
  show: Boolean,
})

const emit = defineEmits(['update:show'])

// dialog展示，通过计算属性控制
const showDialog = computed({
  get() {
    return props.show
  },
  set() {
  },
})

// 监听关闭
function onClose() {
  emit('update:show', false)
}
</script>

<template>
  <el-dialog
    v-model="showDialog"
    center
    top="5vh"
    v-bind="$attrs"
    :append-to-body="true"
    :before-close="onClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <slot />
    <template #footer>
      <slot name="footer" />
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>
