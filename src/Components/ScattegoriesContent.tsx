import React, { useState } from 'react';
import './ScattegoriesContent.css';


//two boxes with text in them
//randomise button underneath


function ScattegoriesContent() {

    const [randomCategory, setRandomCategory] = useState("");
    const [randomLetter, setRandomLetter] = useState("");

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
    }

    const myStyle = {color: "white", backgroundColor: "#4b86b4", marginTop: 5, border: "double", borderColor: "#2a4d69"}

    return (<div>
        <div className="custom-button">
        <button style={myStyle} type="button" className="btn btn-custom btn-lg" onClick={randomise}>RANDOMISE</button>
        </div>
        <div className="row">
            <div className="col-sm-3">
                <div className="panel panel-primary">
                    <div className="panel-heading">Your random category is...</div>
                    <div className="panel-body">{randomCategory}</div>
                </div>
            </div>
            <div className="col-sm-3">Your random letter is: {randomLetter}</div>
            <div className="col-sm-3"></div>
        </div>
    </div>
    );
}

export default ScattegoriesContent;

//style={{textAlign: "center", border: "double", borderRadius: 5, borderWidth:5}}