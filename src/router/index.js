import DefaultLayout from "@/layouts/DefaultLayout.vue";
import CategoriesView from "@/views/category/CategoriesView.vue";
import ProductsView from "@/views/product/ProductsView.vue";
import OrdersView from "@/views/order/OrdersView.vue";
import AddProductView from "@/views/product/AddProductView.vue";

import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "",
      component: DefaultLayout,
      children: [
        {
          path: "danh-muc-san-pham",
          component: CategoriesView,
        },
        {
          path: "san-pham",
          component: ProductsView,
        },
        {
          path: "san-pham/them",
          component: AddProductView,
        },
        {
          path: "don-hang",
          component: OrdersView,
        },
      ],
    },
  ],
});

export default router;
