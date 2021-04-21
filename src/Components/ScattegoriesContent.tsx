import React, { useState } from 'react';
import './ScattegoriesContent.css';


//two boxes with text in them
//randomise button underneath


function ScattegoriesContent() {

    const [randomCategory, setRandomCategory] = useState("");
    const [randomLetter, setRandomLetter] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);

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
        setIsDisabled(false)
    }

    const startGame = () => {
        console.log("hi")
    }

    return (<div className="container-fluid">
        <button style={{marginTop:10, marginBottom: 5}} type="button" className="btn btn-outline-success btn-lg" onClick={randomise}>RANDOMISE</button>
        <button style={{marginTop:10, marginBottom: 5}} type="button" className="btn btn-success btn-lg" onClick={startGame} disabled={isDisabled}>✓</button>
        <p>• Your random category is <b>{randomCategory}</b></p>
        <p>• Your random letter is <b>{randomLetter}</b></p>
    </div>
    );
}

export default ScattegoriesContent;
