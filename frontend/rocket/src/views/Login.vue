<template>
  <div class="login">
  	<div class="login__container">
  		<h1>Login</h1>
  		<form action="POST" autocomplete="off" @submit.prevent="login(inputs)">
  			<div class="rux-form-field">
  				<label for="username">Username</label>
  				<input class="rux-input" type="text" name="username" id="username" v-model="inputs.username" required>
  			</div>
  			<div class="rux-form-field">
  				<label for="password">Password</label>
  				<input class="rux-input" type="password" name="password" id="password" v-model="inputs.password" required>
  			</div>
  			<button class="rux-button" type="submit">Log In</button>
  		</form>
  	</div>
  </div>
</template>

<script>

	export default {
		data() {
			return {
				inputs: {
					username: null,
					password: null,
				}
			}
		},
		methods: {
			login({ username, password }) {
				this.$store.dispatch('auth/login', { username, password })
					.then(() => this.$router.push('/'))
			}
		}
	}

</script>

<style lang="scss">
	html, body {
		height: 100%;
		position: relative;
		div#app {
			height: 100%;
			position: relative;
		}
	}
	.login {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		&__container {
			display: block;
			padding: 40px;
			max-width: 400px;
			border: 1px solid rgba(#ffffff, 0.2);
			button, label {
				margin-top: 15px;
			}
			h1 {
				font-size: 24px;
			}
		}
	}
</style>
