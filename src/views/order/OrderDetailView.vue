<script setup>
import { useRoute } from "vue-router";
import CustomerInfo from "@/components/order/CustomerInfor.vue";

const route = useRoute();
</script>
<template>
  <div
    class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
  >
    <h2 class="text-title-md2 font-semibold text-black flex gap-3 items-center">
      <RouterLink to="/don-hang" class="p-2 border rounded hover:opacity-90">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-arrow-left"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
          />
        </svg>
      </RouterLink>
      Chi tiết đơn hàng #{{ route.params.orderId }}
    </h2>
  </div>

  <div class="grid grid-cols-3 gap-5">
    <div class="col-span-2">
      <div class="bg-white border border-[#ccc] rounded">
        <div class="p-4 border-b border-[#ccc]">
          <div class="text-black text-[20px] font-bold">Đơn hàng</div>

          <div v-for="i in 3" class="grid grid-cols-6 gap-3 h-[100px] mt-8">
            <div class="flex items-start justify-center relative">
              <img
                class="w-[100px] h-[100px] rounded border object-cover"
                src="https://demo.evershop.io/assets/catalog/7599/6547/plv3643-Blue-thumb.png"
                alt=""
              />

              <div
                class="w-[30px] h-[30px] rounded-full absolute top-[-10px] right-0 flex items-center justify-center text-sm text-black-2 bg-[#ccc]"
              >
                3
              </div>
            </div>

            <div class="col-span-3 flex flex-col gap-2">
              <p class="text-black font-bold text-lg">
                Seasonal color chuck 70
              </p>

              <div class="flex">
                <span class="text-black block min-w-[70px]">Màu: </span>
                <p>Do</p>
              </div>
              <div class="flex">
                <span class="text-black block min-w-[70px]">Kích cỡ: </span>
                <p>L</p>
              </div>
            </div>

            <div class="text-black flex items-center gap-1 justify-start">
              <span>{{
                new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(100000)
              }}</span>
              x <span>3</span>
            </div>

            <div class="flex items-center text-black justify-end">
              <span>{{
                new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(100000)
              }}</span>
            </div>
          </div>
        </div>

        <div class="p-4 flex justify-end">
          <button
            class="px-4 py-2 bg-blue-500 hover:opacity-90 text-white rounded"
          >
            Xác nhận đơn hàng
          </button>
        </div>
      </div>

      <div class="mt-5 bg-white border border-[#ccc] rounded">
        <div class="p-4 border-b border-[#ccc]">
          <div class="text-black text-[20px] font-bold">Thanh toán</div>

          <div class="grid grid-cols-4 gap-3 text-black mt-5">
            <div>Tổng tiền hàng</div>

            <div class="col-span-2">1 món</div>

            <div class="text-right">
              {{
                new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(100000)
              }}
            </div>
          </div>

          <div class="grid grid-cols-4 gap-3 text-black mt-2">
            <div>Phí vận chuyển</div>

            <div class="col-span-2"></div>

            <div class="text-right">
              {{
                new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(100000)
              }}
            </div>
          </div>

          <div class="grid grid-cols-4 gap-3 text-black mt-2">
            <div>Giảm giá</div>

            <div class="col-span-2"></div>

            <div class="text-right">
              {{
                new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(100000)
              }}
            </div>
          </div>

          <div class="grid grid-cols-4 gap-3 text-black mt-2">
            <div>Thuế</div>

            <div class="col-span-2"></div>

            <div class="text-right">
              {{
                new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(100000)
              }}
            </div>
          </div>

          <div class="grid grid-cols-4 gap-3 text-black mt-2">
            <div class="font-bold">Tổng cộng</div>

            <div class="col-span-2"></div>

            <div class="text-right font-bold">
              {{
                new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(100000)
              }}
            </div>
          </div>
        </div>

        <div class="p-4 flex justify-end">
          <button
            class="px-4 py-2 bg-blue-500 hover:opacity-90 text-white rounded"
          >
            Xác nhận đơn hàng
          </button>
        </div>
      </div>
    </div>
    <div class="bg-white border border-[#ccc] rounded h-fit">
      <CustomerInfo />
    </div>
  </div>
</template>
