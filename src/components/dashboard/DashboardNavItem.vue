<template>
    <div
        :class="` ${item.title === 'Doanh thu' ? 'bg-[#0174bcd9]' : 'bg-[#1294e585]'} cursor-pointer rounded-lg p-4 h-full w-full flex justify-between items-center`">
        <div class="flex flex-col gap-3 uppercase text-bold text-white">
            <div class="text-xl">{{ item.title }}</div>
            <div class="text-4xl">{{ item.value }}</div>
        </div>
        <div class="w-[100px] h-[100px]">
            <component :is="item.icon" />
        </div>
    </div>
</template>

<script setup>
const props = defineProps(["item"]);
</script>