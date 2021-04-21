import React, { useState } from 'react';
import './ScattegoriesContent.css';
import PlayerList from './PlayerList'
import PlayerTurn from './PlayerTurn';


//two boxes with text in them
//randomise button underneath


function ScattegoriesContent() {

    const [randomCategory, setRandomCategory] = useState("");
    const [randomLetter, setRandomLetter] = useState("");
    const [isCheckButtonDisabled, setIsCheckButtonDisabled] = useState(true);
    const [isInputDisabled, setIsInputDisabled] = useState(false);

    const getRandomCategory = async () => {
        const response = await fetch("https://scattegories-backend-hi.herokuapp.com/category");
        const { category } = await response.json();
        setRandomCategory(category);
    };
    const getRandomLetter = async () => {
        const response = await fetch("https://scattegories-backend-hi.herokuapp.com/letter");
        const { letter } = await response.json();
        setRandomLetter(letter);
    };

    const randomise = () => {
        getRandomCategory()
        getRandomLetter()
        setIsCheckButtonDisabled(false)
    }

    const startGame = () => {
        setIsInputDisabled(true)
    }

    return (<div className="container-fluid">
        <button style={{marginTop:10, marginBottom: 5}} type="button" className="btn btn-outline-success btn-lg" onClick={randomise}>RANDOMISE</button>
        <button style={{marginTop:10, marginBottom: 5}} type="button" className="btn btn-success btn-lg" onClick={startGame} disabled={isCheckButtonDisabled}>✓</button>
        <p>• Your random category is <b>{randomCategory}</b></p>
        <p>• Your random letter is <b>{randomLetter}</b></p>
        <PlayerTurn />
        <PlayerList disabled={isInputDisabled}/>
    </div>
    );
}

export default ScattegoriesContent;
