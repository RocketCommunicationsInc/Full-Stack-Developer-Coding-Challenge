const baseUrl = '';

const signUp = (username, password) => {
  return fetch(`http://localhost:5000/signup`, {
    methods: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  }).catch(err => {
      console.log("failed to create user")
  });
};

const signIn = (username, password) => {
  return fetch(`http://localhost:5000/signin`, {
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
        console.log("data", data)
      if (data) {
        localStorage.setItem('token', data.token);
        return data;
      }
    });
};

export { signUp, signIn };
