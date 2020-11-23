import axios from "axios";

//user login helper
export const purchaseDataHelper = (data) => {
  return {
    type: "SET_PURCHASE_DATA",
    payload: data
  };
};

export const getPurchaseData = () => {
    return async (dispatch) => {
      try {
        const { data } = await axios.get(
          `https://jsonkeeper.com/b/356L`
        );
        console.log(data);
        //
        dispatch(purchaseDataHelper(data));
      } catch (err) {
        console.log("Error in Get Purchase action Data", err.message);
      }
    };
  };
  