<script setup>
import { useProductStore } from "@/stores";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import EditIcon from "@/components/icons/EditIcon.vue";

const productStore = useProductStore();

</script>

<template>
    <div v-if="productStore.variants.length" class="w-[80%] flex flex-col">
        <table class="divide-y divide-gray-200">
            <thead>
                <tr>
                    <th scope="col" class="px-3 py-3 text-start text-black font-bold uppercase">
                        Tên màu</th>
                    <th scope="col" class="px-3 py-3 text-start text-black font-bold uppercase">
                        Ảnh varian</th>
                    <th scope="col" class="px-3 py-3 text-start text-black font-bold uppercase">
                        Thumbnail</th>
                    <th scope="col" class="px-3 py-3 text-start text-black font-bold uppercase">
                        Kích cỡ</th>
                    <th scope="col" class="px-3 py-3 text-start text-black font-bold uppercase">
                        Số lượng</th>
                    <th scope="col" class="px-3 py-3 text-end text-black font-bold uppercase">
                        Tùy chọn</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
                <tr v-for="(variant, index) in productStore.variants" :key="index">
                    <td class="px-3 py-4 whitespace-nowrap text-black">
                        {{ variant.colorName }}</td>
                    <td class="px-3 py-4 whitespace-nowrap text-black">
                        <img class="w-[100px] h-[100px] object-contain" :src="variant.image.path" />
                    </td>
                    <td class="px-3 py-4 whitespace-nowrap text-black">
                        <img class="w-[100px] h-[100px] object-contain" :src="variant.thumbnail.path" />
                    </td>
                    <td class="px-3 py-4 whitespace-nowrap text-black">
                        {{ variant.size.name }}</td>
                    <td class="px-3 py-4 whitespace-nowrap text-black">
                        {{ variant.quantity }}</td>
                    <td class="flex gap-4 justify-end py-4 whitespace-nowrap">
                        <div class="cursor-pointer flex justify-end">
                            <EditIcon />
                        </div>
                        <div class="cursor-pointer flex justify-end">
                            <DeleteIcon @click="productStore.removeVariant(index)" />
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
