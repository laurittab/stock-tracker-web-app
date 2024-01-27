export const useStockFilter = () => useState("stock-filter", () => "");
export const useStockPage = () => useState("stock-page", () => 1);
export const useSelectedStocks = () => useState("selected-stocks", () => []);
