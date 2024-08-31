import React, { useState, useEffect } from "react";

import "../../style/main.css";
import "../../style/glitch.css";

import hateSpeech from "../../sounds/AM_hate_speech.mp3";
import hateSpeech_2 from "../../sounds/HateSpeech_2.mp3";
import amReason from "../../sounds/am_reason.mp3";

import { CarouselMenue, CarouselCharacter } from "../other/Carousel";
import { useSecret } from "../easter-egg/SecretContext";

import { data } from "../data/main"

function Main() {
  const { getSecret } = useSecret();

  const quoteText = data.quote ? data.quote.text : "";
  const quoteAuthor = data.quote ? data.quote.author : "";
  const secretQuoteText = data["secret-quote"] ? data["secret-quote"].text : "";
  const secretQuoteAuthor = data["secret-quote"] ? data["secret-quote"].author : "";

  const revelSecret = getSecret('amSecret');

  return (
    <div className={`main-container`}>
      <div className="description-box">
        <div className="top-content">
          <div className="text-content">
            <h1>{data.title}</h1>
            <p>{data.description}</p>
          </div>
          <div className="cover-container" />
        </div>

        <div className="bottom-content">
          {quoteText && quoteAuthor && (
            <>
              <blockquote>
                <span className="citation">{quoteText}</span>
                <br />— {quoteAuthor}
              </blockquote>
              <audio controls>
                {!revelSecret ? (
                  <source src={hateSpeech} type="audio/mp3" />
                ) : (
                  <source src={hateSpeech_2} type="audio/mp3" />
                )}
                Votre navigateur ne supporte pas l'élément audio.
              </audio>
              {revelSecret && secretQuoteText && secretQuoteAuthor && (
                <div className="glitch">
                  <blockquote>
                    <span className="citation">{secretQuoteText}</span>
                    <br />— {secretQuoteAuthor}
                  </blockquote>
                  <audio controls>
                    <source src={amReason} type="audio/mp3" />
                    Votre navigateur ne supporte pas l'élément audio.
                  </audio>
                </div>
              )}
            </>
          )}

          <div className="characters">
            <h2>Personnages principaux :</h2>
            <CarouselMenue />
          </div>

          <h2>Thèmes abordés :</h2>
          <ul>
            {data.themes &&
              data.themes.map((theme, index) => (
                <li key={index}>{theme}</li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Main;
