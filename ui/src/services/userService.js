import axios from 'axios';

const requestAccess = async (username, password) => {
  const response = await axios.post(process.env.REACT_APP_API_URL + 'users/login', {"username": username, "password": password});
  console.log(response);
  return response;
}

const register = async (username, password) => {
  const response = await axios.put(process.env.REACT_APP_API_URL + 'users/register', {"username": username, "password": password});
  console.log(response);
  return response;
}

export {
  requestAccess,
  register
}
