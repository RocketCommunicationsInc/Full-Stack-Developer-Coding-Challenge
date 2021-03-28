const baseUrl = 'http://localhost:5000';

const signUp = (username, password) => {
  console.log('username, password', username, password);
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
      console.log('failed to create user', err);
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
      console.log('data', data);
      if (data) {
        localStorage.setItem('token', data.token);
        return data;
      }
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
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
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
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
};

export { signUp, signIn, getAlerts, getContacts };
