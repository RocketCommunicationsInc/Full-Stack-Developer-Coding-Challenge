import axios from 'axios';

const getContacts = async () => {
  const response = await axios.get(process.env.REACT_APP_API_URL + 'contacts');
  console.log(response);
  return response;
}

export {
  getContacts
}