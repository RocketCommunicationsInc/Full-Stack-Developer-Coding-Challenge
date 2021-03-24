import axios from "axios";

const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    baseURL: "http://127.0.0.1:5000", //CHANGE BASE URL
  });
};

export default axiosWithAuth;
