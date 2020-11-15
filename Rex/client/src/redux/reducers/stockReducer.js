const initialState = {
  stock: [],
};

const stockReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_STOCK_DATA":
      console.log(action.payload);
      return {
        ...state,
        stock: action.payload.sharesDetail,
      };

    default:
      return state;
  }
};

export default stockReducer;
