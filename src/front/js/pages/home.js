import React, { useContext, useEffect  } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import Logo from "../../img/logo.png";

export const Home = () => {
	const {store, actions} =useContext(Context);
	
	useEffect(() => {
		actions.getSuggestions();
	  }, [actions]);
	
	return (
		<div className="text-center">
			<h1 className="nameLog"> Dog Meet</h1>
			<div>
				<img src={Logo} className="logo"/>
			</div>
			<div className="video-background">
				<video autoPlay loop muted>
					<source src="https://videos.pexels.com/video-files/5469105/5469105-hd_1920_1080_24fps.mp4" type="video/mp4" />
					Your browser does not support the video tag.
				</video>
			</div>
			
			
			<div className="buttons">
				<Link to={"/signup"}>
					<button className="btn btn-success">Sign Up</button>
				</Link>
				<div className="separator">/</div>
				<Link to={"/login"}>
					<button className="btn btn-success">LogIn</button>
				</Link>
			</div>
			

		</div>
	);
};

