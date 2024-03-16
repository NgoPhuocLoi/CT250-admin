import DefaultLayout from "@/layouts/DefaultLayout.vue";
import CategoriesView from "@/views/category/CategoriesView.vue";
import ProductsView from "@/views/product/ProductsView.vue";
import OrdersView from "@/views/order/OrdersView.vue";
import OrderDetailView from "@/views/order/OrderDetailView.vue";
import AddProductView from "@/views/product/AddProductView.vue";
import CouponsView from "@/views/coupon/CouponsView.vue";
import CouponDetailView from "@/views/coupon/CouponDetailView.vue";
import ProductDetailView from "@/views/product/ProductDetailView.vue";
import Dashboard from "@/views/dashboard/Dashboard.vue";

import { createRouter, createWebHistory } from "vue-router";
import CouponAddView from "@/views/coupon/CouponAddView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "",
      component: DefaultLayout,
      children: [
        {
          path: "",
          component: Dashboard,
        },
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
          path: "san-pham/:productId",
          component: ProductDetailView,
        },
        {
          path: "don-hang",
          component: OrdersView,
        },
        {
          path: "don-hang/:orderId",
          component: OrderDetailView,
        },
        {
          path: "ma-giam-gia",
          component: CouponsView,
        },

        {
          path: "ma-giam-gia/chinh-sua/:couponCode",
          component: CouponDetailView,
        },
        {
          path: "ma-giam-gia/them",
          component: CouponAddView,
        },
      ],
    },
  ],
});

export default router;
