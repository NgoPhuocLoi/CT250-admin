<script setup>
import { ref, onMounted } from "vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

import ImageIcon from "@/components/icons/ImageIcon.vue";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import ExpandIcon from "@/components/icons/ExpandIcon.vue";
import Spinner from "@/components/common/Spinner.vue";

import categoryService from "@/services/category";
import sizeService from "@/services/size";
import colorService from "@/services/color";
import uploadService from "@/services/upload";
import productService from "@/services/product";
import variantService from "@/services/variant";

import { useCategoryStore } from "@/stores";
import variant from "@/services/variant";
import { useRouter } from "vue-router";
const categoryStore = useCategoryStore();
const router = useRouter();

const editor = ClassicEditor;
const newProduct = ref({ visible: true });
const newVariant = ref({}); // size, colorName, image, thumbnail, quantity
const parentCategory = ref({});

const sizes = ref([]);
const images = ref([]);
const loading = ref(false);
const variants = ref([]);

onMounted(async () => {
  newVariant.value = {};
  images.value = [];

  try {
    const res1 = await categoryService.getAll();
    categoryStore.setCategories(res1.metadata);

    const res2 = await sizeService.getAll();
    sizes.value = res2.metadata;
  } catch (error) {
    console.log(error);
  }
});

const uploadImage = (elementId) => {
  document.getElementById(elementId).click();
};

const addProductImage = (e) => {
  const files = e.target.files;
  images.value.push({
    file: files[0],
    path: URL.createObjectURL(files[0]),
  });
};

