import React, { useState } from "react";
import '../../style/histoire.css';
import { useSecret } from "../easter-egg/SecretContext";
import HackingOverlay from "../easter-egg/HackingOverlay";

import { histoireData } from "../data/histoire";

function Histoire() {
  const [currentSection, setCurrentSection] = useState(1);
  const { getSecret } = useSecret();

  const handleNextSection = () => setCurrentSection(prevSection => prevSection + 1);
  const handlePrevSection = () => setCurrentSection(prevSection => prevSection - 1);
  
  const amReturnActive = getSecret('AMreturn'); // Vérification du secret

  return (
    <div className="main-container">
      {amReturnActive && <HackingOverlay />} {/* Affichage des carrés noirs si le secret est actif */}
      <div className="description-box">
        <h1>Histoire</h1>
        {histoireData && (
          <>
            {/* Affichage de la section actuelle */}
            <section className="section">
              <h2>{histoireData[`partie${currentSection}`].titre}</h2>
              <div className="sub-section">
                <h3>{histoireData[`partie${currentSection}`].chapitre1.titre}</h3>
                <p>{histoireData[`partie${currentSection}`].chapitre1.contenu}</p>
                {/* Jeu contenu */}
                <p className="italic">{histoireData[`partie${currentSection}`].chapitre1.jeu_contenu}</p>
              </div>
              <div className="sub-section">
                <h3>{histoireData[`partie${currentSection}`].chapitre2.titre}</h3>
                <p>{histoireData[`partie${currentSection}`].chapitre2.contenu}</p>
                {/* Jeu contenu */}
                <p className="italic">{histoireData[`partie${currentSection}`].chapitre2.jeu_contenu}</p>
              </div>
            </section>

            {/* Navigation */}
            <div className="navigation">
              <button onClick={handlePrevSection} disabled={currentSection === 1}>Précédent</button>
              {Array.from(Array(5).keys()).map((index) => (
                <button key={index+1} onClick={() => setCurrentSection(index+1)} className={currentSection === index+1 ? 'active pagination' : 'pagination'}>
                  {index + 1}
                </button>
              ))}
              <button onClick={handleNextSection} disabled={currentSection === 5}>Suivant</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Histoire;
