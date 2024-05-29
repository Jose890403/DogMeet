import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams} from "react-router-dom";
import "../../styles/private.css";


export const Update = () => {
    const { store, actions } = useContext(Context);
    const [img, setImg] = useState("");
    const [bodytext, setBodytext] = useState("");
    console.log(store)
    const params = useParams();
    const postId = params.postId
    console.log(postId)

    const navigate = useNavigate();
    const [variableOpacidad, setVariableOpacidad] = useState(0);

    const handleSubmit = e => {
        e.preventDefault();
        actions.updatePost(postId, img, bodytext);
        setImg("");
        setBodytext("");
        setVariableOpacidad(1)

        
        setTimeout(() => {
            navigate('/inicio'); 
            setVariableOpacidad(0)
        }, 5000);
    };
    useEffect(()=>{
		actions.getSinglePost(postId)
	},[])

    useEffect(()=>{ 
        if (store.post){
            setBodytext(store.post?.bodytext?.bodytext)
            setImg(store.post?.bodytext?.img)
            console.log(store.post.bodytext)
        }
		
	},[store.post])
    
    
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
                <button type="submit" className="submit-button">Enviar</button>
                <div className="spinner" style={{opacity: variableOpacidad}}></div>
            </form>
        </div>
    );
};