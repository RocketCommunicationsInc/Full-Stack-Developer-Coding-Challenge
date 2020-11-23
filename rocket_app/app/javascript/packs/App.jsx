// Library Imports
import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';

// local imports
import SignUpForm from '../components/SignUpForm'
import MainPage from '../components/MainPage';
import NavBar from '../components/NavBar';
import Loading from '../components/Loading';

const App = (props) => {
  const [currentUser, setCurrentUser] = useState({ id: null });
  const [loadingStatus, setLoadingStatus] = useState(false);

  useEffect(() => {
    // displays loading compnent and checks server for logged in User
    let isMounted = true;
    setLoadingStatus(true);
    const findUser = async () => {
      try {
        const res = await axios.get("/api/current_user");
        if (isMounted) {
          const user = res.data;
          setCurrentUser(user);
        }
      } finally {
        setLoadingStatus(false);
      }
    }
    findUser();
    return () => { isMounted = false };
  }, []);

  const logout = () => {
    axios.delete("/api/session")
    setCurrentUser({ id: null, username: "" });
    props.history.push('/')
  };

  if (loadingStatus) {
    return ( 
      <main>
        <NavBar currentUser={currentUser} logout={logout} />
        <section className="content-main">
          <Loading />
        </section>
      </main>
    )
  }
  
  return (
    <main>
      <NavBar currentUser={currentUser} logout={logout} />
      <section className="content-main">
        <Switch>
          <Route exact path="/" render={() => (currentUser && currentUser.id !== null) ? (<Redirect to="/dashboard"/>) :
            (<SignUpForm currentUser={currentUser} setCurrentUser={setCurrentUser} formType="login"/>)}/>
          <Route path="/register" render={() => (currentUser && currentUser.id !== null) ? (<Redirect to="/dashboard"/>) :
            (<SignUpForm currentUser={currentUser} setCurrentUser={setCurrentUser} formType="register"/>)}/>
          <Route path="/dashboard" render={() => (currentUser && currentUser.id !== null) ? (<MainPage />): (<Redirect to="/"/>)}/>
          <Redirect to="/"/>
        </Switch>
      </section>
    </main>
  )

}

export default withRouter(App);