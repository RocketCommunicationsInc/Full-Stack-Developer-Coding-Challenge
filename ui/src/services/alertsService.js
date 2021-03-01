import axios from 'axios';

const getAlerts = async () => {
  const response = await axios.get(process.env.REACT_APP_API_URL + 'alerts');
  console.log(response);
  return response;
}

export {
  getAlerts
}