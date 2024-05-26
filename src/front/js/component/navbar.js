import React, {useContext}from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
				
				<Link to="/private">
						<button className="btn btn-primary">Post</button>
				</Link>


				<Link to={"/login"}>
                {store.isLoggedIn ? (
                 <button onClick={() => actions.setLogout()}>LogOut</button>
                 ) : (
                     <p></p>
                 )}
            </Link>
			</div>
		</nav>
	);
};
