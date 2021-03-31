import React from "react";
import axios from "axios";
import { RuxGlobalStatusBar } from "@astrouxds/rux-global-status-bar";
import { Link } from "react-router-dom";

const Home = (props) => {
	const handleClick = () => {
		axios
			.delete("http://localhost:3001/logout", { withCredentials: true })
			.then((resp) => {
				props.handleLogout();
				props.history.push("/");
			})
			.catch((error) => console.log(error));
	};

	return (
		<div>
			{props.isLoggedIn ? <Link to="/login">Log In</Link> : null}
			{props.isLoggedIn ? <br></br> : null}
			{props.isLoggedIn ? <Link to="/signup">Sign Up</Link> : null}
			{props.isLoggedIn ? <br></br> : null}
			{props.loggedInStatus ? (
				<Link to="/logout" onClick={handleClick}>
					Log Out
				</Link>
			) : null}
		</div>
	);
};
export default Home;
