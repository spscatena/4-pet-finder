import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

import Pet from "./Pet";
import NewPetModal from "./NewPetModal";

import "./index.css";

const App = () => {
  const [pets, setPets] = useState([]);
  const [isLoading, setLoading] = useState([]);
  const [isNewPetOpen, setNewPetOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3001/pets")
      .then((res) => res.json())
      .then((pets) => setPets(pets))
      .finally(() => setLoading(false));
  }, []);

  const addPet = async ({ name, kind, photo }) => {
    setPets([
      ...pets,
      {
        id: Math.random(),
        name: name,
        kind: kind,
        photo: photo,
      },
    ]);
    setNewPetOpen(false);
  };

  return (
    <main>
      <h1>Adopt-a-Pet</h1>

      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <ul>
            {pets.map((pet) => (
              <li key={pet.id}>
                <Pet pet={pet} />
              </li>
            ))}
          </ul>
          <button onClick={() => setNewPetOpen(true)}>Add a Pet</button>
        </>
      )}

      {isNewPetOpen && (
        <NewPetModal
          // isOpen={isNewPetOpen}
          onSave={addPet}
          onCancel={() => setNewPetOpen(false)}
        />
      )}
    </main>
  );
};

const el = document.querySelector("#root");
Modal.setAppElement(el);
ReactDOM.render(<App />, el);
