import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const loggedIn = ref(false);
  function login() {
    this.loggedIn = true;
    console.log("store-authentication-login-this.loggedIn", this.loggedIn);
  }
  function logout() {
    this.loggedIn = false;
    console.log("store-authentication-logout-this.loggedIn", this.loggedIn);
  }
  const loggedInStatus = computed(() => loggedIn);
  return {
    loggedIn,
    login,
    logout,
    loggedInStatus,
  };
});
