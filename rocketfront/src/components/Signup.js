import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signup } from "../redux/actions/UsersActions";

class Signup extends Component {
	state = {
		username: "",
		// email: "",
		password: "",
	};

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		if (!this.state.errors) {
			this.props.signup(this.state);
			this.props.history.push("/login");
		} else {
		}
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
