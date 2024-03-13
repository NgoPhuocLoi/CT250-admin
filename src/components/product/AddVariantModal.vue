<script setup>
import { onMounted, ref } from "vue";
import { Modal, Ripple, initTWE } from "tw-elements";
import { useSizeStore, useProductStore } from "@/stores";

import ImageIcon from "@/components/icons/ImageIcon.vue";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import EditIcon from "@/components/icons/EditIcon.vue";

const sizeStore = useSizeStore();
const productStore = useProductStore();
const modal = ref();
const variants = ref([]);
const newVariant = ref({});
const editVariantId = ref(-1);

const editVariant = (variantIndex) => {
    editVariantId.value = variantIndex;
    newVariant.value = { ...variants.value[variantIndex] };
};

const updateEditedVariant = () => {
    variants.value[editVariantId.value] = { ...newVariant.value };
    resetSizeAndQuantity();
    editVariantId.value = -1;
};

const addNewVariant = () => {
    variants.value.push({ ...newVariant.value });
    resetSizeAndQuantity();
};

const removeVariant = (variantIndex) => {
    variants.value.splice(variantIndex, 1);
};

onMounted(async () => {
    initTWE({ Modal, Ripple });
    const modalElement = document.getElementById("addVariantModal");
    modal.value = new Modal(modalElement);
});

const resetSizeAndQuantity = () => {
    newVariant.value.size = {};
    newVariant.value.quantity = null;
};

const resetColor = () => {
    newVariant.value = {};
}

const addVariants = () => {
    try {
        modal.value.hide();
        productStore.addNewVariants(variants.value);
        Toast.fire({
            icon: "success",
            title: "Các variant mới đã được thêm",
        });
        variants.value = [];
        newVariant.value = {};
    } catch (error) {
        console.log(error);
    }
};

const addVariantImage = (e) => {
    const files = e.target.files;
    newVariant.value.image = {
        file: files[0],
        path: URL.createObjectURL(files[0]),
    };
};

const addVariantThumbnail = (e) => {
    const files = e.target.files;
    newVariant.value.thumbnail = {
        file: files[0],
        path: URL.createObjectURL(files[0]),
    };
};

</script>

