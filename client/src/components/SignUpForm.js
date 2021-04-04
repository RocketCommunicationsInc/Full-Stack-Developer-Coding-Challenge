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
    <div>
      <h3>Sign Up</h3>
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
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" onClick={handleSubmit}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
