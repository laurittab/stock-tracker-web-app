//auto imported by nuxt into other pages/components - useState composible takes 2 things, string value as unique key and function responsible for updating the value inside the ocmponent and sets the initial value, an empty string here
//use prefix is popular when creating composables (a function that leverages Vue's Composition API to encapsulate and reuse stateful logic)
// encapsulation prevents external code from being concerned with the internal workings of an object
//auto import by calling function name, e.g.useAvailableColors and store return value insde a constant
export const useSelectorColor = () => useState("selected-color", () => "");
export const useAvailableColors = () =>
  useState("available-colors", () => ["red", "blue", "yellow", "green"]);
export const useStockPage = () => useState("stock-page", () => 1);
export const useLoginStatus = () => useState("logged-in", () => false);
