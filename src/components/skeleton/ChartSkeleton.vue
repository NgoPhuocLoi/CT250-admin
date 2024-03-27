<script setup>
import Skeleton from 'primevue/skeleton';
</script>
<template>
    <div class="flex items-center justify-center h-full">
        <Skeleton shape="circle" size="3rem" class="mr-2"></Skeleton>
        <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
        <Skeleton shape="circle" size="5rem" class="mr-2"></Skeleton>
        <Skeleton shape="circle" size="6rem"></Skeleton>
    </div>
</template>
