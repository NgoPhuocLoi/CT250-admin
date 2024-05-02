<script setup>
import { onMounted, ref } from "vue";
import productService from "@/services/product";
import categoryService from "@/services/category";

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import { FilterMatchMode } from 'primevue/api';

import TableSkeleton from "@/components/skeleton/TableSkeleton.vue";

const products = ref([]);
const menCategoryIds = ref([]);
const womenCategoryIds = ref([]);
const childrenCategoryIds = ref([]);
const fetchingProducts = ref(false);
const filters = ref({});
const selectedProducts = ref([]);

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.EQUALS },
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        rootCategory: { value: null, matchMode: FilterMatchMode.EQUALS },
        price: { value: null, matchMode: FilterMatchMode.EQUALS },
        quantity: { value: null, matchMode: FilterMatchMode.EQUALS },
        visibility: { value: null, matchMode: FilterMatchMode.EQUALS },
    };
};

const clearFilter = () => {
    initFilters();
};

initFilters();

onMounted(async () => {
    await fetchProducts();
});

const fetchProducts = async () => {
    fetchingProducts.value = true;
    try {
        const res = await productService.getByCategories({
            type: "All",
            limit: 100,
        });

        // category 
        const menIdArray = await categoryService.getChildren(1);
        menCategoryIds.value = menIdArray.metadata;
        const womenIdArray = await categoryService.getChildren(3);
        womenCategoryIds.value = womenIdArray.metadata;
        const childrenIdArray = await categoryService.getChildren(2);
        childrenCategoryIds.value = childrenIdArray.metadata;

        // get root category and quantity
        let productArray = res.metadata.products.map(async (product) => {
            let rootCategory = menCategoryIds.value.includes(product.categoryId) ? "Nam" : womenCategoryIds.value.includes(product.categoryId) ? "Nữ" : "Trẻ em";
            let quantity = product.variants.reduce((total, variant) => {
                return total + variant.quantity;
            }, 0);
            return { ...product, rootCategory, quantity, visibility: product.visible === true ? 'Hiển thị' : 'Không hiển thị' }
        })

        products.value = await Promise.all(productArray);

    } catch (error) {
        console.log(error);
    } finally {
        fetchingProducts.value = false;
    }
};

const columnList = [{
    header: "Mã sản phẩm",
    sortable: true,
},
{
    header: "Hình ảnh",
    sortable: false,
},
{
    header: "Tên sản phẩm",
    sortable: true,
},
{
    header: "Danh mục",
    sortable: true,
},
{
    header: "Giá (VND)",
    sortable: true,
},
{
    header: "Số lượng",
    sortable: true,
},
{
    header: "Trạng thái",
    sortable: true,
}];

</script>
<template>
    <div class="card">
        <TableSkeleton :columnList="columnList" v-if="fetchingProducts" />
        <DataTable v-else v-model:selection="selectedProducts" dataKey="id" stripedRows v-model:filters="filters"
            :value="products" filterDisplay="row" :loading="fetchingProducts"
            :globalFilterFields="['id', 'name', 'rootCategory']" sortMode="multiple" paginator resizableColumns
            columnResizeMode="fit"
            paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="{first} đến {last} trong tổng số {totalRecords}" :rows="5"
            :rowsPerPageOptions="[5, 10, 15, 20]" tableStyle="min-width: 50rem">
            <template #header>
                <div class="flex justify-between">
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />
                    <span class="relative">
                        <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
                        <InputText v-model="filters['global'].value" placeholder="Nhập từ khóa tìm kiếm..."
                            class="pl-10 font-normal" />
                    </span>
                </div>
            </template>
            <template #empty> Không có sản phẩm nào. </template>
            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
            <Column field="id" header="Mã sản phẩm" sortable>
                <template #body="slotProps">
                    <RouterLink :to="`/san-pham/${slotProps.data.id}`"
                        class="text-sm font-bold underline-offset-2 underline text-black mx-auto">
                        #{{ slotProps.data.id }}
                    </RouterLink>
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"
                        placeholder="Theo mã" />
                </template>
            </Column>
            <Column header="Hình ảnh">
                <template #body="slotProps">
                    <img class="w-[6rem] shadow-md rounded" :src="slotProps.data.colors[0].productImage.image.path" />
                </template>
            </Column>
            <Column field="name" header="Tên sản phẩm" sortable>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"
                        placeholder="Tìm theo tên sản phẩm" />
                </template>
            </Column>
            <Column field="rootCategory" header="Danh mục" sortable>
                <template #filter="{ filterModel, filterCallback }">
                    <Dropdown v-model="filterModel.value" @change="filterCallback()" :options="['Nam', 'Nữ', 'Trẻ em']"
                        placeholder="Chọn một" class="p-column-filter" :showClear="true">
                        <template #option="slotProps">
                            <Tag :value="slotProps.option"
                                :severity="slotProps.option === 'Nam' ? 'info' : slotProps.option === 'Nữ' ? 'danger' : 'warning'" />
                        </template>
                    </Dropdown>
                </template>
            </Column>
            <Column field="price" header="Giá (VND)" dataType="numeric" sortable>
                <template #body="slotProps">
                    {{ new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(slotProps.data.price) }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputNumber v-model="filterModel.value" @keydown.enter="filterCallback()" class="p-column-filter"
                        placeholder="Lọc theo giá" />
                </template>
            </Column>
            <Column field="quantity" header="Số lượng" dataType="numeric" sortable>
                <template #filter="{ filterModel, filterCallback }">
                    <InputNumber v-model="filterModel.value" @keydown.enter="filterCallback()" class="p-column-filter"
                        placeholder="Lọc theo số lượng" />
                </template>
            </Column>
            <Column field="visibility" header="Trạng thái" sortable>
                <template #body="slotProps">
                    <Tag :value="slotProps.data.visibility"
                        :severity="slotProps.data.visibility === 'Hiển thị' ? 'success' : 'warning'" />
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <Dropdown v-model="filterModel.value" @change="filterCallback()"
                        :options="['Hiển thị', 'Không hiển thị']" placeholder="Chọn một" class="p-column-filter"
                        :showClear="true">
                        <template #option="slotProps">
                            <Tag :value="slotProps.option"
                                :severity="slotProps.option === 'Hiển thị' ? 'success' : 'warning'" />
                        </template>
                    </Dropdown>
                </template>
            </Column>
        </DataTable>
    </div>
</template>
