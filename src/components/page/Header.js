import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../style/navbar.css";
import useSound from "use-sound";
import { useSecret } from '../easter-egg/SecretContext';

import gorristerYell from "../../sounds/gorrister.mp3";
import bennyYell from "../../sounds/benny.mp3";
import tedYell from "../../sounds/ted.mp3";
import ellenYell from "../../sounds/ellen.mp3";
import nimdok from "../../sounds/nimdok.mp3";
import cogitoErgoSum from "../../sounds/CogitoErgoSum.mp3";
import true_cogitoErogSum from "../../sounds/true_CogitoErgoSum.mp3";

function Header() {
  const { getSecret } = useSecret();
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [canPlay, setCanPlay] = useState(true);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const [playAM, { stop: stopAM }] = useSound(cogitoErgoSum, { onend: () => setIsPlaying(false), interrupt: true });
  const [playAM_secret, { stop: stopAM_secret }] = useSound(true_cogitoErogSum, { onend: () => setIsPlaying(false), interrupt: true });
  const [playNimdok, { stop: stopNimdok }] = useSound(nimdok, { onend: () => setIsPlaying(false), interrupt: true });
  const [playEllenYell, { stop: stopEllenYell }] = useSound(ellenYell, { onend: () => setIsPlaying(false), interrupt: true });
  const [playGorrister, { stop: stopGorrister }] = useSound(gorristerYell, { onend: () => setIsPlaying(false), interrupt: true });
  const [playBennyYell, { stop: stopBennyYell }] = useSound(bennyYell, { onend: () => setIsPlaying(false), interrupt: true });
  const [playTedYell, { stop: stopTedYell }] = useSound(tedYell, { onend: () => setIsPlaying(false), interrupt: true });

  const soundHandlers = {
    Ellen: { play: playEllenYell, stop: stopEllenYell },
    Benny: { play: playBennyYell, stop: stopBennyYell },
    Gorrister: { play: playGorrister, stop: stopGorrister },
    Ted: { play: playTedYell, stop: stopTedYell },
    Nimdok: { play: playNimdok, stop: stopNimdok },
    AM: getSecret('amSecret') ? { play: playAM_secret, stop: stopAM_secret } : { play: playAM, stop: stopAM }
  };

  const handleMouseOver = (characterName) => {
    if (canPlay) {
      setIsPlaying(true);
      const handler = soundHandlers[characterName];
      if (handler) handler.play();
    }
  };

  const handleMouseOut = (characterName) => {
    if (isPlaying) {
      setIsPlaying(false);
      const handler = soundHandlers[characterName];
      if (handler) handler.stop();
    }
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setScrolled(scrollY > 50);
    document.querySelector('.navbar').classList.toggle('navbar-transparent', scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggle = () => setCanPlay(prevCanPlay => !prevCanPlay);

  const handleDropdownEnter = () => setIsDropdownVisible(true);
  const handleDropdownLeave = () => setIsDropdownVisible(false);

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark fixed-top ${scrolled ? "navbar-scrolled" : ""}`}>
      
      
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={process.env.PUBLIC_URL + "/favico.ico"} alt="" width="30" height="24" />
          IHNMAIMS
        </Link>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse show" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Accueil</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/story">Histoire</Link>
            </li>
            <li 
              className="nav-item dropdown"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <Link className="nav-link dropdown-toggle" to="/character" id="navbarDropdownMenuLink" role="button" aria-haspopup="true" aria-expanded={isDropdownVisible}>
                Personnages
              </Link>
              {isDropdownVisible && (
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><span className="h5">Antagoniste</span></li>
                  <li>
                    <Link to="/character/AM" className="dropdown-item" onMouseOver={() => handleMouseOver("AM")} onMouseOut={() => handleMouseOut("AM")}>
                      A.M
                    </Link>
                  </li>
                  <li><div className="dropdown-divider" /></li>
                  <li><span className="h5">Protagonistes</span></li>
                  {["Ted", "Ellen", "Nimdok", "Benny", "Gorrister"].map(character => (
                    <li key={character}>
                      <Link to={`/character/${character}`} className="dropdown-item" onMouseOver={() => handleMouseOver(character)} onMouseOut={() => handleMouseOut(character)}>
                        {character}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li className="nav-item">
              <label className="switch" title={canPlay ? "Son Activé" : "Son Désactivé"}>
                <input type="checkbox" checked={canPlay} onChange={handleToggle} />
                <span className="slider round"></span>
              </label>
            </li>
          </ul>
          {/*Page de secret*/}
          {getSecret("pageSecret") && (
            <ul className="navbar-nav ml-auto secret-link">
              <li className="nav-item">
                <Link className="nav-link glitch" data-text="Secret" to="/Secret">Secret</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
