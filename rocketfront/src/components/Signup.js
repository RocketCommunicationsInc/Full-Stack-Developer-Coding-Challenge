import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signup } from "../redux/actions/UsersActions";

class Signup extends Component {
	state = {
		username: "",
		email: "",
		password: "",
		errors: "",
	};

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.signup(this.state);
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
		return (
			<div>
				<h1>Sign Up</h1>
				<form onSubmit={this.handleSubmit}>
					<input
						placeholder="email"
						type="text"
						name="email"
						value={this.state.email}
						onChange={this.handleChange}
					/>
					<input
						placeholder="username"
						type="text"
						name="username"
						value={this.state.username}
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
						Sign Up
					</button>
					<div>
						or <Link to="/login">Log In</Link>
					</div>
				</form>
				<div>{this.state.errors ? this.handleErrors() : null}</div>
			</div>
		);
	}
}

export default connect(null, { signup })(Signup);
