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
import CouponAddView from "@/views/coupon/CouponAddView.vue";
import LoginForm from "@/components/auth/LoginForm.vue";

import { createRouter, createWebHistory } from "vue-router";
import authService from "@/services/auth";
import store, { useAccountStore, useLoadingStore } from "@/stores";

const loadingStore = useLoadingStore(store);
const accountStore = useAccountStore(store);

const authenticateUser = async (to, from) => {
  const accessToken = localStorage["accesstoken"];

  if (!accessToken) return { name: "Login" };

  try {
    loadingStore.startLoading();
    const loggedInAccount = await authService.getLoggedInAccount(accessToken);
    accountStore.setAccount(loggedInAccount.metadata);
    return true;
  } catch (error) {
    console.log(error);
    return { name: "Login" };
  } finally {
    loadingStore.endLoading();
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/dang-nhap",
      component: LoginForm,
      name: "Login",
    },
    {
      path: "/",
      beforeEnter: authenticateUser,
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
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  },
});

export default router;
