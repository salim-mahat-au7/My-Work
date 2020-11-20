//card data helper
export const cardDataHelper = (data) => {
  return {
    type: "SET_CARD_DATA",
    payload: data,
  };
};

//get user data with pagination
export const addCardData = (cardData) => {
  return async (dispatch) => {
    try {
      console.log(cardData);
      //
      dispatch(cardDataHelper(cardData));
    } catch (err) {
      console.log("Error in Accepting Card", err.message);
    }
  };
};
