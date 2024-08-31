import React from "react";

import { CarouselMenue, CarouselCharacter } from "../other/Carousel";

import "../../style/personnage.css";
function PersonnageChoice() {
    return (
        <div className={'personnage-container'}>
            <div className="personnage-box">
                <h2>Les Personnages : </h2>
                <CarouselCharacter />
            </div>    
        </div>
    )
};

export default PersonnageChoice;