<script setup>
import { ref, onMounted } from "vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

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
const parentCategory = ref({});

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

const addProductImage = (e) => {
    productStore.addProductImage(e);
};

const removeProductImage = (imageIndex) => {
    productStore.removeProductImage(imageIndex);
};

const productSchema = yup.object().shape({
    // productName: yup
    //   .string()
    //   .required("Không được để trống tên sản phẩm.")
    //   .max(50, "Tên sản phẩm tối đa 50 ký tự."),
    // price: yup
    //   .number()
    //   .required("Không được để trống giá."),
    // colorName: yup
    //   .string()
    //   .required("Không được để trống tên màu."),
    // quantity: yup
    //   .number()
    //   .required("Không được để trống số lượng."),
});
</script>

<template>
    <div class="w-[90%] flex flex-col gap-6">
        <div class="flex flex-col gap-6">
            <!-- product name begin -->
            <div class="flex flex-col gap-2">
                <label for="productName" class="text-xl font-bold text-black">Tên sản phẩm</label>
                <input name="productName" id="productName" type="text" v-model="productStore.newProduct.name"
                    class="w-full h-[55px] border mt-2 p-3 text-md text-gray-600 border-gray-400 rounded"
                    placeholder="Nhập tên sản phẩm..." />
                <ErrorMessage name="productName" class="text-[15px] text-danger" />
            </div>
            <!-- product name end -->

            <!-- category begin -->
            <div class="flex flex-col gap-2">
                <label class="text-xl font-bold text-black">Danh mục</label>
                <div>
                    <div v-for="category in categoryStore.categories" :key="category.id">
                        <input class="mr-2" v-model="parentCategory" type="radio" :id="category.id"
                            @click="productStore.newProduct.categoryId = 0" name="parentCategory" :value="category" />
                        <label :for="category.id">{{ category.name }}</label><br />
                    </div>
                </div>
                <select v-model="productStore.newProduct.categoryId"
                    class="w-full h-full border mt-2 p-3 text-md text-gray-600 border-gray-400 rounded">
                    <option selected disabled value="0">Chọn danh mục</option>
                    <optgroup v-for="subCategory1 in parentCategory.children" :key="subCategory1.id"
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
                <ckeditor :editor="editor" v-model="productStore.newProduct.description"></ckeditor>
            </div>

            <div class="col-span-1 flex flex-col gap-2">
                <label class="text-xl font-bold text-black">Tổng quan</label>
                <ckeditor :editor="editor" v-model="productStore.newProduct.overview"></ckeditor>
            </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
            <div class="col-span-1 flex flex-col gap-2">
                <label class="text-xl font-bold text-black">Chất liệu</label>
                <ckeditor :editor="editor" v-model="productStore.newProduct.material"></ckeditor>
            </div>

            <div class="col-span-1 flex flex-col gap-2">
                <label class="text-xl font-bold text-black">Hướng dẫn giặt</label>
                <ckeditor :editor="editor" v-model="productStore.newProduct.instruction"></ckeditor>
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
                    <div class="cursor-pointer flex gap-4 absolute top-2 right-2">
                        <EditIcon />
                        <DeleteIcon class="" @click.prevent="removeProductImage(index)" />
                    </div>
                </div>

                <div @click="productStore.uploadImage('productImages')"
                    class="cursor-pointer relative col-span-1 w-[300px] h-[300px] flex items-center justify-center border-2 border-dashed border-slate-200">
                    <ImageIcon />
                    <div class="absolute top-0 left-0 invisible">
                        <input accept="image/*" type="file" id="productImages" @change="addProductImage" multiple />
                    </div>
                </div>
            </div>
        </div>
        <!-- product image end -->
    </div>
</template>
