import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/private.css";

export const Private = () => {
    const { store, actions } = useContext(Context);
    const [img, setImg] = useState("");
    const [bodytext, setBodytext] = useState("");

    const navigate = useNavigate();
    const [variableOpacidad, setVariableOpacidad] = useState(0);

    const handleSubmit = e => {
        e.preventDefault();
        actions.createPost(img, bodytext);
        setImg("");
        setBodytext("");
        setVariableOpacidad(1)

        
        setTimeout(() => {
            navigate('/inicio'); 
            setVariableOpacidad(0)
        }, 5000);
    };

    return (
        <div className="content">
            <form onSubmit={handleSubmit} className="form-container">
                <div className="imagen-post">
                    {img ? (
                        <img src={img} alt="Uploaded" className="uploaded-img" />
                    ) : (
                        <div></div>
                    )}
                </div>
                
                <div className="form-group">
                    <label>
                        <p>Insert URL</p>
                        <input
                            type="text"
                            name="img"
                            value={img}
                            onChange={e => setImg(e.target.value)}
                            className="input-field"
                        />
                    </label>
                </div>
                
                <div className="form-group">
                    <label>
                        <p>Comment</p>
                        <input
                            type="text"
                            name="bodytext"
                            value={bodytext}
                            onChange={e => setBodytext(e.target.value)}
                            className="input-field"
                        />
                    </label>
                </div>
                <button type="submit" className="submit-button">
                <i className="fas fa-dog"></i> Create Post
                    </button>
                <div className="spinner" style={{opacity: variableOpacidad}}></div>
            </form>
        </div>
    );
};