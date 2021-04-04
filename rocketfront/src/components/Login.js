import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { login } from "../redux/actions/UsersActions";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			// email: "",
			password: "",
			error: "",
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
					{this.state.error.map((error) => {
						return <li key={error}>{error}</li>;
					})}
				</ul>
			</div>
		);
	};

	render() {
		if (this.props.errors) {
			this.props.errors.map((e) => {
				return (
					<div className="rux-modal-container">
						<rux-modal
							title="error"
							message={e}
							confirmText="Ok"
							denyText="Cancel"
							customEvent="listen-for-me"
						>
							<div className="rux-modal__titlebar">
								<h1>Error</h1>
							</div>
							<div className="rux-modal__content">
								<div className="rux-modal__message">{e}</div>
								<div className="rux-button-group">
									<rux-button data-value="false" tabindex="-1">
										Cancel
									</rux-button>
									<rux-button data-value="true" tabindex="0">
										OK
									</rux-button>
								</div>
							</div>
						</rux-modal>
					</div>
				);
			});
		}
		return (
			<div className="home">
				<div className="inForm">
					<h1>Log In</h1>
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
						{/* <div className="rux-form-field">
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
						</div> */}
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
								Log In
							</rux-button>
							<span>or</span>
							<rux-button size="large">
								<Link to="/signup" className="cufflinks">
									Sign Up
								</Link>
							</rux-button>
						</div>
					</form>
					<div>{this.state.error ? this.handleErrors() : null}</div>
				</div>
			</div>
		);
	}
}

const mSTP = (state) => {
	return {
		loggedIn: state.users.loggedIn,
		errors: state.users.errors,
	};
};

export default connect(mSTP, { login })(Login);
