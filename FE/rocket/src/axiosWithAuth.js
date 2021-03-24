import axios from "axios";

const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },

    // baseURL: "http://127.0.0.1:5000",
    baseURL: "https://evening-falls-37216.herokuapp.com",
  });
};

export default axiosWithAuth;
