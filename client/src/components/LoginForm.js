import React from "react";

const LoginForm = () => {
  return (
    <div>
      <h3 class="title">Login</h3>
      <div>
        <form method="POST" action="/login">
          <div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                autofocus=""
              />
            </div>
          </div>

          <div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Your Password"
              />
            </div>
          </div>
          <div class="field">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
          </div>
          <button>Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
