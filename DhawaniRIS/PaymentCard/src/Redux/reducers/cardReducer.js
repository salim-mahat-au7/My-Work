const initialState = {
  cardData: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CARD_DATA":
      return {
        ...state,
        cardData: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
