import React, { useEffect, useState } from "react";
import "../../style/hacking.css";

function HackingOverlay() {
  const [squares, setSquares] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const binaryText = generateRandomBinary(); // Génération du texte binaire

      const newSquare = {
        id: Date.now(),
        top: Math.random() * 100 + "vh",
        left: Math.random() * 100 + "vw",
        size: Math.random() * 100 + 50 + "px", // Taille entre 50px et 150px
        binary: binaryText, // Texte binaire aléatoire
      };

      setSquares((prevSquares) => [...prevSquares, newSquare]);

      // Retirer le carré après une courte période
      setTimeout(() => {
        setSquares((prevSquares) =>
          prevSquares.filter((square) => square.id !== newSquare.id)
        );
      }, Math.random() * 1500 + 500); // Durée de vie entre 500ms et 2000ms
    }, 300); // Intervalle de 300ms pour générer un nouveau carré

    return () => clearInterval(intervalId);
  }, []);

  const generateRandomBinary = () => {
    const length = Math.floor(Math.random() * 20) + 10; // Longueur entre 10 et 30 caractères
    let binaryString = "";
    for (let i = 0; i < length; i++) {
      binaryString += Math.random() > 0.5 ? "1" : "0";
    }
    return binaryString;
  };

  return (
    <div className="hacking-overlay">
      {squares.map((square) => (
        <div
          key={square.id}
          className="hacking-square"
          style={{
            top: square.top,
            left: square.left,
            width: square.size,
            height: square.size,
          }}
        >
          <span className="binary-text">{square.binary}</span> {/* Affichage du texte binaire */}
        </div>
      ))}
    </div>
  );
}

export default HackingOverlay;
