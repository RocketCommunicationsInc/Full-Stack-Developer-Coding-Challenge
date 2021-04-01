import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
// import { BrowserRouter, Switch, Route } from "react-router-dom";
// import Login from "../components/Login";
// import Signup from "../components/Signup";

const Session = () => {
	return (
		<div className="home">
			<h3>
				Are you a <Link to="/Login">returning</Link> user?
			</h3>
			<br />
			<h3>
				Or a <Link to="/Signup">new</Link> user?
			</h3>
		</div>
	);
};

export default Session;
