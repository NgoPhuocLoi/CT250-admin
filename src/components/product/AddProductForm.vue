<script setup>
import { ref, onMounted } from "vue";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ImageIcon from "@/components/icons/ImageIcon.vue";
import categoryService from "@/services/category";
import { useCategoryStore } from "@/stores";
import colorService from "@/services/color";
import sizeService from "@/services/size";
const categoryStore = useCategoryStore();

const editor = ClassicEditor;
const newProduct = ref({});
const newVariant = ref({});
const editorConfig = {
    // The configuration of the editor.
}

const mainImageSrc = ref("");
const parentCategory = ref({});

const colors = ref([]);
const sizes = ref([]);

onMounted(async () => {
    try {
        const res = await categoryService.getAll();
        categoryStore.setCategories(res.metadata);

        const res1 = await colorService.getAll();
        colors.value = res1.metadata;

        const res2 = await sizeService.getAll();
        sizes.value = res2.metadata;
    } catch (error) {
        console.log(error);
    }
});

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
                Thông tin sản phẩm
            </h5>
            <div class="w-[90%] flex flex-col gap-6">
                <div class="flex flex-col gap-6">
                    <div class="flex flex-col gap-2">
                        <label class="text-xl font-bold text-black">Tên sản phẩm</label>
                        <input type="text" v-model="newProduct.name"
                            class="w-full h-[55px] border mt-2 p-3 text-md text-gray-600 border-gray-400 rounded"
                            placeholder="Nhập tên sản phẩm..." />
                    </div>

                    <div class="flex flex-col gap-2">
                        <label class="text-xl font-bold text-black">Danh mục</label>
                        <div>
                            <div v-for="category in categoryStore.categories" :key="category.id">
                                <input class="mr-2" v-model="parentCategory" type="radio" :id="category.id"
                                    @click="newProduct.categoryId = 0" name="parentCategory" :value="category">
                                <label :for="category.id">{{ category.name }}</label><br>
                            </div>
                        </div>
                        <select v-model="newProduct.categoryId"
                            class="w-full h-full border mt-2 p-3 text-md text-gray-600 border-gray-400 rounded">
                            <option selected disabled value="0">Chọn danh mục</option>
                            <optgroup v-for="subCategory1 in parentCategory.children" :key="subCategory1.id"
                                :label="subCategory1.name">
                                <option v-for="subCategory2 in subCategory1.children" :key="subCategory2.id"
                                    :value="subCategory2.id">{{
                            subCategory2.name }}</option>
                            </optgroup>
                        </select>

                    </div>

                    <div class="flex flex-col gap-2">
                        <label class="text-xl font-bold text-black">Giá</label>
                        <input type="text" v-model="newProduct.price"
                            class="w-full h-[55px] border mt-2 p-3 text-md text-gray-600 border-gray-400 rounded"
                            placeholder="Nhập giá sản phẩm..." />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label class="text-xl font-bold text-black">Trạng thái</label>
                        <div>
                            <input class="mr-2" v-model="newProduct.visible" type="radio" id="visible" name="visibility"
                                value="true">
                            <label for="visible"> Hiển thị</label><br>
                            <input class="mr-2" v-model="newProduct.visible" type="radio" id="invisible"
                                name="visibility" value="false">
                            <label for="invisible"> Không hiển thị</label><br>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-3">
                    <div class="col-span-1 flex flex-col gap-2">
                        <label class="text-xl font-bold text-black">Mô tả</label>
                        <ckeditor :editor="editor" v-model="newProduct.description" :config="editorConfig"></ckeditor>
                    </div>

                    <div class="col-span-1 flex flex-col gap-2">
                        <label class="text-xl font-bold text-black">Tổng quan</label>
                        <ckeditor :editor="editor" v-model="newProduct.overview" :config="editorConfig"></ckeditor>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-3">
                    <div class="col-span-1 flex flex-col gap-2">
                        <label class="text-xl font-bold text-black">Chất liệu</label>
                        <ckeditor :editor="editor" v-model="newProduct.material" :config="editorConfig"></ckeditor>
                    </div>

                    <div class="col-span-1 flex flex-col gap-2">
                        <label class="text-xl font-bold text-black">Hướng dẫn giặt</label>
                        <ckeditor :editor="editor" v-model="newProduct.instruction" :config="editorConfig"></ckeditor>
                    </div>
                </div>

                <!-- image begin -->
                <div class="flex flex-col gap-2">
                    <label class="text-xl font-bold text-black">Hình ảnh</label>
                    <div class="border p-4">
                        <div
                            class="relative col-span-1 w-[350px] h-[350px] flex items-center justify-center border-2 border-dashed border-slate-200">
                            <img v-if="mainImageSrc.length" class="w-[350px] h-[350px] object-contain" id="blah"
                                :src="mainImageSrc" />
                            <div class="cursor-pointer" @click="uploadMainImage">
                                <ImageIcon :class="mainImageSrc.length ? 'absolute top-2 right-2' : ''" />
                                <div class="absolute top-0 left-0 invisible">
                                    <input accept="image/*" type="file" id="mainImage" @change="changeMainImage"
                                        multiple>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- image end -->
            </div>

            <div
                class="mt-6 flex flex-shrink-0 flex-wrap items-center justify-center rounded-b-md border-neutral-100 border-opacity-100">
                <button class="btn-basic px-6 py-2 mx-auto">
                    Lưu sản phẩm
                </button>
            </div>
        </div>

        <div
            class="p-8 flex flex-col flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 rounded-md border-none bg-white shadow-lg outline-none">
            <h5 class="text-2xl font-bold leading-normal text-neutral-800 text-center w-full">
                Thêm variant
            </h5>
            <div class="w-[90%] flex flex-col gap-6">
                <div class="flex flex-col gap-2">
                    <div class="flex gap-2 text-xl font-bold text-black">
                        <div class="mb-2">Kích cỡ:</div>
                        <div>{{ detailProductInfo?.sizes[selectedSizeIndex].name }}</div>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <button v-for="size in sizes" :key="size.name" :class="[
                            false
                                ? 'border-2 border-red-500'
                                : 'border-[0.5px] border-gray-300',
                        ]"
                            class="w-[75px] h-[55px] border-[0.5px] border-gray-300 text-center rounded hover:opacity-85 focus:outline-none">
                            {{ size.name }}
                        </button>
                    </div>
                </div>

                <div class="flex flex-col gap-2">
                    <div class="flex gap-2 text-xl font-bold text-black">
                        <div class="mb-2">Màu sắc:</div>
                    </div>
                    <input type="text"
                        class="mb-2 w-full h-[55px] border p-3 text-md text-gray-600 border-gray-400 rounded"
                        placeholder="Nhập tên màu..." />
                    <div class="flex justify-around">
                        <div class="flex flex-col gap-2">
                            <label class="text-xl text-black">Ảnh variant</label>
                            <div
                                class="relative col-span-1 w-[350px] h-[350px] flex items-center justify-center border-2 border-dashed border-slate-200">
                                <img v-if="mainImageSrc.length" class="w-[350px] h-[350px] object-contain" id="blah"
                                    :src="mainImageSrc" />
                                <div class="cursor-pointer" @click="uploadMainImage">
                                    <ImageIcon :class="mainImageSrc.length ? 'absolute top-2 right-2' : ''" />
                                    <div class="absolute top-0 left-0 invisible">
                                        <input accept="image/*" type="file" id="mainImage" @change="changeMainImage"
                                            multiple>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col gap-2">
                            <label class="text-xl text-black">Thumbnail</label>
                            <div
                                class="relative col-span-1 w-[350px] h-[350px] flex items-center justify-center border-2 border-dashed border-slate-200">
                                <img v-if="mainImageSrc.length" class="w-[350px] h-[350px] object-contain" id="blah"
                                    :src="mainImageSrc" />
                                <div class="cursor-pointer" @click="uploadMainImage">
                                    <ImageIcon :class="mainImageSrc.length ? 'absolute top-2 right-2' : ''" />
                                    <div class="absolute top-0 left-0 invisible">
                                        <input accept="image/*" type="file" id="mainImage" @change="changeMainImage"
                                            multiple>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col gap-2">
                    <label class="text-xl font-bold text-black">Số lượng</label>
                    <input type="text" v-model="newVariant.quantity"
                        class="w-full h-[55px] border mt-2 p-3 text-md text-gray-600 border-gray-400 rounded"
                        placeholder="Nhập số lượng..." />
                </div>
            </div>
            <div
                class="mt-6 flex flex-shrink-0 flex-wrap items-center justify-center rounded-b-md border-neutral-100 border-opacity-100">
                <button class="btn-basic px-6 py-2 mx-auto">
                    Lưu variant
                </button>
            </div>
        </div>
    </div>
</template>
