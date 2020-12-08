const initialState = {
  mainData: [],
};

const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SERVICE_DATA":
      //console.log(action.payload);
      return {
        ...state,
        mainData: action.payload,
      };
    default:
      return state;
  }
};

export default serviceReducer;
