import axios from "axios";

//user data
export const userHomeDataHelper = (data) => {
  return {
    type: "SET_USERHOME_DATA",
    payload: {
      user: data.userData,
    },
  };
};


// user home
export const userHomeData = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "Get",
        url: "http://localhost:5000/api/home/user/home",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      dispatch(userHomeDataHelper(data));
    } catch (err) {
      console.log("Error in user home data Action", err.message);
    }
  };
};

