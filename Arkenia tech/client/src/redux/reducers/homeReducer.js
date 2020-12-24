const initialState = {
  isUser: false,
  isError: false,
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USERHOME_DATA":
      //console.log(action.payload);
      return {
        ...state,
        user: action.payload.user,
        isUser: true,
      };

    default:
      return state;
  }
};

export default homeReducer;
