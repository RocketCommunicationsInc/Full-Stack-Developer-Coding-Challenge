<template>
  <section class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white" style="border-radius: 1rem">
            <div class="card-body p-5 text-center">
              <div class="mb-md-5 mt-md-4 pb-5">
                <h2 class="fw-bold mb-2 text-uppercase">Sign Up</h2>
                <p class="text-white-50 mb-5">
                  Please enter your email and password!
                </p>

                <form id="new_user_form" @submit.prevent="registerUser" @keydown.enter="registerUser">
                  <div class="form-outline form-white mb-4">
                    <div class="group">
                      <div class="field">
                        <rux-input
                          id="first_name"
                          placeholder="Ender"
                          label="First name"
                          type="text"
                          ruxblur="{handleValidation()}"
                          required
                          :modelValue="new_user.firstname"
                          @ruxinput="new_user.firstname = $event.target.value"
                        ></rux-input>
                        <label
                          class="text-danger"
                          v-if="!new_user.firstname && new_user.submitted"
                          >* Enter first name</label
                        >
                      </div>
                    </div>
                    <div class="group">
                      <div class="field">
                        <rux-input
                          id="lastname"
                          placeholder="Wiggin"
                          label="Last name"
                          type="text"
                          required
                          ruxblur="{handleValidation()}"
                          :modelValue="new_user.lastname"
                          @ruxinput="new_user.lastname = $event.target.value"
                        ></rux-input>
                        <label
                          class="text-danger"
                          v-if="!new_user.lastname && new_user.submitted"
                          >* Enter last name</label
                        >
                      </div>
                    </div>
                    <div class="group">
                      <div class="field">
                        <rux-input
                          id="email"
                          placeholder="enderwiggin@ifcomm.com"
                          label="Email"
                          type="email"
                          required
                          ruxblur="{handleValidation()}"
                          :modelValue="new_user.email"
                          @ruxinput="new_user.email = $event.target.value"
                        ></rux-input>
                        <label
                          class="text-danger"
                          v-if="!new_user.email && new_user.submitted"
                          >* Enter an email address</label
                        >
                      </div>
                    </div>
                    <div class="group">
                      <div class="field">
                        <rux-input
                          id="password"
                          label="Password"
                          required
                          type="password"
                          :modelValue="new_user.password"
                          @ruxinput="new_user.password = $event.target.value"
                        ></rux-input>
                        <label
                          class="text-danger"
                          v-if="!new_user.password && new_user.submitted"
                          >* Enter password</label>
                      </div>
                    </div>
                    <div v-if="error">
                      <p>
                        <strong class="text-danger">
                          {{ error }}
                        </strong>
                      </p>
                    </div>
                    <div class="field">
                      <rux-button
                        id="sign-in-btn"
                        class="sign-in-btn btn-lg"
                        type="submit"
                        >Register</rux-button
                      >
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div v-if="error">
    <p>
      <strong class="text-danger">
        {{ error }}
      </strong>
    </p>
  </div>
</template>

<script>
import { ref } from "vue";
import { RuxButton } from "@astrouxds/astro-web-components/dist/components/rux-button";
import { RuxInput } from "@astrouxds/astro-web-components/dist/components/rux-input";

export default {
  name: "LoginView",
  setup() {
    const error = ref(null);
    const new_user = ref({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      submitted: false,
    });

    const registerUser = (e) => {
      if (
        new_user.value.firstname == "" ||
        new_user.value.lastname == "" ||
        new_user.value.email == "" ||
        new_user.value.password == ""
      ) {
        new_user.value.submitted = true
        return new_user
      }
      else {
        fetch("https://nickloy-fullstack-challenge.herokuapp.com/api/users/register", {
          method: "POST",
          body: JSON.stringify({
            firstname: new_user.value.firstname,
            lastname: new_user.value.lastname,
            email: new_user.value.email,
            password: new_user.value.password,
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
              error.value = "Failed to regsiter user.";
            }
          })
          .then((json) => {
            if (json.token) {
              localStorage.setItem("token", json.token);
              window.location.href = "/";
            }
          });
      }
    };

    return { new_user, registerUser, error };
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
.sign-in-btn {
  margin-left: auto;
}
</style>
