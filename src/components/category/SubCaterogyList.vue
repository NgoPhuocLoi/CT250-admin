<script setup>
import { ref } from "vue";

const props = defineProps(["subCategories", "level"]);

const subCategories = ref(props.subCategories);
</script>
<template>
  <div v-for="category in subCategories" :key="category.id">
    <div
      class="grid grid-cols-6 border-t border-stroke py-4.5 px-4 sm:grid-cols-8 md:px-6 2xl:px-7.5"
    >
      <div class="flex items-center">
        <div class="flex items-center">
          <input
            id="checkbox-table-search-1"
            type="checkbox"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
        </div>
      </div>
      <div class="col-span-3 flex items-center">
        <div
          :style="{
            marginLeft: props.level * 32 + 'px',
          }"
          class="flex flex-col gap-2 sm:flex-row sm:items-center"
        >
          <div>
            <svg
              v-if="category.child && category.child.length"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
          <p class="text-sm font-medium text-black">
            {{ category.name }}
          </p>
        </div>
      </div>
      <div class="col-span-2 hidden items-center sm:flex">
        <p class="text-sm font-medium text-black">
          {{ category.parentId }}
        </p>
      </div>
      <!-- <div class="col-span-1 flex items-center">
        <p class="text-sm font-medium text-black">${{ product.price }}</p>
      </div>
      <div class="col-span-1 flex items-center">
        <p class="text-sm font-medium text-black">
          {{ product.sold }}
        </p>
      </div>
      <div class="col-span-1 flex items-center">
        <p class="text-sm font-medium text-meta-3">${{ product.profit }}</p>
      </div> -->
    </div>

    <SubCaterogyList
      :sub-categories="category.child"
      :level="props.level + 1"
    />
  </div>
</template>
