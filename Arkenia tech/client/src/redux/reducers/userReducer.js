const initialState = {
  user: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_USERDELETE_DATA":
      return {
        ...state,
        user: initialState,
      };
    default:
      return state;
  }
};

export default userReducer;
