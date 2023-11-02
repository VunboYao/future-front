<script setup>
</script>

<template>
  <Suspense>
    <RouterView />
    <template #fallback>
      Loading....
    </template>
  </Suspense>
</template>

<style scoped>

</style>
