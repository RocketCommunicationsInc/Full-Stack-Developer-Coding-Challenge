// Library Imports
import React, { useState, useEffect } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import axios from 'axios';

// local imports
import SignUpForm from '../components/SignUpForm'
import MainPage from '../components/MainPage';
import NavBar from '../components/NavBar';

const App = () => {
  const [currentUser, setCurrentUser] = useState({ id: null, username: "" });
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    let isMounted = true;
    setLoadingStatus(true);
    axios.get("./api/current_user").then((res) => {
      if (isMounted) {
        debugger
        const user = res.data;
        if (user.id) {
          setCurrentUser(user);
        }
        setLoadingStatus(false);
      }
    });
    return () => { isMounted = false };
  }, []);

  if (loadingStatus) {
    return (
      <div>Loading...</div>
    )
  }

  const SignUpComponent = (
    <SignUpForm
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
      loadingStatus={loadingStatus}
      setLoadingStatus={setLoadingStatus}
    />
  );

  const MainComponent = (
    <MainPage 
    />
  );

  return (
    <main>
      <NavBar />
      <Switch>
        <Route exact path="/" render={() => currentUser.id !== null ? MainComponent : SignUpComponent}/>
        <Route path="/signup" render={() => <div>Signup Page <Link to="/">Login Page</Link></div>}/>
        <Redirect to="/"/>
      </Switch>
    </main>
  )

}

const Test = (props) => {
  const logout = () => {
    axios.delete("/api/session")
    props.setCurrentUser({ id: null, username: "" });
    props.setUsername("");
    props.setPassword("");
  };

  return <button onClick={logout}>Logout</button>
}


export default App;