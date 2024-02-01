import DefaultLayout from "@/layouts/DefaultLayout.vue";
import CategoriesViewVue from "@/views/category/CategoriesView.vue";
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
          component: CategoriesViewVue,
        },
      ],
    },
  ],
});

export default router;
