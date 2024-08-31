import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import '../../style/torture.css';

function CharacterTorture() {
    let { name } = useParams();

    return (
        <div className="torture-container">
            <div className="torture-description-box">
                <h1>Lorem ipsu</h1>
            </div>
        </div>
    )
}

export default CharacterTorture;