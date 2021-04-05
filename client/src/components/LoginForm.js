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
    <div className="rux-card">
      <h3 className="rux-card__header">Login</h3>
      {error ? (
        <div
          className="rux-form-field__validation-message"
          style={{ display: "block", position: "inherit" }}
        >
          {error.error}
        </div>
      ) : null}
      <form className="rux-form-element">
        <div className="rux-card__content">
          <label className="rux-form-field_label">Email</label>
          <input
            className="rux-form-field"
            type="email"
            name="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="rux-card__content">
          <label className="rux-form-field__label">Password</label>
          <input
            className="rux-form-field"
            type="password"
            name="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="rux-card__content">
          <label className="rux-form-field__label"> Remember me</label>
          <input
            className="rux-checkbox"
            type="checkbox"
            value={remember}
            onChange={(e) => setRemember(e.target.value)}
          />
        </div>
        <div className="rux-card__content">
          <button className="rux-button" type="submit" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
