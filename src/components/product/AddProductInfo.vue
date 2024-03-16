<script setup>
import { onMounted } from "vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ErrorMessage } from "vee-validate";

import ImageIcon from "@/components/icons/ImageIcon.vue";
import EditIcon from "@/components/icons/EditIcon.vue";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";

import categoryService from "@/services/category";
import sizeService from "@/services/size";

import { useCategoryStore, useSizeStore, useProductStore } from "@/stores";

const categoryStore = useCategoryStore();
const sizeStore = useSizeStore();
const productStore = useProductStore();

const editor = ClassicEditor;

onMounted(async () => {
    try {
        const res1 = await categoryService.getAll();
        categoryStore.setCategories(res1.metadata);

        const res2 = await sizeService.getAll();
        sizeStore.setSizes(res2.metadata);
    } catch (error) {
        console.log(error);
    }
});

</script>

<template>
    <div class="w-[90%] flex flex-col gap-6">
        <div class="flex flex-col gap-6">
            <!-- product name begin -->
            <div class="flex flex-col gap-2">
                <label for="name" class="text-xl font-bold text-black">Tên sản phẩm</label>
                <input name="name" id="name" type="text" v-model="productStore.newProduct.name"
                    class="w-full h-[55px] border mt-2 p-3 text-md text-gray-600 border-gray-400 rounded"
                    placeholder="Nhập tên sản phẩm..." />
                <ErrorMessage name="name" class="text-[15px] text-danger" />
            </div>
            <!-- product name end -->

            <!-- category begin -->
            <div class="flex flex-col gap-2">
                <label class="text-xl font-bold text-black">Danh mục</label>
                <div>
                    <div v-for="category in categoryStore.categories" :key="category.id">
                        <input class="mr-2" v-model="productStore.parentCategoryId" type="radio" :id="category.id"
                            @click="productStore.newProduct.categoryId = 0" name="parentCategory" :value="category.id" />
                        <label :for="category.id">{{ category.name }}</label><br />
                    </div>
                </div>
                <select v-model="productStore.newProduct.categoryId"
                    class="w-full h-full border mt-2 p-3 text-md text-gray-600 border-gray-400 rounded">
                    <option selected disabled value="0">Chọn danh mục</option>
                    <optgroup v-for="subCategory1 in productStore.parentCategory?.children" :key="subCategory1.id"
                        :label="subCategory1.name">
                        <option v-for="subCategory2 in subCategory1.children" :key="subCategory2.id"
                            :value="subCategory2.id">
                            {{ subCategory2.name }}
                        </option>
                    </optgroup>
                </select>
            </div>
            <!-- category end -->

            <!-- price begin -->
            <div class="flex flex-col gap-2">
                <label for="price" class="text-xl font-bold text-black">Giá</label>
                <input name="price" id="price" type="number" v-model="productStore.newProduct.price"
                    class="w-full h-[55px] border mt-2 p-3 text-md text-gray-600 border-gray-400 rounded"
                    placeholder="Nhập giá sản phẩm..." />
                <ErrorMessage name="price" class="text-[15px] text-danger" />
            </div>
            <!-- price end -->

            <!-- visibility begin -->
            <div class="flex flex-col gap-2">
                <label class="text-xl font-bold text-black">Trạng thái</label>
                <div>
                    <input class="mr-2" v-model="productStore.newProduct.visible" type="radio" id="visible"
                        name="visibility" value="true" />
                    <label for="visible"> Hiển thị</label><br />
                    <input class="mr-2" v-model="productStore.newProduct.visible" type="radio" id="invisible"
                        name="visibility" value="false" />
                    <label for="invisible"> Không hiển thị</label><br />
                </div>
            </div>
            <!-- visibility end -->
        </div>

        <!-- ckeditor begin -->
        <div class="grid grid-cols-2 gap-3">
            <div class="col-span-1 flex flex-col gap-2">
                <label class="text-xl font-bold text-black">Mô tả</label>
                <ckeditor name="description" :editor="editor" v-model="productStore.newProduct.description"></ckeditor>
                <ErrorMessage name="description" class="text-[15px] text-danger" />
            </div>

            <div class="col-span-1 flex flex-col gap-2">
                <label class="text-xl font-bold text-black">Tổng quan</label>
                <ckeditor name="overview" :editor="editor" v-model="productStore.newProduct.overview"></ckeditor>
                <ErrorMessage name="overview" class="text-[15px] text-danger" />
            </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
            <div class="col-span-1 flex flex-col gap-2">
                <label class="text-xl font-bold text-black">Chất liệu</label>
                <ckeditor name="material" :editor="editor" v-model="productStore.newProduct.material"></ckeditor>
                <ErrorMessage name="material" class="text-[15px] text-danger" />
            </div>

            <div class="col-span-1 flex flex-col gap-2">
                <label class="text-xl font-bold text-black">Hướng dẫn giặt</label>
                <ckeditor name="instruction" :editor="editor" v-model="productStore.newProduct.instruction"></ckeditor>
                <ErrorMessage name="instruction" class="text-[15px] text-danger" />
            </div>
        </div>
        <!-- ckeditor end -->

        <!-- product image begin -->
        <div class="flex flex-col gap-2">
            <label class="text-xl font-bold text-black">Hình ảnh</label>
            <div class="grid grid-cols-4 gap-2 border rounded p-4">
                <div v-for="(image, index) of productStore.images" :key="image.file.name"
                    class="relative ol-span-1 w-[300px] h-[300px] flex items-center justify-center border-2 border-dashed border-slate-200">
                    <img class="w-[300px] h-[300px] object-contain overflow-hidden" :src="image.path" />
                    <div class="cursor-pointer flex gap-1 absolute top-2 right-2">
                        <EditIcon @click="productStore.uploadImage(`editProductImage_${index}`)" />
                        <DeleteIcon class="" @click.prevent="productStore.removeProductImage(index)" />
                        <div class="absolute top-0 left-0 invisible">
                            <input accept="image/*" type="file" :id="`editProductImage_${index}`"
                                @change="(e) => productStore.editProductImage(e, index)" />
                        </div>
                    </div>
                </div>

                <div @click="productStore.uploadImage('productImages')"
                    class="cursor-pointer relative col-span-1 w-[300px] h-[300px] flex items-center justify-center border-2 border-dashed border-slate-200">
                    <ImageIcon />
                    <div class="absolute top-0 left-0 invisible">
                        <input accept="image/*" type="file" id="productImages" @change="productStore.addProductImage"
                            multiple />
                    </div>
                </div>
            </div>
        </div>
        <!-- product image end -->
    </div>
</template>
