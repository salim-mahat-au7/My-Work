import axios from "axios";

//user register to the website
export const userContact = (userRegisterCredentials, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "Post",
        url: "http://localhost:5000/api/user/register",
        data: userRegisterCredentials,
      });
      alert(data.message);
    } catch (err) {
      console.log("Error in userRegister Action", err.message);
      alert(err.response.data);
    }
  };
};

