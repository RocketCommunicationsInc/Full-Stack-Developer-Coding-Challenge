import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: false,
			user: {},
		};
	}

	componentDidMount() {
		this.loginStatus();
	}

	loginStatus = () => {
		axios
			.get("http://localhost:3001/logged_in", { withCredentials: true })

			.then((resp) => {
				if (resp.data.logged_in) {
					this.handleLogin(resp);
				} else {
					this.handleLogout();
				}
			})
			.catch((error) => console.log("api errors:", error));
	};

	handleLogin = (data) => {
		this.setState({
			isLoggedIn: true,
			user: data.user,
		});
	};

	handleLogout = () => {
		this.setState({
			isLoggedIn: false,
			user: {},
		});
	};

	render() {
		return (
			<div>
				<BrowserRouter>
					<Switch>
						<Route
							exact
							path="/"
							render={(props) => (
								<Home
									{...props}
									handleLogin={this.handleLogin}
									handleLogout={this.handleLogout}
									loggedInStatus={this.state.isLoggedIn}
								/>
							)}
						/>
						{/* <Route
							exact
							path="/login"
							render={(props) => (
								<Login
									{...props}
									handleLogin={this.handleLogin}
									loggedInStatus={this.state.isLoggedIn}
								/>
							)}
						/>
						<Route
							exact
							path="/signup"
							render={(props) => (
								<Signup
									{...props}
									handleLogin={this.handleLogin}
									loggedInStatus={this.state.isLoggedIn}
								/>
							)}
						/> */}
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
