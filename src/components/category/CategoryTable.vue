<script setup>
import { onMounted, ref } from "vue";
import categoryService from "@/services/category";

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import { FilterMatchMode } from 'primevue/api';

const categories = ref([]);
const fetchingCategories = ref(false);
const filters = ref({});
const expandedRowGroups = ref();

import SubCategoryList from "@/components/category/SubCategoryList.vue";

const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: { value: null, matchMode: FilterMatchMode.EQUALS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  };
};

const clearFilter = () => {
  initFilters();
};

initFilters();

onMounted(async () => {
  await fetchCategories();
});
const fetchCategories = async () => {
  fetchingCategories.value = true;
  try {
    const res = await categoryService.getAll();
    categories.value = res.metadata;
  } catch (error) {
    console.log(error);
  } finally {
    fetchingCategories.value = false;
  }
};

</script>

<template>
  <div class="card">
    <TableSkeleton :columnList="columnList" v-if="fetchingCategories" />
    <DataTable v-else v-model:expandedRowGroups="expandedRowGroups" expandableRowGroups rowGroupMode="subheader"
      groupRowsBy="id" stripedRows :value="categories" sortMode="single" :sortOrder="1">
      <template #groupheader="slotProps">
        <span class="align-middle ml-2 font-bold leading-6 text-surface-700 dark:text-surface-0/80">{{
      slotProps.data.name }}</span>
      </template>
      <!-- danh muc con begin -->
      <Column field="children">
        <template #body="slotProps">
          <!-- subchild begin -->
          <SubCategoryList :categories="slotProps.data.children" />
          <!-- subchild end -->
        </template>
      </Column>
      <!-- danh muc con end -->
    </DataTable>
  </div>
</template>
