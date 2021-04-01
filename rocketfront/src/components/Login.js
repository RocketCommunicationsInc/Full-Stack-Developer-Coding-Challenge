import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { login } from "../redux/actions/UsersActions";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			email: "",
			password: "",
			errors: "",
		};
	}

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.login({ user: this.state });
		this.props.history.push("/main");
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
		if (this.props.loggedIn) {
			return <Redirect to="/main" />;
		} else {
			return (
				<div>
					<h1>Log In</h1>
					<form onSubmit={this.handleSubmit}>
						<input
							placeholder="username"
							type="text"
							name="username"
							value={this.state.username}
							onChange={this.handleChange}
						/>
						<input
							placeholder="email"
							type="text"
							name="email"
							value={this.state.email}
							onChange={this.handleChange}
						/>
						<input
							placeholder="password"
							type="password"
							name="password"
							value={this.state.password}
							onChange={this.handleChange}
						/>
						<button placeholder="submit" type="submit">
							Log In
						</button>
						<div>
							or <Link to="/signup">Sign Up</Link>
						</div>
					</form>
					<div>{this.state.errors ? this.handleErrors() : null}</div>
				</div>
			);
		}
	}
}

const mSTP = (state) => {
	return {
		loggedIn: state.users.loggedIn,
	};
};

export default connect(mSTP, { login })(Login);
