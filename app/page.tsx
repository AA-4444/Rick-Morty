"use client";

import axios from "axios";
import { useState, useEffect } from "react";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
  image: string;
}

const HomePage = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [nextPage, setNextPage] = useState<string | null>(
    "https://rickandmortyapi.com/api/character"
  );
  const [loading, setLoading] = useState(false);

  
  const fetchCharacters = async () => {
    if (!nextPage) return;

    setLoading(true);
    try {
      const res = await axios.get(nextPage);
      setCharacters((prev) => [...prev, ...res.data.results]); 
      setNextPage(res.data.info.next); 
    } catch (error) {
      console.error("Failed to fetch characters", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch...
  useEffect(() => {
    fetchCharacters();
  }, []);


  if (selectedCharacter) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1 style={{ color: "white" }}>{selectedCharacter.name}</h1>

        {/* Character Details Section */}
        <div style={styles.characterDetails}>
          <img
            src={selectedCharacter.image}
            alt={selectedCharacter.name}
            style={styles.characterImage}
          />
          <div style={styles.characterData}>
            <p><strong>Status:</strong> {selectedCharacter.status}</p>
            <p><strong>Species:</strong> {selectedCharacter.species}</p>
            <p><strong>Gender:</strong> {selectedCharacter.gender}</p>
            <p><strong>Origin:</strong> {selectedCharacter.origin?.name || "N/A"}</p>
            <p><strong>Last Location:</strong> {selectedCharacter.location?.name || "N/A"}</p>
          </div>
        </div>

   
        <button
          onClick={() => setSelectedCharacter(null)}
          style={styles.button}
        >
          Back to Characters
        </button>
      </div>
    );
  }

  // Render the character list
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          marginBottom: "20px",
        }}
      >
        <img
          src="https://image.ibb.co/hTQdUF/Rick_and_Morty_logo.png"
          alt="Rick and Morty Logo"
          style={{ width: "300px", maxWidth: "100%" }}
        />
      </div>

      <h1 style={{ textAlign: "center", color: "white" }}>Rick and Morty Characters</h1>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {characters.map((character) => (
          <div
            key={character.id}
            style={styles.characterCard}
            onClick={() => setSelectedCharacter(character)}
          >
            <img
              src={character.image}
              alt={character.name}
              style={{ width: "100%", borderRadius: "5px" }}
            />
            <h3>{character.name}</h3>
            <p>Status: {character.status}</p>
          </div>
        ))}
      </div>

      {nextPage && !loading && (
        <div style={{ textAlign: "center", margin: "20px" }}>
          <button
            onClick={fetchCharacters}
            style={styles.button}
          >
            Load More Characters
          </button>
        </div>
      )}

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
    </div>
  );
};

// Style
const styles = {
  characterCard: {
    margin: "10px",
    padding: "15px",
    border: "1px solid #3C3E44",
    borderRadius: "10px",
    width: "250px",
    textAlign: "center" as "center",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    background: "#3C3E44",
    transition: "transform 0.3s, box-shadow 0.3s",
    cursor: "pointer",
    color: "white",
  },
  characterDetails: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2b2d33",
    borderRadius: "15px",
    padding: "20px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
    maxWidth: "900px",
    margin: "0 auto",
    color: "#f5f5f5",
    marginTop: "20px",
  },
  characterImage: {
    width: "200px",
    height: "300px",
    borderRadius: "15px",
    objectFit: "cover" as "cover", 
    marginRight: "20px",
  },
  characterData: {
    display: "flex",
    flexDirection: "column" as "column", 
    justifyContent: "space-between",
    flex: 1,
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    background: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default HomePage;
