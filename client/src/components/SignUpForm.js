import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuthContext";
import { useHistory } from "react-router-dom";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { user, error, signup } = useAuth();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };

  const submit = async () => {
    await signup(email, name, password);
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
      <h3 className="rux-card__header">Sign Up</h3>
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
          <label className="rux-form-field_label">Password</label>
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
          <label className="rux-form-field_label">Name</label>
          <input
            className="rux-form-field"
            type="text"
            name="name"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="rux-card__content">
          <button rux-button type="submit" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
