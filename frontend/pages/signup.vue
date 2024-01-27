<template>
  <div>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          class="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2
          class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
        >
          Sign up to use the app
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <UForm class="space-y-6" action="#" method="POST" @submit="onSubmit">
          <div>
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Email address:</label
            >
            <div class="mt-2">
              <input
                v-model="email"
                id="email"
                name="email"
                type="email"
                placeholder="youremail@gmail.com"
                autocomplete="email"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label
                for="password"
                class="block text-sm font-medium leading-6 text-gray-900"
                placeholder="strong4$Password"
                >Password:</label
              >
            </div>
            <div class="mt-2">
              <input
                v-model="password"
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <UButton
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </UButton>
          </div>
        </UForm>
        <p class="mt-10 text-center text-sm text-gray-500">
          Already signed up?
          <NuxtLink
            class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            to="/login"
            >Go to login</NuxtLink
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/authentication";
const { login } = useAuthStore();
const email = ref("");
const password = ref("");
const loginToken = useCookie("access-token", { expires: setExpiration(1) });

const onSubmit = async () => {
  const reqBody = {
    email: email.value,
    password: password.value,
  };
  console.log("signup-signUp-reqBody", reqBody);
  const { token, message, color } = await addUser(reqBody);
  console.log("signup-response", token, message, color);
  if (token) {
    loginToken.value = token;
    login();
    await navigateTo("/");
  }
  createToast(message, color);
  email.value = "";
  password.value = "";
};
definePageMeta({
  layout: "prelogin",
});
</script>
