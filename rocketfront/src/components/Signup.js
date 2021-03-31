import React, { Component } from "react";
import axios from "axios";

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			username: "",
			password: "",
			password_confirmation: "",
			errors: "",
		};
	}

	componentWillMount() {
		return this.props.loggedInStatus ? this.redirect() : null;
	}

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const { email, username, password, password_confirmation } = this.state;

		let user = {
			email: email,
			username: username,
			password: password,
			password_confirmation: password_confirmation,
		};

		axios
			.post("http://localhost:3001/users", { user }, { withCredentials: true })
			.then((resp) => {
				if (resp.data.status === "created") {
					this.props.handleLogin(resp.data);
					this.redirect();
				} else {
					this.setState({
						errors: resp.data.errors,
					});
				}
			})
			.catch((error) => console.log("api errors:", error));
	};

	redirect = () => {
		this.props.history.push("/");
	};

	handleErrors = () => {
		return (
			<div>
				<ul>
					{this.state.errors.map((error) => {
						return <li key={error}>{error}</li>;
					})}
				</ul>
			</div>
		);
	};

	render() {
		const { email, username, password, password_confirmation } = this.state;

		return (
			<div>
				<h1>Sign Up</h1>
				<form onSubmit={this.handleSubmit}>
					<input
						placeholder="email"
						type="text"
						name="email"
						value={email}
						onChange={this.handleChange}
					/>
					<input
						placeholder="username"
						type="text"
						name="username"
						value={username}
						onChange={this.handleChange}
					/>
					<input
						placeholder="password"
						type="password"
						name="password"
						value={password}
						onChange={this.handleChange}
					/>
					<input
						placeholder="password confirmation"
						type="password"
						name="password_confirmation"
						value={password_confirmation}
						onChange={this.handleChange}
					/>

					<button placeholder="submit" type="submit">
						Sign Up
					</button>
				</form>
				<div>{this.state.errors ? this.handleErrors() : null}</div>
			</div>
		);
	}
}
export default Signup;
