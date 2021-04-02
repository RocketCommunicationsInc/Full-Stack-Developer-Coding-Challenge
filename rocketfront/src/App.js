import React, { Component } from "react";
import { connect } from "react-redux";
import {
	Redirect,
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Main from "./containers/Main";
import Session from "./containers/Session";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
		};
	}

	render() {
		return (
			// 	<div className="app">
			<Router>
				<Switch>
					<Route exact path="/" component={Main} />
					<Route exact path="/Session" component={Session} />
					<Route exact path="/main" component={Main} />
					<Route exact path="/Signup" component={Signup} />
					<Route exact path="/Login" component={Login} />
				</Switch>
				{this.props.loggedIn ? (
					<Redirect to component="/main" />
				) : (
					<Redirect to="/Session" />
				)}
			</Router>
			// 	</div>
		);
	}
}

const mSTP = (state) => {
	return {
		loggedIn: state.loggedIn,
	};
};

export default connect(mSTP)(App);
