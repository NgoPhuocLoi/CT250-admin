<script setup>
const props = defineProps(["title", "statusComponent"]);
</script>
<template>
  <div class="bg-white border border-[#ccc] rounded">
    <div class="p-4">
      <div class="text-black text-[20px] font-bold mb-8">
        <div>{{ title }}</div>
      </div>
      <div class="text-black">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
