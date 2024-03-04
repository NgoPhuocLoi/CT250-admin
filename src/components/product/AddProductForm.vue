<script setup>
import { ref, onMounted } from "vue";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ImageIcon from "@/components/icons/ImageIcon.vue";
import categoryService from "@/services/category";
import { useCategoryStore } from "@/stores";

const categoryStore = useCategoryStore();

const editor = ClassicEditor;
const newProduct = ref({});
// const description = ref('');
// const overview = ref('');
// const material = ref('');
// const instruction = ref('');
const editorConfig = {
    // The configuration of the editor.
}

const mainImageSrc = ref("");

onMounted(async () => {
    try {
        const res = await categoryService.getAll();
        categoryStore.setCategories(res.metadata);
    } catch (error) {
        console.log(error);
    }
});

function openCategoryMenu(categoryId) {
    categoryStore.setActiveCategoryId(categoryId);
}

const uploadMainImage = () => {
    document.getElementById('mainImage').click();
}

const changeMainImage = () => {
    const mainImage = document.getElementById('mainImage')
    const [file] = mainImage.files
    console.log(mainImage.files)
    if (file) {
        console.log("SRC", URL.createObjectURL(file))
        mainImageSrc.value = URL.createObjectURL(file)
    }
}

</script>

<template>
    <div class="flex flex-col gap-4 w-full">
        <div
            class="p-8 flex flex-col flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 rounded-md border-none bg-white shadow-lg outline-none">
            <h5 class="mb-6 text-2xl font-bold leading-normal text-neutral-800 text-center w-full">
                Thông tin chung
            </h5>
            <div class="w-[90%] flex flex-col gap-6">
                <div class="grid grid-cols-3">
                    <div
                        class="relative col-span-1 w-[350px] h-[350px] flex items-center justify-center border-2 border-dashed border-slate-200">
                        <img v-if="mainImageSrc.length" class="w-[350px] h-[350px] object-contain" id="blah"
                            :src="mainImageSrc" />
                        <div class="cursor-pointer" @click="uploadMainImage">
                            <ImageIcon :class="mainImageSrc.length ? 'absolute top-2 right-2' : ''" />
                            <div class="absolute top-0 left-0 invisible">
                                <input accept="image/*" type="file" id="mainImage" @change="changeMainImage">
                            </div>
                        </div>
                    </div>
                    <div class="col-span-2 flex flex-col gap-6">
                        <div class="flex flex-col gap-2">
                            <label class="text-xl text-black">Tên sản phẩm</label>
                            <input type="text" v-model="newProduct.name"
                                class="w-full h-[55px] border mt-2 p-3 text-md text-gray-600 border-gray-400 rounded"
                                placeholder="Nhập tên sản phẩm..." />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label class="text-xl text-black">Giá</label>
                            <input type="text" v-model="newProduct.price"
                                class="w-full h-[55px] border mt-2 p-3 text-md text-gray-600 border-gray-400 rounded"
                                placeholder="Nhập giá sản phẩm..." />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label class="text-xl text-black">Trạng thái</label>
                            <div>
                                <input v-model="newProduct.visible" type="radio" id="visible" name="visibility" value="true">
                                <label for="visible"> Hiển thị</label><br>
                                <input v-model="newProduct.visible" type="radio" id="invisible" name="visibility" value="false">
                                <label for="invisible"> Không hiển thị</label><br>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col gap-2">
                    <label class="text-xl text-black">Danh mục</label>
                    <select v-model="newProduct.categoryId" class="w-full h-[55px] border p-3 text-md text-gray-600 bg-white border-gray-400 rounded">
                        <option selected disabled value="0">Chọn danh mục</option>
                        <option v-for="category of categoryStore.categories" :key="category.id" :value="category.id">
                            {{ category.name }}
                        </option>
                    </select>
                </div>

                <div class="grid grid-cols-2 gap-3">
                    <div class="col-span-1 flex flex-col gap-2">
                        <label class="text-xl text-black">Mô tả</label>
                        <ckeditor class="w-full h-[55px] border p-3 text-md text-gray-600 border-gray-400 rounded"
                            :editor="editor" v-model="newProduct.description" :config="editorConfig"></ckeditor>
                    </div>

                    <div class="col-span-1 flex flex-col gap-2">
                        <label class="text-xl text-black">Tổng quan</label>
                        <ckeditor class="w-full h-[55px] border p-3 text-md text-gray-600 border-gray-400 rounded"
                            :editor="editor" v-model="newProduct.overview" :config="editorConfig"></ckeditor>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-3">
                    <div class="col-span-1 flex flex-col gap-2">
                        <label class="text-xl text-black">Chất liệu</label>
                        <ckeditor class="w-full h-[55px] border p-3 text-md text-gray-600 border-gray-400 rounded"
                            :editor="editor" v-model="newProduct.material" :config="editorConfig"></ckeditor>
                    </div>

                    <div class="col-span-1 flex flex-col gap-2">
                        <label class="text-xl text-black">Hướng dẫn giặt</label>
                        <ckeditor :editor="editor" v-model="newProduct.instruction" :config="editorConfig"></ckeditor>
                    </div>
                </div>

            </div>
        </div>

        <div
            class="p-8 flex flex-col flex-shrink-0 rounded-t-md border-b-2 border-neutral-100 border-opacity-100 rounded-md border-none bg-white shadow-lg outline-none">
            <h5 class="text-2xl font-bold leading-normal text-neutral-800 text-center w-full">
                Thêm các variant
            </h5>
            <div class="flex flex-col">

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
