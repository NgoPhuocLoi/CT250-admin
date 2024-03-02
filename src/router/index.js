import DefaultLayout from "@/layouts/DefaultLayout.vue";
import CategoriesView from "@/views/category/CategoriesView.vue";
import ProductsView from "@/views/product/ProductsView.vue";
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
      ],
    },
  ],
});

export default router;
