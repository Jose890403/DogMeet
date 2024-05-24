import React, {useEffect, useState, useContext}from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/signup.css";

export const SignUp = () => {
	const {store, actions} =useContext(Context);
	 /* Esto es para no hacer un Link si no que esto se activa automaticamente por codigo */
	 const navigate = useNavigate();

	 /* Estas lineas creamos los useState de los inputs */
	 const[name, setName]= useState("");
	 const[email, setEmail]= useState("");
	 const[password, setPassword]= useState("")
	 /* ------------------------------------------------- */
	 const handleSubmit = e =>{
         /**  poner las obligaciones name email y password */
		e.preventDefault();

        actions.register_User(name, email, password );
       
		setName("");
		setEmail("");
		setPassword("");

        setTimeout(() => {
            navigate("/login")
        }, 4000);
    }
	
	return (
		<div className="text-center">
			<div className="signImage">
				<img src="https://images.pexels.com/photos/1074882/pexels-photo-1074882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Background-SignUp"/>
			</div>
        
			
            <div className="contenido">
                <header>
                    <div className="headercontent">
                        <h3>SIGN UP</h3>
                    </div>
                </header>
                <div className="content-image">
                    <img src="https://images.pexels.com/photos/7079978/pexels-photo-7079978.jpeg" className="imagen-form" alt="imagen del form"/>
                </div>


                <form onSubmit={handleSubmit} className="form">
                    <div className="input-group mb-4 mt-4" id="field">
                        <span className="input-group-text span-name" id="name">
                            <i className="bi bi-person"></i>
                        </span>
                        <input type="text" 
                                    className="inputs form-control"   
                                    placeholder="Name" 
                                    value={name}
					                onChange={e =>setName(e.target.value)}
                                    required
                                    />
                    </div>
                    <div className="input-group mb-4 mt-4" id="field">
                        <span className="input-group-text span-email" id="email">
                            <i className="bi bi-envelope-at"></i>
                        </span>
                        <input type="text" 
                                    className="inputs form-control"   
                                    placeholder="E-mail" 
                                    value={email}
					                onChange = {e => setEmail(e.target.value)}
                                    required
                                    />
                    </div>

                    <div className="input-group mb-3 " id="field">
                        <span className="input-group-text span-pass" id="password">
                            <i className="bi bi-lock-fill"></i>
                        </span>
                        <input type="password" 
                                className="inputs form-control"  
                                placeholder="Password" 
                                value={password}
					            onChange = {e => setPassword(e.target.value)}
                                required
                                />
                    </div>

                    <div className="boton">
                        <button className="btn btn-outline-success" type="submit">Sign Up</button>
                    </div>
                    
                </form>
                    
            </div>
        </div>
			
		
	);
};