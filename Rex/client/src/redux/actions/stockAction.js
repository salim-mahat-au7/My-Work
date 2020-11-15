import { GET_STOCK_DATA, SET_STOCK_DATA } from "../../types/sharesType";

export const setStockData = (stock = null) => {
  if (stock) {
    return {
      type: SET_STOCK_DATA,
      payload: stock,
    };
  }
};

export const getStockData = () => {
  return { type: GET_STOCK_DATA };
};
