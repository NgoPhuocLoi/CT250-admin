<script setup>
import { ref } from "vue";
</script>

<template>
    <div class="w-full">
        <div class="grid grid-cols-3 gap-3">
            <div
                class="col-span-2 flex flex-col flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 rounded-md border-none bg-white shadow-lg outline-none">
                <h5 class="text-xl font-medium leading-normal text-neutral-800 text-center w-full">
                    Thông tin chung
                </h5>
                <div class="grid grid-cols-4 gap-4 gap-y-6 p-4">
                    <div class="col-span-4">
                        <label class="block">Tên sản phẩm</label>
                        <input type="text"
                            class="w-full h-[55px] border mt-2 p-3 text-md text-gray-600 border-gray-400 rounded"
                            placeholder="Nhập tên sản phẩm..." />
                    </div>

                    <div class="col-span-4">
                        <label class="block">Slug</label>
                        <input type="text"
                            class="w-full h-[55px] border mt-2 p-3 text-md text-gray-600 border-gray-400 rounded"
                            placeholder="" />
                    </div>

                    <div class="col-span-3">
                        <label class="block">Giá</label>
                        <input type="text"
                            class="w-full h-[55px] border mt-2 p-3 text-md text-gray-600 border-gray-400 rounded"
                            placeholder="Nhập giá sản phẩm..." />
                    </div>

                    <div class="col-span-1">
                        <label class="block">Chất liệu</label>
                        <input type="text"
                            class="w-full h-[55px] border mt-2 p-3 text-md text-gray-600 border-gray-400 rounded"
                            placeholder="Nhập chất liệu..." />
                    </div>


                    <div class="col-span-4">
                        <label class="block">Danh mục</label>
                        <select
                            class="w-full h-[55px] border mt-2 p-3 text-md text-gray-600 bg-white border-gray-400 rounded">
                            <option selected disabled value="0">Chọn danh mục</option>
                            <option v-for="i in 5" :key="i" :value="i">
                                {{ i }}
                            </option>
                        </select>
                    </div>

                    <div class="col-span-4">
                        <label class="block">Tổng quan</label>
                        <input type="text"
                            class="w-full h-[55px] border mt-2 p-3 text-md text-gray-600 border-gray-400 rounded"
                            placeholder="Nhập thông tin tổng quan..." />
                    </div>

                    <div class="col-span-4">
                        <label class="block">Mô tả</label>
                        <input type="text"
                            class="w-full h-[55px] border mt-2 p-3 text-md text-gray-600 border-gray-400 rounded"
                            placeholder="Nhập mô tả..." />
                    </div>
                </div>
            </div>

            <div
                class="col-span-1 flex flex-col flex-shrink-0 rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 rounded-md border-none bg-white shadow-lg outline-none">
                <h5 class="text-xl font-medium leading-normal text-neutral-800 text-center w-full">
                    Trạng thái sản phẩm
                </h5>
                <div class="flex flex-col">
                    <div class="">
                        <!-- <label class="block">Trạng thái</label>
                        <input type="text"
                            class="w-full h-[55px] border mt-2 p-3 text-md text-gray-600 border-gray-400 rounded"
                            placeholder="Nhập họ và tên..." /> -->

                        <input type="radio" name="visibility" value="visible">
                        <label for="visible"> Hiển thị</label><br>
                        <input type="radio" name="visibility" value="invisible">
                        <label for="invisible"> Không hiển thị</label><br>

                    </div>


                </div>
            </div>
        </div>
        <div
            class="flex flex-shrink-0 flex-wrap items-center justify-center rounded-b-md border-neutral-100 border-opacity-100 p-4">
            <button class="btn-basic px-6 py-2 mx-auto">
                Lưu
            </button>
        </div>
    </div>
</template>
