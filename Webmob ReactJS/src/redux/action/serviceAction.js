import axios from "axios";

// service Data
export const serviceDataHelper = (data) => {
  return {
    type: "SET_SERVICE_DATA",
    payload: data,
  };
};

// get service data
export const getServiceData = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "Get",

        url:
          "https://cors-anywhere.herokuapp.com/https://fir-dynamiclinks-e43dd.web.app/practical-api.json",
      });

      console.log(data);
      dispatch(serviceDataHelper(data.data.purchased_services));
    } catch (err) {
      console.log("Error in getting service data Action", err.message);
    }
  };
};
