// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@pinia/nuxt" /*, "@nuxtjs/tailwindcss"*/],
  ui: {
    icons: ["mdi"],
  },
  //tailwindcss: { cssPath: "~/assets/css/tailwind.css" },
  app: {
    head: {
      title: "Rita's Stocks",
      meta: [{ name: "description", content: "all my stock picks" }],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
  runtimeConfig: {
    currencyKey: process.env.CURRENCY_API_KEY,
    stocksUri: process.env.STOCKS_URI,
    signupUri: process.env.SIGNUP_URI,
    loginUri: process.env.LOGIN_URI,
    alphaVantageKey: process.env.ALPHA_VANTAGE_API_KEY,
    public: {
      somekey: "this can be exposed to frontend",
    },
  },
});
