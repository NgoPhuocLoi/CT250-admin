<script setup>
import { ref, onMounted } from "vue";
import { Form } from "vee-validate";

import ExpandIcon from "@/components/icons/ExpandIcon.vue";
import Spinner from "@/components/common/Spinner.vue";
import AddProductInfo from "@/components/product/AddProductInfo.vue";
import VariantList from "@/components/product/VariantList.vue";
import AddVariantModal from "@/components/product/AddVariantModal.vue";

import colorService from "@/services/color";
import uploadService from "@/services/upload";
import productService from "@/services/product";

import { useProductStore } from "@/stores";
import { useRouter } from "vue-router";

const router = useRouter();
const productStore = useProductStore();

const loading = ref(false);

const handleCreateProduct = async () => {
  // images = await uploadedImages
  const uploadedProductImageIds = await handleUploadProductImages();

  // product = await createProduct
  const product = await productService.create({
    ...productStore.newProduct,
    uploadedImageIds: uploadedProductImageIds,
  });

  console.log("product", product.metadata);

  await Promise.all(
    productStore.variants.map(async (variant) => {
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
    productStore.images.forEach((image) => {
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

onMounted(async () => {
  try {
    productStore.setNewProduct({ visible: true });
    productStore.setImages([]);
    productStore.setVariants([]);
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <Form @submit="handleCreateProduct" :validation-schema="productStore.productSchema">
    <!-- product begin -->
    <div
      class="mb-8 p-8 flex flex-col flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 rounded-md border-none bg-white shadow-lg outline-none">
      <h5 class="mb-6 text-2xl font-bold leading-normal text-neutral-800 text-center w-full">
        Thông tin sản phẩm
      </h5>
      <AddProductInfo />
    </div>
    <!-- product end -->

    <!-- variant begin -->
    <div
      class="p-8 flex flex-col flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 rounded-md border-none bg-white shadow-lg outline-none">
      <h5 class="mb-8 text-2xl font-bold leading-normal text-neutral-800 text-center w-full">
        Thông tin variant
      </h5>
      <VariantList />
      <div class="w-[80%] mt-3 flex justify-end">
        <button @click.prevent class="flex gap-2 border px-3 py-2 rounded hover:bg-blue-100" data-twe-toggle="modal"
          data-twe-target="#addVariantModal" data-twe-ripple-init data-twe-ripple-color="light">
          <ExpandIcon />
          Thêm variant
        </button>
      </div>
      <AddVariantModal />
      <!-- variant end -->

      <div
        class="mt-6 flex flex-shrink-0 flex-wrap items-center justify-center rounded-b-md border-neutral-100 border-opacity-100">
        <button class="btn-basic px-6 py-2 mx-auto" type="submit">
          <Spinner v-if="loading" class="w-6 h-6" />
          <span v-else>Thêm sản phẩm</span>
        </button>
      </div>
    </div>

  </Form>
</template>