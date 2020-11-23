const initialState = {
    purchaseData : [],

  };
  
  const purchaseReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_PURCHASE_DATA":
        return {
          ...state,
          purchaseData: action.payload,
        };
      
      default:
        return state;
    }
  };
  
  export default purchaseReducer;
  