<template>
    <!-- Modal -->
    <div data-twe-modal-init
        class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="addVariantModal" tabindex="-1" aria-labelledby="addVariantModalLabel" aria-hidden="true">
        <div data-twe-modal-dialog-ref
            class="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]  min-[992px]:max-w-[1000px]">
            <div
                class="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none">
                <!-- Modal header -->
                <div
                    class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4">
                    <!--Modal title-->
                    <h5 class="text-2xl font-bold leading-normal text-neutral-800 text-center w-full"
                        id="addVariantModalLabel">
                        Thêm variant mới
                    </h5>
                    <!--Close button-->
                    <button type="button"
                        class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                        data-twe-modal-dismiss aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="h-6 w-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <!--Modal body-->
                <div class="relative grid grid-cols-3 gap-4 gap-y-6 p-6" data-twe-modal-body-ref>
                    <div class="col-span-2 w-[95%] flex flex-col gap-4">

                        <!-- color begin -->
                        <div>
                            <div class="text-xl font-bold text-black">Màu sắc:</div>
                            <div class="flex justify-between">
                                <div class="flex flex-col justify-center gap-2">
                                    <label for="colorName" class="text-black">Tên màu</label>
                                    <input name="colorName" id="colorName" type="text"
                                        class="mb-2 w-full h-[55px] border p-3 text-md text-gray-600 border-gray-400 rounded"
                                        v-model="newVariant.colorName" placeholder="Nhập tên màu..." />
                                    <!-- <ErrorMessage name="colorName" class="-mt-2 text-[15px] text-danger" /> -->
                                </div>
                                <div class="flex flex-col gap-2">
                                    <label class="text-black">Ảnh variant</label>
                                    <div
                                        class="relative w-[150px] h-[150px] flex items-center justify-center border-2 border-dashed border-slate-200">
                                        <img v-if="newVariant.image" class="w-[150px] h-[150px] object-contain"
                                            :src="newVariant.image.path" />
                                        <div @click="productStore.uploadImage('variantImage')" class="cursor-pointer">
                                            <EditIcon v-if="newVariant.image" class="w-8 h-8 absolute top-1 right-1" />
                                            <ImageIcon v-else />
                                            <div class="absolute top-0 left-0 invisible">
                                                <input accept="image/*" type="file" id="variantImage"
                                                    @change="addVariantImage" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex flex-col gap-2">
                                    <label class="text-black">Thumbnail</label>
                                    <div
                                        class="relative w-[150px] h-[150px] flex items-center justify-center border-2 border-dashed border-slate-200">
                                        <img v-if="newVariant.thumbnail" class="w-[150px] h-[150px] object-contain"
                                            :src="newVariant.thumbnail.path" />
                                        <div @click="productStore.uploadImage('variantThumbnail')"
                                            class="cursor-pointer">
                                            <EditIcon v-if="newVariant.thumbnail"
                                                class="w-8 h-8 absolute top-1 right-1" />
                                            <ImageIcon v-else />
                                            <div class="absolute top-0 left-0 invisible">
                                                <input accept="image/*" type="file" id="variantThumbnail"
                                                    @change="addVariantThumbnail" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- color end -->

                        <!-- list begin -->
                        <div v-if="variants.length" class="flex flex-col">
                            <div class="-m-1.5 overflow-x-auto">
                                <div class="p-1.5 min-w-full inline-block align-middle">
                                    <div class="overflow-hidden">
                                        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                            <thead>
                                                <tr>
                                                    <th scope="col"
                                                        class="px-3 py-3 text-start text-black font-medium text-gray-500 uppercase">
                                                        Tên màu</th>
                                                    <th scope="col"
                                                        class="px-3 py-3 text-start text-black font-medium text-gray-500 uppercase">
                                                        Kích cỡ</th>
                                                    <th scope="col"
                                                        class="px-3 py-3 text-start text-black font-medium text-gray-500 uppercase">
                                                        Số lượng</th>
                                                    <th scope="col"
                                                        class="px-3 py-3 text-end text-black font-medium text-gray-500 uppercase">
                                                        Tùy chọn</th>
                                                </tr>
                                            </thead>
                                            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                                                <tr v-for="(variant, index) in variants" :key="index">
                                                    <td
                                                        class="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                                        {{ variant.colorName }}</td>
                                                    <td
                                                        class="px-3 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                                        {{ variant.size.name }}</td>
                                                    <td
                                                        class="px-3 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                                        {{ variant.quantity }}</td>
                                                    <td
                                                        class="flex gap-4 justify-end py-4 whitespace-nowrap text-sm font-medium">
                                                        <div class="cursor-pointer flex justify-end">
                                                            <EditIcon @click="editVariant(index)" />
                                                        </div>
                                                        <div class="cursor-pointer flex justify-end">
                                                            <DeleteIcon class="" @click="removeVariant(index)" />
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- list end -->
                    </div>

                    <div class="flex flex-col gap-5 border-l pl-10">
                        <div class="">
                            <div class="text-xl font-bold text-black">Kích cỡ:</div>
                            <select
                                class="w-full h-[55px] border mt-2 p-3 text-md text-gray-600 bg-white border-gray-400 rounded"
                                v-model="newVariant.size">
                                <option selected disabled value="0">Chọn kích cỡ</option>
                                <option v-for="size in sizeStore.sizes" :key="size.id" :value="size">
                                    {{ size.name }}
                                </option>
                            </select>
                        </div>

                        <div class="">
                            <label for="quantity" class="text-xl font-bold text-black">Số lượng:</label>
                            <input type="number" id="quantity"
                                class="w-full h-[55px] border mt-2 p-3 text-md text-gray-600 border-gray-400 rounded"
                                placeholder="Nhập số lượng..." v-model="newVariant.quantity" />
                        </div>

                        <div class="w-full flex justify-between gap-2">
                            <button v-if="editVariantId === -1" @click.prevent="addNewVariant"
                                class="btn-basic px-8 py-2">
                                Thêm
                            </button>
                            <button v-else @click.prevent="updateEditedVariant" class="btn-basic px-5 py-3">
                                Lưu thay đổi
                            </button>
                            <button @click.prevent="resetColor" class="btn-basic bg-yellow-400 px-5 py-3">
                                Tạo màu mới
                            </button>
                        </div>


                    </div>
                </div>

                <!--Modal footer-->
                <div
                    class="flex items-center justify-center gap-4 rounded-b-md border-neutral-100 border-opacity-100 p-4">
                    <button @click.prevent="addVariants" class="btn-basic text-center bg-green-500 w-[100px] px-8 py-2">
                        Lưu
                    </button>
                    <button @click.prevent="modal.hide()" class="btn-basic text-center bg-red-500 w-[100px] px-8 py-2">
                        Thoát
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
