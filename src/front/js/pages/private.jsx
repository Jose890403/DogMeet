import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/private.css";

export const Private = () => {
    const { store, actions } = useContext(Context);
    const [img, setImg] = useState("");
    const [bodytext, setBodytext] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (store.posts === true) {
            navigate('/inicio');
        }
    }, [store.post]); 

    const handleSubmit = e => {
        e.preventDefault();
        actions.createPost(img, bodytext);
        setImg("");
        setBodytext("");
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
                <Link to="/inicio">
                <button type="submit" className="submit-button">Enviar</button>
                </Link>
            </form>
        </div>
    );
};