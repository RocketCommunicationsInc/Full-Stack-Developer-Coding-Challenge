import React, {useState} from "react"
import './App.css';
// import "./static/css/astro.css"
import { Route } from "react-router-dom";

import Login from "./Components/Login"
import Signup from "./Components/Signup"

function App() {
  // const [isLoggingIn, setIsLoggingin] = useState(False)
  // const [loginError, setLoginError] = useState(null)
  // const [email, setEmail] = useState("")

  return (
    <div className="App">
      <div className="dark-theme">
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </div>
    </div>
  );
}

export default App;
