// Library Imports
import axios from 'axios';
import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

// Local Imports

const SignUpForm = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { username: props.username, password: props.password };
    axios.post("/api/session", { user })
      .then((res) => {
        props.setCurrentUser(res.data.user);
        props.setUsername("");
        props.setPassword("");
      })
      .then(() => {
        // <Redirect to={{pathname: '/main'}}/>
        props.history.push('/main')
      })
  } 

  if (props.loadingStatus) {
    return <div>Loading...</div>
  }

  // const logout = () => {
  //   Axios.delete("/api/session")
  //   props.setCurrentUser({ id: null, username: "" });
  //   props.setUsername("");
  //   props.setPassword("");
  // };

  // if (loggedIn) {
  //   return (
  //     <>
  //       <p>{`${props.currentUser.username} is logged in!`}</p>
  //       <button onClick={logout}>Logout</button>
  //     </>
  //   )
  // }

  return (
    <div className="rux-form-field">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={props.username}
          onChange={e => props.setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={props.password}
          onChange={e => props.setPassword(e.target.value)}
          placeholder="Password"
        />
        
        <button>Register!</button>
      </form>
      <p><Link to="/signup">Register!</Link></p>
    </div>
  )
}

export default withRouter(SignUpForm);