<script setup>
import { useRouter } from "vue-router";
import {
  DISCOUNT_PERCENTAGE,
  DISCOUNT_TITLE_MAPPING,
} from "../constant/discountType";
import { getDateString } from "@/utils";
import DetailPageSection from "../common/DetailPageSection.vue";
import couponService from "@/services/coupon";

const props = defineProps(["coupon", "mode"]);

const router = useRouter();

async function handleUpdateCoupon(updatedData) {
  console.log(updatedData);
  Object.keys(updatedData).forEach((key) => {
    if (!isNaN(updatedData[key]) && typeof updatedData[key] !== "boolean") {
      updatedData[key] = parseInt(updatedData[key]);
    }
    if (updatedData[key] == props.coupon[key]) {
      delete updatedData[key];
    }
  });

  return couponService.updateCoupon(props.coupon.id, updatedData);
}

async function submitHandler(coupon) {
  return props.mode === "add"
    ? couponService.createCoupon(coupon)
    : handleUpdateCoupon(coupon);
}

async function handleSubmit(e) {
  e.preventDefault();
  const coupon = Object.fromEntries(new FormData(e.target));

  coupon.visible = coupon.visible === "on";

  try {
    await submitHandler(coupon);
    Swal.fire({
      title: "Thành công",
      text: `${
        props.mode === "add" ? "Thêm" : "Cập nhật"
      } mã giảm giá thành công`,
      icon: "success",
    }).then(() => {
      router.push("/ma-giam-gia");
    });
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Thất bại",
      text: `Có lỗi xảy ra khi ${
        props.mode === "add" ? "Thêm" : "Cập nhật"
      } mã giảm giá`,
      icon: "error",
    });
  }
}
</script>
<template>
  <form action="" @submit="handleSubmit">
    <div class="grid grid-cols-3 gap-5">
      <div class="col-span-2">
        <DetailPageSection title="Thông tin chung">
          <div class="grid grid-cols-2 gap-x-10 gap-y-4">
            <div class="flex flex-col gap-1">
              <label for="">Coupon code</label>
              <input
                required
                maxlength="8"
                minlength="8"
                name="code"
                type="text"
                :value="coupon?.code"
                class="py-2 px-4 border rounded border-[#bbb] w-full"
              />
            </div>

            <div class="">
              <div class="flex flex-col gap-1">
                <label for="">Trạng thái</label>
                <div class="flex gap-2 mt-2">
                  <input
                    type="checkbox"
                    :checked="coupon?.visible"
                    class="py-2 px-4 border rounded border-[#bbb]"
                    name="visible"
                  />
                  <label for="">Hiển thị</label>
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-1">
              <label for="">Ngày bắt đầu</label>
              <input
                required
                type="date"
                :value="getDateString(coupon?.startDate)"
                class="py-2 px-4 border rounded border-[#bbb] w-full"
                name="startDate"
              />
            </div>

            <div class="flex flex-col gap-1">
              <label for="">Ngày kết thúc</label>
              <input
                required
                type="date"
                :value="getDateString(coupon?.endDate)"
                class="py-2 px-4 border rounded border-[#bbb] w-full"
                name="endDate"
              />
            </div>
          </div>
        </DetailPageSection>

        <div class="mt-5">
          <DetailPageSection title="Số lượng">
            <div class="grid grid-cols-3 gap-x-10 gap-y-4">
              <div class="flex flex-col gap-1">
                <label for="">Tổng số lượng</label>
                <input
                  required
                  type="number"
                  min="1"
                  :value="coupon?.quantity"
                  class="py-2 px-4 border rounded border-[#bbb] w-full"
                  name="quantity"
                />
              </div>

              <div v-if="mode === 'edit'" class="flex flex-col gap-1">
                <label for="">Số lượng đã được lấy</label>
                <input
                  type="text"
                  :value="coupon?.collectedQuantity"
                  class="py-2 px-4 border rounded border-[#bbb] w-full disabled:bg-[#ddd]"
                  disabled
                />
              </div>

              <div v-if="mode === 'edit'" class="flex flex-col gap-1">
                <label for="">Số lượng đã dùng</label>
                <input
                  type="text"
                  :value="coupon?.currentUse"
                  class="py-2 px-4 border rounded border-[#bbb] w-full disabled:bg-[#ddd]"
                  disabled
                />
              </div>
            </div>
          </DetailPageSection>
        </div>
      </div>
      <div class="col-span-1">
        <DetailPageSection title="Điều kiện đơn hàng">
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-1 col-span-2">
              <label for="">Giá trị đơn hàng tối thiểu</label>
              <input
                type="number"
                :value="coupon ? coupon.minimumPriceToUse : 0"
                class="py-2 px-4 border rounded border-[#bbb]"
                name="minimumPriceToUse"
              />
            </div>
          </div>
        </DetailPageSection>

        <div class="mt-5">
          <DetailPageSection title="Loại giảm giá">
            <div class="grid grid-cols-2 gap-4">
              <div class="flex flex-col gap-1 col-span-2">
                <div>
                  <div
                    v-for="(title, discountType) in DISCOUNT_TITLE_MAPPING"
                    class="flex gap-2"
                  >
                    <input
                      type="radio"
                      :value="discountType"
                      name="discountType"
                      :checked="
                        coupon
                          ? coupon.discountType === discountType
                          : discountType === DISCOUNT_PERCENTAGE
                      "
                      :id="discountType"
                      class="py-2 px-4 border rounded border-[#bbb]"
                    />
                    <label :for="discountType">{{ title }}</label>
                  </div>
                </div>
              </div>

              <div class="flex flex-col gap-1 col-span-2 pb-5">
                <label for="">Giá trị giảm</label>
                <input
                  type="number"
                  required
                  min="1"
                  :value="coupon?.discountValue"
                  name="discountValue"
                  class="py-2 px-4 border rounded border-[#bbb]"
                />
              </div>
            </div>
          </DetailPageSection>
        </div>
      </div>
    </div>

    <div class="mt-5 flex gap-5 justify-end">
      <button
        @click="router.go(-1)"
        class="bg-white border border-[#ccc] px-5 py-2 text-black rounded hover:opacity-90"
        type="button"
      >
        Hủy
      </button>
      <button
        type="submit"
        class="bg-blue-500 px-5 py-2 text-white rounded hover:opacity-90"
      >
        Lưu
      </button>
    </div>
  </form>
</template>
