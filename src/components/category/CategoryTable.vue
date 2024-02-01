<script setup>
import { ref } from "vue";
import SubCaterogyList from "./SubCaterogyList.vue";

const categories = ref([
  {
    id: 1,
    name: "Nam",
    slug: "nam",
    parentId: null,
    createdAt: "2024-01-28T02:27:46.208Z",
    updatedAt: "2024-01-28T02:27:46.208Z",
    child: [
      {
        id: 4,
        name: "Áo Nam",
        slug: "ao-nam",
        parentId: 1,
        createdAt: "2024-01-28T02:28:36.536Z",
        updatedAt: "2024-01-28T02:28:36.536Z",
        child: [
          {
            id: 8,
            name: "Áo Thun",
            slug: "ao-thun",
            parentId: 4,
            createdAt: "2024-01-28T02:30:14.498Z",
            updatedAt: "2024-01-28T02:30:14.498Z",
          },
          {
            id: 9,
            name: "Áo Polo",
            slug: "ao-polo",
            parentId: 4,
            createdAt: "2024-01-28T02:30:23.233Z",
            updatedAt: "2024-01-28T02:30:23.233Z",
          },
          {
            id: 10,
            name: "Áo Sơ Mi",
            slug: "ao-so-mi",
            parentId: 4,
            createdAt: "2024-01-28T02:30:38.419Z",
            updatedAt: "2024-01-28T02:30:38.419Z",
          },
          {
            id: 11,
            name: "Áo Tanktop",
            slug: "ao-tanktop",
            parentId: 4,
            createdAt: "2024-01-28T02:30:52.168Z",
            updatedAt: "2024-01-28T02:30:52.168Z",
          },
        ],
      },
      {
        id: 5,
        name: "Áo Khoác - Áo Ấm Nam",
        slug: "ao-khoac-ao-am",
        parentId: 1,
        createdAt: "2024-01-28T02:28:58.541Z",
        updatedAt: "2024-01-28T02:28:58.541Z",
        child: [
          {
            id: 12,
            name: "Áo Khoác Kaki",
            slug: "ao-khoac-kaki",
            parentId: 5,
            createdAt: "2024-01-28T02:31:24.009Z",
            updatedAt: "2024-01-28T02:31:24.009Z",
          },
          {
            id: 13,
            name: "Áo Khoác Gió",
            slug: "ao-khoac-gio",
            parentId: 5,
            createdAt: "2024-01-28T02:31:33.780Z",
            updatedAt: "2024-01-28T02:31:33.780Z",
          },
          {
            id: 14,
            name: "Áo Khoác Bomber",
            slug: "ao-khoac-bomber",
            parentId: 5,
            createdAt: "2024-01-28T02:31:46.525Z",
            updatedAt: "2024-01-28T02:31:46.525Z",
          },
          {
            id: 15,
            name: "Áo Khoác Chống Nắng",
            slug: "ao-khoac-chong-nang",
            parentId: 5,
            createdAt: "2024-01-28T02:32:05.490Z",
            updatedAt: "2024-01-28T02:32:05.490Z",
          },
        ],
      },
      {
        id: 6,
        name: "Quần Nam",
        slug: "quan-nam",
        parentId: 1,
        createdAt: "2024-01-28T02:29:18.731Z",
        updatedAt: "2024-01-28T02:29:18.731Z",
        child: [
          {
            id: 16,
            name: "Quần Short",
            slug: "quan-short",
            parentId: 6,
            createdAt: "2024-01-28T02:32:42.639Z",
            updatedAt: "2024-01-28T02:32:42.639Z",
          },
          {
            id: 17,
            name: "Quần Kaki",
            slug: "quan-kaki",
            parentId: 6,
            createdAt: "2024-01-28T02:32:53.995Z",
            updatedAt: "2024-01-28T02:32:53.995Z",
          },
          {
            id: 18,
            name: "Quần Tây",
            slug: "quan-tay",
            parentId: 6,
            createdAt: "2024-01-28T02:33:04.461Z",
            updatedAt: "2024-01-28T02:33:04.461Z",
          },
        ],
      },
      {
        id: 7,
        name: "Đồ Bộ Nam",
        slug: "do-bo-nam",
        parentId: 1,
        createdAt: "2024-01-28T02:29:29.810Z",
        updatedAt: "2024-01-28T02:29:29.810Z",
        child: [],
      },
    ],
  },
  {
    id: 2,
    name: "Nữ",
    slug: "nu",
    parentId: null,
    createdAt: "2024-01-28T02:27:56.418Z",
    updatedAt: "2024-01-28T02:27:56.418Z",
    child: [
      {
        id: 20,
        name: "Áo Nữ",
        slug: "ao-nu",
        parentId: 2,
        createdAt: "2024-01-28T02:34:07.340Z",
        updatedAt: "2024-01-28T02:34:07.340Z",
        child: [
          {
            id: 33,
            name: "Áo Thun",
            slug: "ao-thun",
            parentId: 20,
            createdAt: "2024-01-28T02:37:26.984Z",
            updatedAt: "2024-01-28T02:37:26.984Z",
          },
          {
            id: 34,
            name: "Áo Sơ Mi",
            slug: "ao-so-mi",
            parentId: 20,
            createdAt: "2024-01-28T02:37:40.566Z",
            updatedAt: "2024-01-28T02:37:40.566Z",
          },
          {
            id: 35,
            name: "Áo Kiểu",
            slug: "ao-kieu",
            parentId: 20,
            createdAt: "2024-01-28T02:37:50.781Z",
            updatedAt: "2024-01-28T02:37:50.781Z",
          },
          {
            id: 36,
            name: "Áo Croptop",
            slug: "ao-croptop",
            parentId: 20,
            createdAt: "2024-01-28T02:37:58.904Z",
            updatedAt: "2024-01-28T02:37:58.904Z",
          },
          {
            id: 37,
            name: "Áo Polo",
            slug: "ao-polo",
            parentId: 20,
            createdAt: "2024-01-28T02:38:10.133Z",
            updatedAt: "2024-01-28T02:38:10.133Z",
          },
          {
            id: 38,
            name: "Áo Dệt Kim",
            slug: "ao-det-kim",
            parentId: 20,
            createdAt: "2024-01-28T02:38:22.885Z",
            updatedAt: "2024-01-28T02:38:22.885Z",
          },
          {
            id: 39,
            name: "Áo Len",
            slug: "ao-len",
            parentId: 20,
            createdAt: "2024-01-28T02:38:32.372Z",
            updatedAt: "2024-01-28T02:38:32.372Z",
          },
          {
            id: 40,
            name: "Áo Dài",
            slug: "ao-dai",
            parentId: 20,
            createdAt: "2024-01-28T02:38:41.178Z",
            updatedAt: "2024-01-28T02:38:41.178Z",
          },
        ],
      },
      {
        id: 21,
        name: "Quần Nữ",
        slug: "quan-nu",
        parentId: 2,
        createdAt: "2024-01-28T02:34:15.478Z",
        updatedAt: "2024-01-28T02:34:15.478Z",
        child: [
          {
            id: 41,
            name: "Quần Jeans",
            slug: "quan-jeans",
            parentId: 21,
            createdAt: "2024-01-28T02:39:31.119Z",
            updatedAt: "2024-01-28T02:39:31.119Z",
          },
          {
            id: 42,
            name: "Quần Tây",
            slug: "quan-tay",
            parentId: 21,
            createdAt: "2024-01-28T02:39:46.584Z",
            updatedAt: "2024-01-28T02:39:46.584Z",
          },
          {
            id: 43,
            name: "Quần Kaki",
            slug: "quan-kaki",
            parentId: 21,
            createdAt: "2024-01-28T02:40:02.026Z",
            updatedAt: "2024-01-28T02:40:02.026Z",
          },
          {
            id: 44,
            name: "Quần Short",
            slug: "quan-short",
            parentId: 21,
            createdAt: "2024-01-28T02:40:13.509Z",
            updatedAt: "2024-01-28T02:40:13.509Z",
          },
          {
            id: 45,
            name: "Quần Váy",
            slug: "quan-vay",
            parentId: 21,
            createdAt: "2024-01-28T02:40:24.659Z",
            updatedAt: "2024-01-28T02:40:24.659Z",
          },
          {
            id: 46,
            name: "Quần Baggy",
            slug: "quan-baggy",
            parentId: 21,
            createdAt: "2024-01-28T02:40:35.321Z",
            updatedAt: "2024-01-28T02:40:35.321Z",
          },
          {
            id: 47,
            name: "Quần Legging",
            slug: "quan-legging",
            parentId: 21,
            createdAt: "2024-01-28T02:40:49.311Z",
            updatedAt: "2024-01-28T02:40:49.311Z",
          },
        ],
      },
      {
        id: 19,
        name: "Váy Đầm Nữ",
        slug: "vay-dam-nu",
        parentId: 2,
        createdAt: "2024-01-28T02:33:49.619Z",
        updatedAt: "2024-01-28T02:33:49.619Z",
        child: [
          {
            id: 27,
            name: "Váy Chữ A",
            slug: "vay-chu-a",
            parentId: 19,
            createdAt: "2024-01-28T02:36:00.723Z",
            updatedAt: "2024-01-28T02:36:00.723Z",
          },
          {
            id: 28,
            name: "Váy Babydoll",
            slug: "vay-babydoll",
            parentId: 19,
            createdAt: "2024-01-28T02:36:19.930Z",
            updatedAt: "2024-01-28T02:36:19.930Z",
          },
          {
            id: 29,
            name: "Váy Suông",
            slug: "vay-suong",
            parentId: 19,
            createdAt: "2024-01-28T02:36:31.159Z",
            updatedAt: "2024-01-28T02:36:31.159Z",
          },
          {
            id: 30,
            name: "Váy Maxi",
            slug: "vay-maxi",
            parentId: 19,
            createdAt: "2024-01-28T02:36:43.232Z",
            updatedAt: "2024-01-28T02:36:43.232Z",
          },
          {
            id: 31,
            name: "Váy Ôm",
            slug: "vay-om",
            parentId: 19,
            createdAt: "2024-01-28T02:36:52.552Z",
            updatedAt: "2024-01-28T02:36:52.552Z",
          },
          {
            id: 32,
            name: "Váy Oversize",
            slug: "vay-oversize",
            parentId: 19,
            createdAt: "2024-01-28T02:37:03.277Z",
            updatedAt: "2024-01-28T02:37:03.277Z",
          },
        ],
      },
      {
        id: 23,
        name: "Áo Khoác Nữ",
        slug: "ao-khoac-nu",
        parentId: 2,
        createdAt: "2024-01-28T02:34:44.495Z",
        updatedAt: "2024-01-28T02:34:44.495Z",
        child: [
          {
            id: 53,
            name: "Áo Khoác Jeans",
            slug: "ao-khoac-jeans",
            parentId: 23,
            createdAt: "2024-01-28T02:42:24.399Z",
            updatedAt: "2024-01-28T02:42:24.399Z",
          },
          {
            id: 54,
            name: "Áo Khoác Blazer",
            slug: "ao-khoac-blazer",
            parentId: 23,
            createdAt: "2024-01-28T02:42:40.356Z",
            updatedAt: "2024-01-28T02:42:40.356Z",
          },
          {
            id: 55,
            name: "Áo Khoác Nỉ",
            slug: "ao-khoac-ni",
            parentId: 23,
            createdAt: "2024-01-28T02:42:47.076Z",
            updatedAt: "2024-01-28T02:42:47.076Z",
          },
          {
            id: 56,
            name: "Áo Khoác Kaki",
            slug: "ao-khoac-kaki",
            parentId: 23,
            createdAt: "2024-01-28T02:42:56.030Z",
            updatedAt: "2024-01-28T02:42:56.030Z",
          },
          {
            id: 57,
            name: "Áo Khoác Chống Nắng",
            slug: "ao-khoac-chong-nang",
            parentId: 23,
            createdAt: "2024-01-28T02:43:07.576Z",
            updatedAt: "2024-01-28T02:43:07.576Z",
          },
          {
            id: 58,
            name: "Áo Khoác Măng Tô",
            slug: "ao-khoac-mang-to",
            parentId: 23,
            createdAt: "2024-01-28T02:43:20.237Z",
            updatedAt: "2024-01-28T02:43:20.237Z",
          },
        ],
      },
      {
        id: 22,
        name: "Chân Váy Nữ",
        slug: "chan-vay-nu",
        parentId: 2,
        createdAt: "2024-01-28T02:34:26.643Z",
        updatedAt: "2024-01-28T02:34:26.643Z",
        child: [
          {
            id: 48,
            name: "Chân Váy Chữ A",
            slug: "chan-vay-chu-a",
            parentId: 22,
            createdAt: "2024-01-28T02:41:12.787Z",
            updatedAt: "2024-01-28T02:41:12.787Z",
          },
          {
            id: 49,
            name: "Chân Váy Xếp Ly",
            slug: "chan-vay-xep-ly",
            parentId: 22,
            createdAt: "2024-01-28T02:41:24.865Z",
            updatedAt: "2024-01-28T02:41:24.865Z",
          },
          {
            id: 50,
            name: "Chân Váy Dáng Suông",
            slug: "chan-vay-dang-suong",
            parentId: 22,
            createdAt: "2024-01-28T02:41:35.364Z",
            updatedAt: "2024-01-28T02:41:35.364Z",
          },
          {
            id: 51,
            name: "Chân Váy Dáng Ôm",
            slug: "chan-vay-dang-om",
            parentId: 22,
            createdAt: "2024-01-28T02:41:46.147Z",
            updatedAt: "2024-01-28T02:41:46.147Z",
          },
          {
            id: 52,
            name: "Chân Váy Dáng Xòe",
            slug: "chan-vay-dang-xoe",
            parentId: 22,
            createdAt: "2024-01-28T02:41:51.237Z",
            updatedAt: "2024-01-28T02:41:51.237Z",
          },
        ],
      },
      {
        id: 25,
        name: "Set Nữ",
        slug: "set-nu",
        parentId: 2,
        createdAt: "2024-01-28T02:35:12.437Z",
        updatedAt: "2024-01-28T02:35:12.437Z",
        child: [
          {
            id: 59,
            name: "Set Váy",
            slug: "set-vay",
            parentId: 25,
            createdAt: "2024-01-28T02:44:01.312Z",
            updatedAt: "2024-01-28T02:44:01.312Z",
          },
          {
            id: 60,
            name: "Set Quần",
            slug: "set-quan",
            parentId: 25,
            createdAt: "2024-01-28T02:44:10.619Z",
            updatedAt: "2024-01-28T02:44:10.619Z",
          },
        ],
      },
      {
        id: 24,
        name: "Đồ Bộ Nữ",
        slug: "do-bo-nu",
        parentId: 2,
        createdAt: "2024-01-28T02:34:57.448Z",
        updatedAt: "2024-01-28T02:34:57.448Z",
        child: [],
      },
      {
        id: 26,
        name: "Yếm",
        slug: "yem",
        parentId: 2,
        createdAt: "2024-01-28T02:35:22.712Z",
        updatedAt: "2024-01-28T02:35:22.712Z",
        child: [],
      },
    ],
  },
  {
    id: 3,
    name: "Trẻ em",
    slug: "tre-em",
    parentId: null,
    createdAt: "2024-01-28T02:28:06.253Z",
    updatedAt: "2024-01-28T02:28:06.253Z",
    child: [
      {
        id: 61,
        name: "Áo Bé Gái",
        slug: "ao-be-gai",
        parentId: 3,
        createdAt: "2024-01-28T02:44:43.987Z",
        updatedAt: "2024-01-28T02:44:43.987Z",
        child: [
          {
            id: 67,
            name: "Áo Thun",
            slug: "ao-thun",
            parentId: 61,
            createdAt: "2024-01-28T02:46:26.520Z",
            updatedAt: "2024-01-28T02:46:26.520Z",
          },
          {
            id: 70,
            name: "Áo Polo",
            slug: "ao-polo",
            parentId: 61,
            createdAt: "2024-01-28T02:46:50.529Z",
            updatedAt: "2024-01-28T02:46:50.529Z",
          },
          {
            id: 71,
            name: "Áo Sơ Mi",
            slug: "ao-so-mi",
            parentId: 61,
            createdAt: "2024-01-28T02:47:01.718Z",
            updatedAt: "2024-01-28T02:47:01.718Z",
          },
          {
            id: 74,
            name: "Áo Khoác",
            slug: "ao-khoac",
            parentId: 61,
            createdAt: "2024-01-28T02:47:13.982Z",
            updatedAt: "2024-01-28T02:47:13.982Z",
          },
        ],
      },
      {
        id: 64,
        name: "Quần Bé Trai",
        slug: "quan-be-trai",
        parentId: 3,
        createdAt: "2024-01-28T02:45:22.087Z",
        updatedAt: "2024-01-28T02:45:22.087Z",
        child: [
          {
            id: 76,
            name: "Quần Jeans",
            slug: "quan-jeans",
            parentId: 64,
            createdAt: "2024-01-28T02:47:41.724Z",
            updatedAt: "2024-01-28T02:47:41.724Z",
          },
          {
            id: 77,
            name: "Quần Short",
            slug: "quan-short",
            parentId: 64,
            createdAt: "2024-01-28T02:47:52.946Z",
            updatedAt: "2024-01-28T02:47:52.946Z",
          },
          {
            id: 79,
            name: "Quần Kaki",
            slug: "quan-kaki",
            parentId: 64,
            createdAt: "2024-01-28T02:48:10.783Z",
            updatedAt: "2024-01-28T02:48:10.783Z",
          },
          {
            id: 80,
            name: "Quần Vải",
            slug: "quan-vai",
            parentId: 64,
            createdAt: "2024-01-28T02:48:16.409Z",
            updatedAt: "2024-01-28T02:48:16.409Z",
          },
        ],
      },
      {
        id: 62,
        name: "Áo Bé Trai",
        slug: "ao-be-trai",
        parentId: 3,
        createdAt: "2024-01-28T02:44:56.808Z",
        updatedAt: "2024-01-28T02:44:56.808Z",
        child: [
          {
            id: 68,
            name: "Áo Thun",
            slug: "ao-thun",
            parentId: 62,
            createdAt: "2024-01-28T02:46:35.183Z",
            updatedAt: "2024-01-28T02:46:35.183Z",
          },
          {
            id: 69,
            name: "Áo Polo",
            slug: "ao-polo",
            parentId: 62,
            createdAt: "2024-01-28T02:46:46.843Z",
            updatedAt: "2024-01-28T02:46:46.843Z",
          },
          {
            id: 72,
            name: "Áo Sơ Mi",
            slug: "ao-so-mi",
            parentId: 62,
            createdAt: "2024-01-28T02:47:04.028Z",
            updatedAt: "2024-01-28T02:47:04.028Z",
          },
          {
            id: 73,
            name: "Áo Khoác",
            slug: "ao-khoac",
            parentId: 62,
            createdAt: "2024-01-28T02:47:11.929Z",
            updatedAt: "2024-01-28T02:47:11.929Z",
          },
        ],
      },
      {
        id: 63,
        name: "Quần Bé Gái",
        slug: "quan-be-gai",
        parentId: 3,
        createdAt: "2024-01-28T02:45:14.900Z",
        updatedAt: "2024-01-28T02:45:14.900Z",
        child: [
          {
            id: 75,
            name: "Quần Jeans",
            slug: "quan-jeans",
            parentId: 63,
            createdAt: "2024-01-28T02:47:39.627Z",
            updatedAt: "2024-01-28T02:47:39.627Z",
          },
          {
            id: 78,
            name: "Quần Short",
            slug: "quan-short",
            parentId: 63,
            createdAt: "2024-01-28T02:47:55.436Z",
            updatedAt: "2024-01-28T02:47:55.436Z",
          },
        ],
      },
      {
        id: 66,
        name: "Chân Váy",
        slug: "chan-vay",
        parentId: 3,
        createdAt: "2024-01-28T02:45:57.976Z",
        updatedAt: "2024-01-28T02:45:57.976Z",
        child: [],
      },
      {
        id: 65,
        name: "Đầm Bé Gái",
        slug: "dam-be-gai",
        parentId: 3,
        createdAt: "2024-01-28T02:45:43.080Z",
        updatedAt: "2024-01-28T02:45:43.080Z",
        child: [],
      },
    ],
  },
]);
</script>

<template>
  <div class="rounded-sm border border-stroke bg-white shadow-default">
    <!-- Table Header -->
    <div
      class="grid grid-cols-6 border-t border-stroke py-4.5 px-4 sm:grid-cols-8 md:px-6 2xl:px-7.5"
    >
      <div class="col-span-1 flex items-center">
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
        <p class="font-medium">Tên danh mục</p>
      </div>
      <div class="col-span-2 hidden items-center sm:flex">
        <p class="font-medium">Danh mục cha</p>
      </div>
    </div>

    <!-- Table Rows -->
    <div v-for="category in categories" :key="category.id">
      <div
        class="grid grid-cols-6 border-t border-stroke py-4.5 px-4 sm:grid-cols-8 md:px-6 2xl:px-7.5"
      >
        <div class="col-span-1 flex items-center">
          <div class="flex items-center">
            <input
              id="checkbox-table-search-1"
              type="checkbox"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label for="checkbox-table-search-1" class="sr-only"
              >checkbox</label
            >
          </div>
        </div>
        <div class="col-span-3 flex items-center">
          <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div>
              <svg
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

      <SubCaterogyList :sub-categories="category.child" :level="1" />
    </div>
  </div>
</template>
