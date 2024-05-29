import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import "../../styles/api.css";
const Api = () => {
  const { store, actions } = useContext(Context);
  const [selectedBreed, setSelectedBreed] = useState('');
  useEffect(() => {
      actions.fetchBreeds();
  }, [actions]);
  const handleFetchRandomImage = async () => {
      if (selectedBreed) {
          await actions.fetchRandomImage(selectedBreed);
      }
  };
  return (
    <div className="container">
      <h1>Breed of dogs </h1>
      <p>See photos of other breeds</p>
      <select onChange={e => setSelectedBreed(e.target.value)} value={selectedBreed}>
        <option value="">Select a breed</option>
        {store.breeds?.map(breed => (
          <option key={breed} value={breed}>
            {breed.charAt(0).toUpperCase() + breed.slice(1)}
          </option>
        ))}
      </select>
      <button onClick={handleFetchRandomImage}>Get Random Image</button>
      <div>
        {store.randomDogImage && (
          <img src={store.randomDogImage} alt="Imagen Aleatoria de Perro" style={{ width: '300px', height: 'auto' }} />
        )}
      </div>
    </div>
  );
};
export default Api;