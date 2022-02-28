<template>
  <section class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white" style="border-radius: 1rem">
            <div class="card-body p-5 text-center">
              <div class="mb-md-5 mt-md-4 pb-5">
                <h2 class="fw-bold mb-2 text-uppercase">Sign In</h2>
                <p class="text-white-50 mb-5">
                  Please enter your email and password!
                </p>

                <form id="rux-form" @submit.prevent="validateUser" @keydown.enter="validateUser">
                  <div class="form-outline form-white mb-4">
                    <div class="group">
                      <div class="field">
                        <rux-input
                          id="email"
                          placeholder="enderwiggin@ifcomm.com"
                          label="Email"
                          type="email"
                          required
                          ruxblur="{handleValidation()}"
                          :modelValue="user.email"
                          @ruxinput="user.email = $event.target.value"
                        ></rux-input>
                      </div>
                    </div>
                    <div class="group">
                      <div class="field">
                        <rux-input
                          id="pw"
                          label="Password"
                          type="password"
                          required
                          :modelValue="user.password"
                          @ruxinput="user.password = $event.target.value"
                        ></rux-input>
                      </div>
                    </div>
                  </div>
                  <p v-if="error">
                    <strong class="text-danger">
                      {{ error }}
                    </strong>
                  </p>

                  <rux-button
                    id="sign-in-btn"
                    class="sign-in-btn btn-lg px-5"
                    type="submit"
                    >Sign in</rux-button
                  >
                </form>

                <p class="mb-0 pt-5">
                  Don't have an account?
                  <a href="/register" class="text-white-50 fw-bold">Sign Up</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { RuxButton } from "@astrouxds/astro-web-components/dist/components/rux-button";
import { RuxInput } from "@astrouxds/astro-web-components/dist/components/rux-input";
import { ref } from "vue";

export default {
  name: "LoginView",
  props: {
    user: {
      firstname: "",
      lastname: "",
      email: "",
    },
  },
  setup() {
    const error = ref(null);
    const user = ref({
      email: "",
      password: "",
    });

    const validateUser = () => {
      if (user.value.email == "" || user.value.password == "") {
        error.value = "Enter email and password."   
        return error
      } 
      else {
        fetch("http://nickloy-fullstack-challenge.herokuapp.com/api/users/login", {
          method: "POST",
          body: JSON.stringify({
            email: user.value.email,
            password: user.value.password,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => {
            if (response.ok) {
              let json = response.json();
              return json;
            } else {
              error.value = "Invalid username or password.";
            }
          })
          .then((json) => {
            if (json.token) {
              localStorage.setItem("token", json.token);
              window.location.href = "/";
            }
          })
      }
    }

    return { user, validateUser, error };
  },
};
</script>

<style>
form {
  margin: 0 auto;
  margin-top: 20px;
  max-width: 330px;
  display: block;
}
.group {
  margin-bottom: 2.25rem;
}
.field {
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
}
.checkbox {
  margin: 0.5rem 0 1rem 0 !important;
  line-height: 1.2;
}
rux-input {
  width: 100%;
}
</style>