const removeProductImage = (imageIndex) => {
  images.value.splice(imageIndex, 1);
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

const handleCreateProduct = async () => {
  // images = await uploadedImages
  const uploadedProductImageIds = await handleUploadProductImages();

  // product = await createProduct
  const product = await productService.create({
    ...newProduct.value,
    uploadedImageIds: uploadedProductImageIds,
  });
  console.log(product.metadata);

  await Promise.all(
    variants.value.map(async (variant) => {
      // variantImage, thumbnailImage = await uploadImage
      const uploadedVariantImageIds = await handleUploadVariantImages(variant);

      // them variantImage, thumbnailImage vo product_images
      const productImageId = await productService.uploadImage(
        product.metadata.id,
        { uploadedImageId: uploadedVariantImageIds[0] }
      );

      // create color
      const color = await colorService.create({
        name: variant.colorName,
        productId: product.metadata.id,
        productImageId: productImageId.metadata.id,
        thumbnailImageId: uploadedVariantImageIds[1],
      });
      console.log("color", color.metadata);

      // variant = await createVariant
      const createdVariant = await productService.createVariant(
        product.metadata.id,
        {
          productId: product.metadata.id,
          colorId: color.metadata.id,
          sizeId: variant.size.id,
          quantity: variant.quantity,
        }
      );

      console.log("variant", createdVariant.metadata);
    })
  );

  Swal.fire({
    title: "Thành công",
    text: "Thêm sản phẩm thành công",
    icon: "success",
  }).then(() => {
    router.push("/san-pham");
  });
};

const handleUploadProductImages = async () => {
  const form = new FormData();
  images.value.forEach((image) => {
    form.append("images", image.file);
  });
  try {
    loading.value = true;
    const res = await uploadService.uploadImages(form);
    const idArray = res.metadata.map((item) => item.id);
    return idArray;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const handleUploadVariantImages = async (variant) => {
  const variantImageForm = new FormData();
  const colorImageForm = new FormData();
  variantImageForm.append("image", variant.image.file);
  colorImageForm.append("image", variant.thumbnail.file);
  try {
    loading.value = true;
    const [variantImageRes, colorImageRes] = await Promise.all([
      uploadService.uploadImage(variantImageForm),
      uploadService.uploadImage(colorImageForm),
    ]);

    return [variantImageRes.metadata.id, colorImageRes.metadata.id];
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const addNewVariant = () => {
  variants.value.push(newVariant.value);
  newVariant.value = {};
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
  <Form @submit="handleCreateProduct" :validation-schema="productSchema">
    <!-- product begin -->
    <div
      class="mb-8 p-8 flex flex-col flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 rounded-md border-none bg-white shadow-lg outline-none"
    >
      <h5
        class="mb-6 text-2xl font-bold leading-normal text-neutral-800 text-center w-full"
      >
        Thông tin sản phẩm
      </h5>
      <div class="w-[90%] flex flex-col gap-6">
        <div class="flex flex-col gap-6">
          <!-- product name begin -->
          <div class="flex flex-col gap-2">
            <label for="productName" class="text-xl font-bold text-black"
              >Tên sản phẩm</label
            >
            <input
              name="productName"
              id="productName"
              type="text"
              v-model="newProduct.name"
              class="w-full h-[55px] border mt-2 p-3 text-md text-gray-600 border-gray-400 rounded"
              placeholder="Nhập tên sản phẩm..."
            />
            <ErrorMessage name="productName" class="text-[15px] text-danger" />
          </div>
          <!-- product name end -->

          <!-- category begin -->
          <div class="flex flex-col gap-2">
            <label class="text-xl font-bold text-black">Danh mục</label>
            <div>
              <div
                v-for="category in categoryStore.categories"
                :key="category.id"
              >
                <input
                  class="mr-2"
                  v-model="parentCategory"
                  type="radio"
                  :id="category.id"
                  @click="newProduct.categoryId = 0"
                  name="parentCategory"
                  :value="category"
                />
                <label :for="category.id">{{ category.name }}</label
                ><br />
              </div>
            </div>
            <select
              v-model="newProduct.categoryId"
              class="w-full h-full border mt-2 p-3 text-md text-gray-600 border-gray-400 rounded"
            >
              <option selected disabled value="0">Chọn danh mục</option>
              <optgroup
                v-for="subCategory1 in parentCategory.children"
                :key="subCategory1.id"
                :label="subCategory1.name"
              >
                <option
                  v-for="subCategory2 in subCategory1.children"
                  :key="subCategory2.id"
                  :value="subCategory2.id"
                >
                  {{ subCategory2.name }}
                </option>
              </optgroup>
            </select>
          </div>
          <!-- category end -->

          <!-- price begin -->
          <div class="flex flex-col gap-2">
            <label for="price" class="text-xl font-bold text-black">Giá</label>
            <input
              name="price"
              id="price"
              type="number"
              v-model="newProduct.price"
              class="w-full h-[55px] border mt-2 p-3 text-md text-gray-600 border-gray-400 rounded"
              placeholder="Nhập giá sản phẩm..."
            />
            <ErrorMessage name="price" class="text-[15px] text-danger" />
          </div>
          <!-- price end -->

          <!-- visibility begin -->
          <div class="flex flex-col gap-2">
            <label class="text-xl font-bold text-black">Trạng thái</label>
            <div>
              <input
                class="mr-2"
                v-model="newProduct.visible"
                type="radio"
                id="visible"
                name="visibility"
                value="true"
              />
              <label for="visible"> Hiển thị</label><br />
              <input
                class="mr-2"
                v-model="newProduct.visible"
                type="radio"
                id="invisible"
                name="visibility"
                value="false"
              />
              <label for="invisible"> Không hiển thị</label><br />
            </div>
          </div>
          <!-- visibility end -->
        </div>

        <!-- ckeditor begin -->
        <div class="grid grid-cols-2 gap-3">
          <div class="col-span-1 flex flex-col gap-2">
            <label class="text-xl font-bold text-black">Mô tả</label>
            <ckeditor
              :editor="editor"
              v-model="newProduct.description"
            ></ckeditor>
          </div>

          <div class="col-span-1 flex flex-col gap-2">
            <label class="text-xl font-bold text-black">Tổng quan</label>
            <ckeditor :editor="editor" v-model="newProduct.overview"></ckeditor>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="col-span-1 flex flex-col gap-2">
            <label class="text-xl font-bold text-black">Chất liệu</label>
            <ckeditor :editor="editor" v-model="newProduct.material"></ckeditor>
          </div>

          <div class="col-span-1 flex flex-col gap-2">
            <label class="text-xl font-bold text-black">Hướng dẫn giặt</label>
            <ckeditor
              :editor="editor"
              v-model="newProduct.instruction"
            ></ckeditor>
          </div>
        </div>
        <!-- ckeditor end -->

        <!-- product image begin -->
        <div class="flex flex-col gap-2">
          <label class="text-xl font-bold text-black">Hình ảnh</label>
          <div class="grid grid-cols-3 gap-2 border rounded p-4">
            <div
              v-for="(image, index) of images"
              :key="image.file.name"
              class="col-span-1 w-[300px] h-[300px] flex items-center justify-center border-2 border-dashed border-slate-200"
            >
              <img
                class="w-[300px] h-[300px] object-contain overflow-hidden"
                :src="image.path"
              />
              <div class="cursor-pointer">
                <DeleteIcon
                  class="absolute top-2 right-2"
                  @click.prevent="removeProductImage(index)"
                />
              </div>
            </div>

            <div
              @click="uploadImage('productImages')"
              class="cursor-pointer relative col-span-1 w-[300px] h-[300px] flex items-center justify-center border-2 border-dashed border-slate-200"
            >
              <ImageIcon />
              <div class="absolute top-0 left-0 invisible">
                <input
                  accept="image/*"
                  type="file"
                  id="productImages"
                  @change="addProductImage"
                  multiple
                />
              </div>
            </div>
          </div>
        </div>
        <!-- product image end -->
      </div>
    </div>
    <!-- product end -->

    <!-- variant begin -->
    <div
      class="p-8 flex flex-col flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 rounded-md border-none bg-white shadow-lg outline-none"
    >
      <h5
        class="mb-8 text-2xl font-bold leading-normal text-neutral-800 text-center w-full"
      >
        Thêm variant
      </h5>

      <!-- list of variant begin -->
      <div
        v-for="variant in variants"
        :key="variant"
        class="bg-blue-100 w-[90%] flex flex-col gap-8 border rounded p-6 mb-6"
      >
        <!-- size begin -->
        <div class="flex items-center gap-10">
          <div class="text-xl font-bold text-black">Kích cỡ:</div>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="size in sizes"
              :key="size.name"
              :class="[
                variant.size?.id == size.id
                  ? 'border-[2px] border-blue-500'
                  : 'border-[0.5px]',
              ]"
              class="w-[75px] h-[55px] border-[0.5px] border-gray-300 text-center rounded hover:opacity-85 focus:outline-none"
            >
              {{ size.name }}
            </button>
          </div>
        </div>
        <!-- size end -->

        <!-- color begin -->
        <div class="flex items-center gap-10">
          <div class="text-xl font-bold text-black">Màu sắc:</div>
          <div class="flex w-[80%] justify-between">
            <div class="flex flex-col justify-center gap-2">
              <label class="text-xl text-black">Tên màu</label>
              <input
                type="text"
                class="mb-2 w-full h-[55px] border p-3 text-md text-gray-600 border-gray-400 rounded"
                v-model="variant.colorName"
                placeholder="Nhập tên màu..."
              />
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-xl text-black">Ảnh variant</label>
              <div
                class="relative w-[200px] h-[200px] flex items-center justify-center border-2 border-dashed border-slate-300"
              >
                <img
                  class="w-[200px] h-[200px] object-contain"
                  :src="variant.image.path"
                />
                <div class="cursor-pointer">
                  <ImageIcon class="absolute top-2 right-2" />
                  <div class="absolute top-0 left-0 invisible">
                    <input accept="image/*" type="file" />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-xl text-black">Thumbnail</label>
              <div
                class="relative w-[200px] h-[200px] flex items-center justify-center border-2 border-dashed border-slate-300"
              >
                <img
                  class="w-[200px] h-[200px] object-contain"
                  :src="variant.thumbnail.path"
                />
                <div class="cursor-pointer">
                  <ImageIcon class="absolute top-2 right-2" />
                  <div class="absolute top-0 left-0 invisible">
                    <input accept="image/*" type="file" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- color end -->

        <!-- quantity begin -->
        <div class="flex items-center gap-8">
          <label for="quantity" class="text-xl font-bold text-black"
            >Số lượng:</label
          >
          <div class="flex flex-col gap-2">
            <input
              id="quantity"
              type="number"
              v-model="variant.quantity"
              class="h-[55px] border mt-2 p-3 text-md text-gray-600 border-gray-400 rounded"
              placeholder="Nhập số lượng..."
            />
          </div>
        </div>
        <!-- quantity end -->
      </div>
      <!-- list of variant end -->

      <!-- new variant begin -->
      <div class="mt-8 w-[90%] flex flex-col gap-8 border rounded p-6">
        <!-- size begin -->
        <div class="flex items-center gap-10">
          <div class="text-xl font-bold text-black">Kích cỡ:</div>
          <div class="flex flex-wrap gap-2">
            <button
              @click.prevent="newVariant.size = size"
              v-for="size in sizes"
              :key="size.name"
              :class="[
                newVariant.size?.id == size.id
                  ? 'border-[2px] border-blue-500'
                  : 'border-[0.5px]',
              ]"
              class="w-[75px] h-[55px] border-[0.5px] border-gray-300 text-center rounded hover:opacity-85 focus:outline-none"
            >
              {{ size.name }}
            </button>
          </div>
        </div>
        <!-- size end -->

        <!-- color begin -->
        <div class="flex items-center gap-10">
          <div class="text-xl font-bold text-black">Màu sắc:</div>
          <div class="flex w-[80%] justify-between">
            <div class="flex flex-col justify-center gap-2">
              <label for="colorName" class="text-xl text-black">Tên màu</label>
              <input
                name="colorName"
                id="colorName"
                type="text"
                class="mb-2 w-full h-[55px] border p-3 text-md text-gray-600 border-gray-400 rounded"
                v-model="newVariant.colorName"
                placeholder="Nhập tên màu..."
              />
              <!-- <ErrorMessage name="colorName" class="-mt-2 text-[15px] text-danger" /> -->
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-xl text-black">Ảnh variant</label>
              <div
                class="relative w-[200px] h-[200px] flex items-center justify-center border-2 border-dashed border-slate-200"
              >
                <img
                  v-if="newVariant.image"
                  class="w-[200px] h-[200px] object-contain"
                  :src="newVariant.image.path"
                />
                <div
                  @click="uploadImage('variantImage')"
                  class="cursor-pointer"
                >
                  <ImageIcon
                    :class="newVariant.image ? 'absolute top-2 right-2' : ''"
                  />
                  <div class="absolute top-0 left-0 invisible">
                    <input
                      accept="image/*"
                      type="file"
                      id="variantImage"
                      @change="addVariantImage"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-xl text-black">Thumbnail</label>
              <div
                class="relative w-[200px] h-[200px] flex items-center justify-center border-2 border-dashed border-slate-200"
              >
                <img
                  v-if="newVariant.thumbnail"
                  class="w-[200px] h-[200px] object-contain"
                  :src="newVariant.thumbnail.path"
                />
                <div
                  @click="uploadImage('variantThumbnail')"
                  class="cursor-pointer"
                >
                  <ImageIcon
                    :class="
                      newVariant.thumbnail ? 'absolute top-2 right-2' : ''
                    "
                  />
                  <div class="absolute top-0 left-0 invisible">
                    <input
                      accept="image/*"
                      type="file"
                      id="variantThumbnail"
                      @change="addVariantThumbnail"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- color end -->

        <!-- quantity begin -->
        <div class="flex items-center gap-8">
          <label for="quantity" class="text-xl font-bold text-black"
            >Số lượng:</label
          >
          <div class="flex flex-col gap-2">
            <input
              name="quantity"
              id="quantity"
              type="number"
              v-model="newVariant.quantity"
              class="h-[55px] border mt-2 p-3 text-md text-gray-600 border-gray-400 rounded"
              placeholder="Nhập số lượng..."
            />
            <!-- <ErrorMessage name="quantity" class="text-[15px] text-danger" /> -->
          </div>
        </div>
        <!-- quantity end -->

        <!-- button begin -->
        <div class="flex justify-end">
          <button
            @click.prevent="addNewVariant"
            class="flex gap-2 border px-3 py-2 rounded hover:bg-blue-100"
          >
            <ExpandIcon />
            Thêm variant
          </button>
        </div>
        <!-- button end -->
      </div>
      <!-- new variant end -->

      <div
        class="mt-6 flex flex-shrink-0 flex-wrap items-center justify-center rounded-b-md border-neutral-100 border-opacity-100"
      >
        <button class="btn-basic px-6 py-2 mx-auto" type="submit">
          <Spinner v-if="loading" class="w-6 h-6" />
          <span v-else>Thêm sản phẩm</span>
        </button>
      </div>
    </div>
    <!-- variant end -->
  </Form>
</template>
