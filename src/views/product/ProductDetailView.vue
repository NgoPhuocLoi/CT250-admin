<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import productService from "@/services/product";
import categoryService from "@/services/category";
import AddProductForm from "@/components/product/AddProductForm.vue";
import { useProductStore } from "@/stores";

const route = useRoute();
const productStore = useProductStore();

onMounted(async () => {
  await fetchProductInformation();
});

async function fetchProductInformation() {
  try {

    const res1 = await productService.getOneById(route.params.productId);
    productStore.setNewProduct({ ...res1.metadata });

    const res2 = await categoryService.getOne(productStore.newProduct.categoryId);
    productStore.setSelectedCategory({
      id: res2.metadata.id,
      name: res2.metadata.name,
      slug: res2.metadata.slug,
      parentId: res2.metadata.parentId,
      createdAt: res2.metadata.createdAt,
      updatedAt: res2.metadata.updatedAt,
    });
    productStore.setImages(productStore.newProduct.images.map((img) => {
      return {
        file: { name: img.image.filename },
        path: img.image.path
      }
    }));

    productStore.setVariants(productStore.newProduct.variants.map((variant) => {
      return {
        ...variant,
        colorName: variant.color.name,
        image: {
          path: variant.color.productImage.image.path,
        },
        thumbnail: {
          path: variant.color.thumbnailImage.path,
        },
        size: {
          name: variant.size.name,
        },
        quantity: variant.quantity,
      }
    }));
  } catch (error) {
    console.log(error);
  }
}

</script>

<template>
  <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <h2 class="text-title-md2 font-semibold text-black flex gap-3 items-center">
      <RouterLink to="/san-pham" class="p-2 border rounded hover:opacity-90">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left"
          viewBox="0 0 16 16">
          <path fill-rule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
        </svg>
      </RouterLink>
      Chi tiết sản phẩm #{{ route.params.productId }}
    </h2>
  </div>
  <AddProductForm />
</template>
