<script setup>
import { useDashboardStore } from "@/stores";
const dashboardStore = useDashboardStore();
</script>

<template>
    <div @click="dashboardStore.subjectIndex = 1 - dashboardStore.subjectIndex" class="relative">
        <div class="button-cover">
            <div class="button r" id="button-1">
                <input type="checkbox" class="checkbox" />
                <div class="knobs"></div>
                <div class="layer"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.button-cover {
    height: 100px;
    background-color: #fff;
    box-shadow: 0 10px 20px -8px #c5d6d6;
    border-radius: 4px;
}

.button-cover:before {
    counter-increment: button-counter;
    content: counter(button-counter);
    position: absolute;
    right: 0;
    bottom: 0;
    color: #d7e3e3;
    font-size: 12px;
    line-height: 1;
    padding: 5px;
}

.button-cover,
.knobs,
.layer {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

.button {
    position: relative;
    width: 180px;
    height: 50px;
    overflow: hidden;
}

.button.r,
.button.r .layer {
    border-radius: 100px;
}

.button.b2 {
    border-radius: 2px;
}

.checkbox {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 3;
}

.knobs {
    z-index: 2;
}

.layer {
    width: 100%;
    background-color: #FDFFAB;
    transition: 0.3s ease all;
    z-index: 1;
}

#button-1 .knobs:before {
    content: "DOANH THU";
    align-items: center;
    display: flex;
    justify-content: center;
    position: absolute;
    top: 1px;
    left: 1px;
    width: 90px;
    height: 49px;
    color: #fff;
    font-size: 10px;
    font-weight: bold;
    text-align: center;
    line-height: 1;
    padding: 9px 4px;
    background-color: #FFB534;
    border-radius: 100px;
    transition: 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15) all;
}

#button-1 .checkbox:checked+.knobs:before {
    content: "SẢN PHẨM";
    left: 90px;
    background-color: #FF8F8F;
}

#button-1 .checkbox:checked~.layer {
    background-color: #fcebeb;
}

#button-1 .knobs,
#button-1 .knobs:before,
#button-1 .layer {
    transition: 0.3s ease all;
}
</style>