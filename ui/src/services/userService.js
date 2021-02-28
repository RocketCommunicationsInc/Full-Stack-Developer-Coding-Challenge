import axios from 'axios';

const requestAccess = async (username, password) => {
  const response = await axios.post(process.env.REACT_APP_API_URL + 'users/login', {"username": username, "password": password});
  console.log(response);
  return response;
}

export {
  requestAccess
}
