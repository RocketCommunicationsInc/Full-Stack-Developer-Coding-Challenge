import React, {useState} from "react"
import './App.css';
import { Route } from "react-router-dom";

import Login from "./Components/Login"

function App() {
  // const [isLoggingIn, setIsLoggingin] = useState(False)
  // const [loginError, setLoginError] = useState(null)
  // const [email, setEmail] = useState("")

  return (
    <div className="App">
      <div className="dark-theme">
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
      </div>
    </div>
  );
}

export default App;
