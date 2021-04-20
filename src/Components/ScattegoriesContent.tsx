import React, {useState} from 'react';

//two boxes with text in them
//randomise button underneath


function ScattegoriesContent() {

    const [randomCategory, setRandomCategory] = useState("");
    const [randomLetter, setRandomLetter] = useState("");

    const getRandomCategory = async() => {
        const response = await fetch("https://scattegories-backend-hi.herokuapp.com/category");
        const {category} = await response.json();
        setRandomCategory(category);
    };
    const getRandomLetter = async() => {
        const response = await fetch("https://scattegories-backend-hi.herokuapp.com/letter");
        const {letter} = await response.json();
        setRandomLetter(letter);
    };

    const randomise = () => {
        getRandomCategory()
        getRandomLetter()
    }

    return ( <div>
       <p>{randomCategory}</p>
       <p>{randomLetter}</p> 
    <button onClick={randomise}>Randomise</button>
    </div>
    );
  }
  
  export default ScattegoriesContent;