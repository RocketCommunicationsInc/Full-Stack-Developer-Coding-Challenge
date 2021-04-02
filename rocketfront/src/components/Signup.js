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
			<div className="home">
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
			<div className="home">
				<div className="inForm">
					<h1>Sign Up</h1>
					<form className="rux-form-field" onSubmit={this.handleSubmit}>
						<div className="rux-form-field">
							<label for="input__text">Username</label>
							<input
								id="input__text"
								class="rux-input"
								required
								placeholder="username"
								type="text"
								name="username"
								value={this.state.username}
								onChange={this.handleChange}
							/>
						</div>
						<div className="rux-form-field">
							<label for="input__text">Email</label>
							<input
								id="input__text"
								class="rux-input"
								required
								placeholder="email"
								type="text"
								name="email"
								value={this.state.email}
								onChange={this.handleChange}
							/>
						</div>
						<div className="rux-form-field">
							<label for="input__text">Password</label>
							<input
								id="input__text"
								class="rux-input"
								required
								placeholder="password"
								type="password"
								name="password"
								value={this.state.password}
								onChange={this.handleChange}
							/>
						</div>

						<div>
							<rux-button
								size="large"
								placeholder="submit"
								type="submit"
								onClick={this.handleSubmit}
							>
								Sign Up
							</rux-button>
							<span>or</span>
							<rux-button size="large">
								<Link to="/login" className="cufflinks">
									Log In
								</Link>
							</rux-button>
						</div>
					</form>
					<div>{this.state.errors ? this.handleErrors() : null}</div>
				</div>
			</div>
		);
	}
}

export default connect(null, { signup })(Signup);
