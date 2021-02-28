import axios from 'axios';

const getUsers = async () => {
  console.log("here");
  try {
    const response = await axios.get(process.env.REACT_APP_API_URL + '/alerts');
    console.log(response);
  } catch(error) {
    console.log(error);
  }
}

export {
  getUsers
}
