const getState = ({ getStore, getActions, setStore }) => {


    return {
        store: {
            isLoggedIn: false,
            posts: [],
            posts: {},
            post: {},
            comments: [],
            suggestions: [],
            message: null,
            breeds: null,
            randomDogImage: null,

        },


        actions: {
            // Use getActions to call a function within a fuction
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            getMessage: async () => {
                try {
                    // fetching data from the backend
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
                    const data = await resp.json()
                    setStore({ message: data.message })
                    // don't forget to return something, that is how the async resolves
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error)
                }
            },


            /* --------- De aqui en adelante van las funciones de flux  */

            setLogin: () => {
                setStore({ isLoggedIn: true })
            },
            setLogout: () => {
                setStore({ isLoggedIn: false })
                localStorage.removeItem('token');

            },

            /* --------- FUNCION FLUX (fetch) PARA LOGIN----------- */

            login: async (email, password) => {
                await fetch(`${process.env.BACKEND_URL}/api/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error en la respuesta del servidor');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Login exitoso:', data);

                        localStorage.setItem('token', data.token);

                        getActions().setLogin();
                        return data;
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        throw error;
                    });
            },

            register_User: (name, email, password) => {
                fetch(`${process.env.BACKEND_URL}/api/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "name": name,
                        "email": email,
                        "password": password,
                    }),
                })
                    .then(Response => Response.json())
                    .then(data => {
                        console.log(data);

                    })
                    .catch(error => console.log('Error parcero', error))

            },

            // esto me esta dando un bucle de puras peticiones
            getPosts: async () => {
                console.log("prueba")

                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/post`);
                    const posts = await response.json();
                    console.log(posts)
                    setStore({ posts });
                } catch (error) {
                    console.log("Error fetching posts:", error);
                }
            },


            getSinglePost: (postId) => {
                fetch(`${process.env.BACKEND_URL}/api/post/${postId}`, {
                    method: "GET",
                })
                    .then(response => response.json())
                    .then(data => {
                        setStore({ post: data })
                    }
                    )
                    .catch(error => console.log('error:', error));
            },

            // se crea el post 

            createPost: async (img, bodytext) => {
                console.log(bodytext)
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/post`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ img, bodytext })
                    });

                    const data = await response.json();
                    await getActions().getPosts();
                    setStore({ message: data.msg });
                    getActions().setPost();

                    return data;
                } catch (error) {
                    console.log("Error creating post:", error);
                    throw error;
                }
            },

            deletePost: function (postId) {
                fetch(`${process.env.BACKEND_URL}/api/post/${postId}`, {
                    method: 'DELETE'
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        if (data.msg === "POST ELIMINADO CORRECTAMENTE") {
                            getActions().getPosts()
                        } else {
                            console.error("Error deleting post:", data.msg);
                        }
                    })
                    .catch(error => {
                        console.log("Error deleting post:", error);
                    });
            },
            updatePost: async (postId, img, bodytext) => {
                console.log(postId)
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/post/${postId}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ img, bodytext })
                    });
                    const data = await response.json();
                    getActions().getPosts();
                    setStore({ message: data.msg });
                } catch (error) {
                    console.log("Error updating post:", error);
                }
            },
            fetchBreeds: async () => {
                try {
                    const response = await fetch('https://dog.ceo/api/breeds/list/all');
                    const data = await response.json();
                    setStore({ breeds: Object.keys(data.message) });
                } catch (error) {
                    console.log("Error fetching breeds:", error);
                }
            },
            fetchRandomImage: async (breed) => {
                try {
                    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
                    const data = await response.json();
                    setStore({ randomDogImage: data.message });
                } catch (error) {
                    console.log("Error fetching random dog image:", error);
                }
            },
            getSuggestions: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/suggestion`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setStore({ suggestions: data.suggestion });
                    console.log(data)
                } catch (error) {
                    console.log("Error fetching suggestions:", error);
                }
            },
            
            createSuggestion: async (suggestion) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/suggestion`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ suggestion })
                    });
                    const data = await response.json();
                    getActions().getSuggestions(); // Refresh suggestions
                    setStore({ message: data.msg });
                } catch (error) {
                    console.log("Error creating suggestion:", error);
                }
            },
        },
    }
}
export default getState;
