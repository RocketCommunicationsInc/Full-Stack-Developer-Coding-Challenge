const baseUrl = 'https://awong-rocket.herokuapp.com';

const signUp = (username, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      if (data) {
        localStorage.setItem('token', data.token);
        return data;
      }
    })
    .catch((err) => {
      console.log('Failed to create user', err);
    });
};

const signIn = (username, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      if (data) {
        localStorage.setItem('token', data.token);
        return data;
      }
    })
    .catch((err) => {
      console.log('Failed to sign in', err);
    });
};

const getAlerts = (token) => {
  return fetch(`${baseUrl}/alerts`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((err) => {
      console.log('Failed to get alerts', err);
    });
};

const getContacts = (token) => {
  return fetch(`${baseUrl}/contacts`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((err) => {
      console.log('Failed to get contacts', err);
    });
};

export { signUp, signIn, getAlerts, getContacts };
