<template>
  <Breadcrumb v-if="windowSizeStore.isSmallScreen" :breadcrumb="breadcrumb" />
  <div class="w-full lg:w-3/4 lg:ml-4 text-black">
    <div class="rounded shadow-md lg:border-[0.5px] border-gray-300 p-3 w-full h-full">
      <div class="text-2xl lg:text-3xl text-center lg:mb-3 lg:mt-3 font-bold">
        Thông tin cá nhân
      </div>
      <Form @submit="handleUpdateAccountInfo" :validation-schema="userSchema" class="p-5" v-slot="{ values }">
        <!-- full name begin -->
        <div class="flex flex-col w-full">
          <label for="fullName" class="text-lg lg:text-xl"> Họ tên </label>
          <Field type="text" name="fullName" id="fullName" :value="user.fullName"
            class="block w-full p-3 rounded border border-gray-300 mt-3 mb-2" />
        </div>
        <div class="mb-4">
          <ErrorMessage name="fullName" class="text-sm text-red-600" />
        </div>
        <!-- full name begin -->

        <div class="flex flex-col lg:flex-row justify-between">
          <div class="w-full lg:w-[45%]">
            <!-- email begin -->
            <div class="flex flex-col w-full">
              <label for="email" class="text-lg lg:text-xl"> Email </label>
              <Field disabled type="email" name="email" id="email" :value="user.email"
                class="block w-full p-3 rounded border bg-gray-100 cursor-not-allowed border-gray-300 mt-3 mb-2" />
            </div>
            <div class="mb-4">
              <ErrorMessage name="email" class="text-sm text-red-600" />
            </div>
            <!-- email end -->
          </div>

          <div class="w-full lg:w-[45%]">
            <!-- phone begin -->
            <div class="flex flex-col w-full">
              <label for="phone" class="text-lg lg:text-xl">
                Số điện thoại
              </label>
              <Field type="tel" name="phone" id="phone" :value="user.phone"
                class="block w-full p-3 rounded border border-gray-300 mt-3 mb-2" />
            </div>
            <div class="mb-4">
              <ErrorMessage name="phone" class="text-sm text-red-600" />
            </div>
            <!-- phone end -->
          </div>
        </div>

        <div class="flex flex-col lg:flex-row justify-between">
          <div class="lg:w-[45%]">
            <!-- gender begin -->
            <div class="flex flex-col w-full">
              <label for="male" class="text-lg lg:text-xl"> Giới tính </label>
              <div class="flex items-center justify-between w-[75%] lg:p-3 mt-2 mb-2">
                <div class="flex items-center">
                  <Field id="male" name="gender" value="true" type="radio" />
                  <label for="male" class="flex items-center gap-3 text-lg lg:text-xl ml-3 cursor-pointer">
                    <TickRoundIcon v-if="values.gender === undefined
    ? user.gender == true
    : values.gender == 'true'
    " />
                    <EmptyRoundBoxIcon v-else />
                    Nam
                  </label>
                </div>
                <div class="flex items-center">
                  <Field id="female" name="gender" value="false" type="radio" />
                  <label for="female" class="flex items-center gap-3 text-lg lg:text-xl ml-3 cursor-pointer">
                    <TickRoundIcon v-if="values.gender === undefined
    ? user.gender == false
    : values.gender == 'false'
    " />
                    <EmptyRoundBoxIcon v-else />
                    Nữ
                  </label>
                </div>
              </div>
            </div>
            <!-- gender end -->
          </div>

          <div class="lg:w-[45%] mb-8">
            <div class="flex flex-col w-full">
              <label for="birthday" class="text-lg lg:text-xl">
                Ngày sinh
              </label>
              <Field type="date" name="birthday" id="birthday" :value="user.birthday?.slice(0, 10)"
                class="block w-full p-3 rounded border border-gray-300 mt-3 mb-2" placeholder="--/--/----" />
            </div>
          </div>
        </div>
        <button type="submit"
          class="mt-6 w-full text-center py-3 rounded bg-black text-white hover:bg-gray-700 focus:outline-none">
          Lưu chỉnh sửa
        </button>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, toRef } from "vue";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import moment from "moment";

// import { Input, initTWE, Datepicker } from "tw-elements";
import { Input, initTWE } from "tw-elements";
import { useAccountStore, useWindowSizeStore } from "@/stores";
import { TickRoundIcon, EmptyRoundBoxIcon } from "@/components/icons";
import accountService from "@/services/account";
import Breadcrumb from "../common/Breadcrumb.vue";

const breadcrumb = [
  { name: "Tài khoản", slug: "tai-khoan" },
  { name: "Thông tin cá nhân" },
];

const windowSizeStore = useWindowSizeStore();

onMounted(() => {
  // initTWE({ Datepicker, Input });
  initTWE({ Input });
});

const userSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Không được để trống họ tên.")
    .min(2, "Họ tên phải chứa ít nhất 2 ký tự.")
    .max(50, "Họ tên phải chứa nhiều nhất 50 ký tự."),
  email: yup
    .string()
    .required("Không được để trống email.")
    .email("Email không hợp lệ.")
    .max(50, "Email tối đa 50 ký tự."),
  phone: yup
    .string()
    .required("Không được để trống số điện thoại.")
    .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "Số điện thoại không hợp lệ."),
});

const accountStore = useAccountStore();

const user = toRef(() => accountStore.account);

const birthday = ref(
  user.value.birthday === null
    ? null
    : moment(user.value.birthday).format("DD/MM/YYYY")
);

async function handleUpdateAccountInfo(values) {
  delete values.email;
  if (values.gender) {
    values.gender = values.gender == "true";
  }
  try {
    const res = await accountService.updateInfo(values);
    accountStore.setAccount({
      ...res.metadata,
      avatar: accountStore.account.avatar,
    });
    Toast.fire({
      icon: "success",
      title: "Cập nhật thông tin thành công",
    });
  } catch (error) {
    console.log(error);
  }
}

function onClickDateInput() { }
</script>

<style>
[type="radio"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
</style>
