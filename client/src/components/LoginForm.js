import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuthContext";
import { useHistory } from "react-router-dom";

const LoginForm = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const { user, error, login } = useAuth();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };

  const submit = async () => {
    await login(email, password, remember);
    console.log(user);
  };

  useEffect(() => {
    if (user) {
      history.push("/dashboard");
    } else {
      console.log(error);
    }
  }, [user, error, history]);

  return (
    <div>
      <h3>Login</h3>
      <div>
        <form>
          <div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                value={remember}
                onChange={(e) => setRemember(e.target.value)}
              />
              Remember me
            </label>
          </div>
          <button type="submit" onClick={handleSubmit}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
