import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link} from "react-router-dom";
import "../../styles/inicio.css"

export const Inicio = () => {
    const { store, actions } = useContext(Context);
    const [counters, setCounters] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        actions.getPosts();
    }, []);

    console.log(store.posts);

    const handleButtonClick = (index) => {
        setCounters(prevCounters => ({
            ...prevCounters,
            [index]: (prevCounters[index] || 0) + 1
        }));
    };
    //---------boton de eliminar---------------
    const handleDelete = (postId) => {
        actions.deletePost(postId);
    };
    //--------------------------------------------------

    const handleUpdate = (postId) => {
        console.log(postId)
        navigate(`/update/${postId}`);
       
    };

    return (
        <div className="container-fluid post">
            <span className="post-text mb-5">Your Dog's Post</span>
            <ul className="list-group">
                {store.posts.bodytext?.length > 0 ? (
                    store.posts.bodytext?.slice().reverse().map((post, index) => (

                        <li key={index} className="list-group-item mb-4">

                            <div className="header">
                                <p className="post-BodyText">{post.bodytext}</p>
                                <p>Like: <span>{counters[index] || 0}</span></p>
                            </div>
                            <hr />
                            <div className="imagen-post">
                                {post.img && <img src={post.img} alt="Post" />}
                            </div>
                            <div className="d-flex">
                                <button onClick={() => handleButtonClick(index)} className=" heart-button">
                                    <svg viewBox="0 0 24 24" className="heart-icon">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                                    </svg>
                                </button>
                                <div className="botones">
                                    <button className="btn btn-eliminar mb-3 boton" onClick={() => handleDelete(post.id)}>
                                        <i className="bi bi-trash3"></i>Delete
                                    </button>
                                    
                                        <button className="btn btn-modificar mb-3 boton-ini" onClick={() => handleUpdate(post.id)}>
                                            Update
                                        </button>
                                    
                                </div>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="list-group-item">No posts available</li>
                )}
            </ul>
        </div>
    );
};
