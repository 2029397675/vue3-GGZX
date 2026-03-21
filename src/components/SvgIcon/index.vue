<template>
  <svg :style="{ width, height }" class="svg-icon">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({
  name: { type: String, default: 'test' },
  width: { type: String, default: '100px' },
  height: { type: String, default: '100px' },
  color: {
    type: String,
    default: ''
  }
})

const symbolId = `#icon-${props.name}`
</script>

<style lang="scss" scoped></style>
