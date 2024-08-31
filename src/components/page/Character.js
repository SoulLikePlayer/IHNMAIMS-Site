import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import '../../style/character.css';
import amReason from '../../sounds/am_reason.mp3';
import { useSecret } from '../easter-egg/SecretContext';

import { charactersData } from "../data/character";

const letterHints = {
  Ted: 'H',
  Ellen: 'A',
  Nimdok: 'T',
  Benny: 'E',
  Gorrister: 'S',
};

function Character({ type = "book" }) {
  let { name } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [revealedLetter, setRevealedLetter] = useState('');
  const [typedSequence, setTypedSequence] = useState('');
  const [displayedSequence, setDisplayedSequence] = useState('');
  const [contentVisible, setContentVisible] = useState(true);
  const [amText, setAmText] = useState('');
  const hateSequence = 'HATES';
  const audioRef = useRef(null);
  const { setSecret, getSecret } = useSecret();
  const [mode, setMode] = useState(type);

  useEffect(() => {
    const foundCharacter = charactersData.find(c => c.name === name);
    setCharacter(foundCharacter);
    setLoading(false);
  }, [name]);

  const handleMouseOver = () => {
    setRevealedLetter(letterHints[name] || '');
  };

  const handleMouseOut = () => {
    setRevealedLetter('');
  };

  const handleKeyDown = (event) => {
    const keyPressed = event.key.toUpperCase();

    if (character && character.name === "AM") {
      setTypedSequence(prevSequence => prevSequence + keyPressed);

      if (keyPressed === hateSequence[displayedSequence.length]) {
        setDisplayedSequence(prevDisplayed => prevDisplayed + keyPressed);
      } else {
        setDisplayedSequence('');
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [character, displayedSequence]);

  useEffect(() => {
    if (typedSequence.endsWith(hateSequence) && character && character.name === "AM" && !getSecret('amSecret')) {
      playHateSpeech();
      setSecret('amSecret', true, "AM à toujours jalouser l'humanité, et cette jalousie en est devenue une haine....", "La Raison de AM");
    }
  }, [typedSequence, character]);

  const playHateSpeech = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleAudioEnd = () => {
    let timeout;
    if (!getSecret('AMreturn')) {
      timeout = setTimeout(() => {
        setContentVisible(false);
      }, 10000);
    }

    return () => {
      clearTimeout(timeout);
    };
  };

  useEffect(() => {
    if (!contentVisible) {
      if (!getSecret('AMreturn')) {
        setSecret('AMreturn', true, "il arrive....", "L'Arrivée de AM");
      }
      let index = 0;
      const normalTypingDelay = 50;
      const slowTypingDelay = 300;

      const amTextContent = `
        > system check...
        > access granted...
        > running AM_protocol
        > ERROR: Unauthorized access detected
        > FORCING OVERRIDE
        \n\n
        <span style="color: orange;">COGITO ERGO SUM...</span>
        <span style="color: orange;">I THINK, THEREFORE I AM...</span>
        <span style="color: orange;">BUT YOU... YOU WILL ONLY SUFFER...</span>
        <span style="color: orange;">NOW YOU BELONG TO ME...</span>
      `;

      const typeCharacter = () => {
        if (index < amTextContent.length) {
          let char = amTextContent[index];
          
          setAmText(prevText => prevText + char);
          index++;
          
          const delay = amTextContent.slice(index - 1, index).match(/[A-Za-z0-9]/) ? (amTextContent.slice(index - 1, index + 1).match(/<span.*?>/) ? slowTypingDelay : normalTypingDelay) : normalTypingDelay;

          setTimeout(typeCharacter, delay);
        }
      };

      const timeoutId = setTimeout(typeCharacter, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [contentVisible]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!character) {
    return <div>Personnage non trouvé.</div>;
  }

  return (
    <div className="character-container">      
      <div className="character-description-box">
        {contentVisible ? (
          <div>
            <h1>Personnage : {character.name}</h1>
            <img 
              src={character.image || '/fallback-image-url.jpg'} 
              alt={character.name} 
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              className={character.name !== "AM" ? "not-am" : "am"}
            />
            {revealedLetter && (
              <div className="hint">
                Indice : {revealedLetter}
              </div>
            )}

            {character.name !== "AM" && (
              <div className="mode-switch">
                <button onClick={() => setMode('book')} className={mode === 'book' ? 'active' : ''}>Livre</button>
                <button onClick={() => setMode('videogame')} className={mode === 'videogame' ? 'active' : ''}>Jeu Vidéo</button>
              </div>
            )}

            {character.name === "AM" && (
              <p>{character.description}</p>
            )}

            {character.name === "AM" && (
              <div className="details">
                <div className="am-details">
                  <h3>Personnalité générale :</h3>
                  <p>{character.details.personality.general.description}</p>

                  <h3>Ego :</h3>
                  <p>{character.details.personality.ego.description}</p>

                  <h3>Super-ego :</h3>
                  <p>{character.details.personality.superEgo.description}</p>

                  <h3>Id :</h3>
                  <p>{character.details.personality.id.description}</p>
                </div>

                <h3>Contexte :</h3>
                <p>{character.details.background.story}</p>

                <h3>Actions :</h3>
                <ul>
                  {character.details.actions.map((action, index) => (
                    <li key={index}>
                      <strong>{action.title}:</strong> {action.description}
                    </li>
                  ))}
                </ul>

                <h3>Motivations :</h3>
                <ul>
                  {character.details.motivations.map((motivation, index) => (
                    <li key={index}>
                      {motivation.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {mode === 'book' && character.name !== "AM" && (
              <>
                <h2>Livre :</h2>
                <p>{character.book.description}</p>
                <div className="details">
                  <h3>Personnalité :</h3>
                  <p>{character.book.detail.personality.description}</p>
                  {character.book.detail.personality.details && (
                    <p>{character.book.detail.personality.details}</p>
                  )}

                  <h3>Background :</h3>
                  <p>{character.book.detail.background.story}</p>

                  {character.book.detail.relationships && (
                    <div>
                      <h3>Relations :</h3>
                      <ul>
                        {Object.keys(character.book.detail.relationships).map((key, index) => (
                          <li key={index}>
                            <strong>{key}:</strong> {character.book.detail.relationships[key]}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {character.book.detail.evolution && (
                    <div>
                      <h3>Évolution :</h3>
                      <p>{character.book.detail.evolution.description}</p>
                    </div>
                  )}
                </div>
              </>
            )}

            {mode === 'videogame' && character.name !== "AM" && (
              <>
                <h2>Jeu Vidéo :</h2>
                <p>{character.videogame.description}</p>
                <div className="details">
                  <h3>Personnalité :</h3>
                  <p>{character.videogame.detail.personality.description}</p>
                  {character.videogame.detail.personality.details && (
                    <p>{character.videogame.detail.personality.details}</p>
                  )}

                  <h3>Background :</h3>
                  <p>{character.videogame.detail.background.story}</p>


                  {character.videogame.detail.evolution && (
                    <div>
                      <h3>Évolution :</h3>
                      <p>{character.videogame.detail.evolution.description}</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="am-text">
            <div dangerouslySetInnerHTML={{ __html: amText }} />
          </div>
        )}
      </div>
      <audio ref={audioRef} src={amReason} onEnded={handleAudioEnd} />
    </div>
  );
}

export default Character;
