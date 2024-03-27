<template>
  <div class="py-5 bg-white min-h-screen flex flex-col">
    <div class="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <div class="px-6 rounded shadow-md border text-black w-full">
        <h1 class="mt-6 mb-8 text-4xl font-bold text-center">Đăng nhập</h1>

        <Form @submit="login" :validation-schema="userSchema" class="mb-12">
          <!-- email begin -->
          <div class="flex flex-col w-full">
            <label for="email" class="text-xl"> Email </label>
            <Field type="email" name="email" id="email" v-model="user.email"
              class="block w-full p-3 rounded border border-gray-300 mt-3 mb-2" />
          </div>
          <div class="mb-4">
            <ErrorMessage name="email" class="text-sm text-red-600" />
          </div>
          <!-- email end -->

          <!-- password begin -->
          <div class="flex flex-col w-full">
            <label for="password" class="text-xl"> Mật khẩu </label>
            <div class="relative">
              <Field type="password" name="password" id="password" v-model="user.password"
                class="block w-full p-3 rounded border border-gray-300 mt-3 mb-2" />
              <!-- show confirm password begin -->
              <div class="absolute right-4 top-[50%] translate-y-[-50%]">
                <img @click="toggleShowPassword('password', 'eyePassword')" id="eyePassword" :src="images.eyeOn"
                  class="hover:cursor-pointer h-8 w-8" />
              </div>
              <!-- show confirm password end -->
            </div>
          </div>
          <div class="mb-4">
            <ErrorMessage name="password" class="text-sm text-red-600" />
          </div>
          <!-- password end -->

          <button type="submit"
            class="mt-6 w-full h-[54px] text-center py-3 rounded bg-black text-white hover:bg-gray-700 focus:outline-none">
            <Spinner v-if="fetching" size="30" />
            <span v-else>Đăng nhập</span>
          </button>

          <div class="my-3 flex">
            <hr class="grow mt-auto mb-auto mr-2">
            <div>Hoặc</div>
            <hr class="grow mt-auto mb-auto ml-2">
          </div>

          <div class="pt-3 w-full flex justify-center">
            <button @click.prevent="loginWithGoogle"
              class="flex justify-center items-center gap-3 w-[55%] h-[54px] py-3 rounded bg-slate-300 hover:bg-slate-700 hover:text-white focus:outline-none">
              <GoogleIcon class="w-[25px] h-[25px]" />
              <Spinner v-if="fetchingLoginWithGoogle" size="30" />
              <span v-else>Đăng nhập bằng Google</span>
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import Spinner from "@/components/common/Spinner.vue";
import AuthService from "@/services/auth";
import uploadService from "@/services/upload";
import router from "@/router";
import { GoogleIcon } from "@/components/icons";

import app from '@/firebase';
const auth = getAuth(app);
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { useAccountStore } from "@/stores";
const accountStore = useAccountStore();

const userSchema = yup.object().shape({
  email: yup
    .string()
    .required("Không được để trống email.")
    .email("Email không hợp lệ.")
    .max(50, "Email tối đa 50 ký tự."),
  password: yup
    .string()
    .required("Không được để trống mật khẩu.")
    .min(8, "Mật khẩu phải chứa ít nhất 8 ký tự."),
});

const images = {
  email:
    "https://cdn1.iconfinder.com/data/icons/contact-us-flat-1/58/008_-_Email-64.png",
  password:
    "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678115-lock-open-64.png",
  eyeOn:
    "https://cdn0.iconfinder.com/data/icons/font-awesome-solid-vol-2/576/eye-64.png",
  eyeOff:
    "https://cdn3.iconfinder.com/data/icons/mix-pack-6/44/Asset_25-64.png",
};

const user = ref({});
const fetching = ref(false);
const fetchingLoginWithGoogle = ref(false);

async function login() {
  try {
    fetching.value = true;
    const res = await AuthService.login(user.value);
    accountStore.setAccount(res.metadata.account);
    localStorage.setItem("accesstoken", res.metadata.tokens.accessToken);
    Toast.fire({
      icon: "success",
      title: "Đăng nhập thành công!",
    });

    router.replace("/");
  } catch (error) {
    Toast.fire({
      icon: "error",
      title: "Nhập sai email hoặc mật khẩu!",
    });
  } finally {
    fetching.value = false;
  }
}

async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = {
        email: result.user.email,
      }
      try {
        fetchingLoginWithGoogle.value = true;
        const res = await AuthService.loginWithGoogle(user);
        accountStore.setAccount(res.metadata.account);
        localStorage.setItem("accesstoken", res.metadata.tokens.accessToken);
        Toast.fire({
          icon: "success",
          title: "Đăng nhập thành công!",
        });
        router.replace("/");
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Đăng nhập bằng Google thất bại!",
        });
      } finally {
        fetchingLoginWithGoogle.value = false;
      }
    }).catch((error) => {
      console.log(error)
    });
}

function toggleShowPassword(id, eyeId) {
  let x = document.getElementById(id);
  let y = document.getElementById(eyeId);
  if (x.type === "password") {
    x.type = "text";
    y.src = images.eyeOff;
  } else {
    x.type = "password";
    y.src = images.eyeOn;
  }
}
</script>

<style></style>
