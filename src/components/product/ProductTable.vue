<script setup>
import { onMounted, ref, watch } from "vue";
import productService from "@/services/product";
import { useRoute } from "vue-router";

const route = useRoute();

const products = ref([]);

const sortOption = ref("Tất cả");
const options = ref(["Tất cả", "Hiển thị", "Không hiển thị"]);

watch(
  () => route.params,
  async () => {
    await fetchProducts();
  }
);

const totalQuantity = (variants) => {
  return variants.reduce((total, variant) => {
    return total + variant.quantity;
  }, 0);
};

onMounted(async () => {
  await fetchProducts();
});

const fetchProducts = async () => {
  try {
    const res = await productService.getByCategories({
      type: "All",
      limit: 10,
    });
    products.value = res.metadata;
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="rounded-sm border border-stroke bg-white shadow-default">
    <!-- Table Header -->
    <div class="grid grid-cols-8 border-t border-stroke py-4.5 px-4 sm:grid-cols-8 md:px-6 2xl:px-7.5">
      <div class="col-span-1 flex mt-7">
        <div class="flex items-center">
          <input id="checkbox-table-search-1" type="checkbox"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
        </div>
      </div>
      <div class="col-span-1 flex flex-col items-center justify-center gap-2">
        <p class="font-medium">Mã sản phẩm</p>
        <input type="text" class="px-3 border rounded-md py-2 outline-none w-[90%]" placeholder="Mã sản phẩm" />
      </div>
      <div class="col-span-2 flex flex-col items-center justify-center gap-2">
        <p class="font-medium">Tên sản phẩm</p>
        <input type="text" class="px-3 border rounded-md py-2 outline-none w-[90%]" placeholder="Tên sản phẩm" />
      </div>
      <div class="col-span-1 flex flex-col items-center justify-center gap-2">
        <p class="font-medium">Danh mục</p>
        <input type="text" class="px-3 border rounded-md py-2 outline-none w-[90%]" placeholder="Danh mục" />
      </div>
      <div class="col-span-1 flex flex-col items-center justify-center gap-2">
        <p class="font-medium">Giá (VND)</p>
        <div class="flex gap-1 px-1">
          <input type="text" class="px-3 border rounded-md py-2 outline-none w-[90%]" placeholder="Từ" />
          <input type="text" class="px-3 border rounded-md py-2 outline-none w-[90%]" placeholder="Đến" />
        </div>
      </div>
      <div class="col-span-1 flex flex-col items-center justify-center gap-2">
        <p class="font-medium">Số lượng</p>
        <div class="flex gap-1 px-1">
          <input type="text" class="px-3 border rounded-md py-2 outline-none w-[90%]" placeholder="Từ" />
          <input type="text" class="px-3 border rounded-md py-2 outline-none w-[90%]" placeholder="Đến" />
        </div>
      </div>
      <div class="col-span-1 flex flex-col items-center justify-center gap-2">
        <p class="font-medium">Trạng thái</p>
        <select class="px-3 border rounded-md py-2 outline-none w-[90%]" v-model="sortOption">
          <option v-for="(option, index) in options" :key="index" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
    </div>

    <!-- Table Rows -->
    <div v-for="product in products" :key="product.id">
      <div class="grid grid-cols-8 border-t border-stroke py-4.5 px-4 sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div class="col-span-1 flex items-center">
          <div class="w-[30%] flex items-center">
            <input id="checkbox-table-search-1" type="checkbox"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
          </div>
          <div class="w-[65%]">
            <img class="w-full" :src="product.colors[0].productImage.image.path" />
          </div>
        </div>
        <div class="col-span-1 hidden items-center justify-center sm:flex">
          <p class="text-sm font-medium text-black">
            {{ product.id }}
          </p>
        </div>
        <div class="col-span-2 flex items-center">
          <p class="text-sm font-medium text-black pl-5">
            {{ product.name }}
          </p>
        </div>
        <div class="col-span-1 hidden items-center justify-center sm:flex">
          <p class="text-sm font-medium text-black">
            {{ product.categoryId }}
          </p>
        </div>
        <div class="col-span-1 hidden items-center justify-center sm:flex">
          <p class="text-sm font-medium text-black">
            <span>{{ new Intl.NumberFormat().format(product.price) }}</span>
          </p>
        </div>
        <div class="col-span-1 hidden items-center justify-center sm:flex">
          <p class="text-sm font-medium text-black">
            <!-- {{ product.quantity }} -->
            {{ totalQuantity(product.variants) }}
          </p>
        </div>
        <div class="col-span-1 hidden items-center justify-center sm:flex">
          <p class="text-sm font-medium text-black">
            {{ product.visible ? "Hiển thị" : "Không hiển thị" }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
