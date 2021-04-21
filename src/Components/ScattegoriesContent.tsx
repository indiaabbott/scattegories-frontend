import React, { useState, useEffect } from 'react';
import './ScattegoriesContent.css';
import PlayerList from './PlayerList'
import PlayerTurn from './PlayerTurn';


//two boxes with text in them
//randomise button underneath
interface Player {
    id: number,
    player: string,
    in_game: string,
};

function ScattegoriesContent() {

    const [randomCategory, setRandomCategory] = useState("");
    const [randomLetter, setRandomLetter] = useState("");
    const [isCheckButtonDisabled, setIsCheckButtonDisabled] = useState(true); //start game button disabled until randomise button clicked
    const [isInputDisabled, setIsInputDisabled] = useState(false); //input bar enabled until game is started, at which point no more players can be added
    const [playerName, setPlayerName] = useState(""); //keeps track of the textin the input bar
    const [playersArray, setPlayersArray] = useState<Player[]>([]) //keeps track of array of players which it gets via fetch request to DB
    const [isCheckButtonClicked, setIsCheckButtonClicked] = useState(false)
    useEffect(() => {fetchAndStorePlayers()}, []) //show list of players in DB on first render


    //getting random categories and letters
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


    //everything to do with player array whose info will be passed on to child components
    const addPlayer = async() => {
        const dataToSend = {player: playerName}
        await fetch("https://scattegories-backend-hi.herokuapp.com/names", {
            method: "POST",
            body: JSON.stringify(dataToSend),
            headers: {'Content-Type': 'application/json'}
        });
        setPlayerName("");
    };

    const removeAllPlayers = async() => {
        await fetch("https://scattegories-backend-hi.herokuapp.com/names", {
            method: "DELETE",
        });
        //call get players function
    };

    const fetchAndStorePlayers = async() => {
        const response = await fetch("https://scattegories-backend-hi.herokuapp.com/names");
        const receivedPlayers = await response.json();
        setPlayersArray(receivedPlayers);
    };

    const addPlayerAndUpdate = async() => {
        //loading wheel - when true, show loading thing (do via boolean variable in state hook)
        await addPlayer()
        await fetchAndStorePlayers()
        //cancel loading wheel
    };

    //button functionality
    const randomise = () => {
        getRandomCategory()
        getRandomLetter()
        setIsCheckButtonDisabled(false)
    }

    const startGame = () => {
        setIsInputDisabled(true)
        setIsCheckButtonClicked(true)
    }

    return (<div className="container-fluid">
        <button style={{marginTop:10, marginBottom: 5}} type="button" className="btn btn-outline-success btn-lg" onClick={randomise} disabled={isInputDisabled}>RANDOMISE</button>
        <button style={{marginTop:10, marginBottom: 5}} type="button" className="btn btn-success btn-lg" onClick={startGame} disabled={isCheckButtonDisabled}>✓</button>
        <p>• Your random category is <b>{randomCategory}</b></p>
        <p>• Your random letter is <b>{randomLetter}</b></p>
        <PlayerTurn playersArray={playersArray} isCheckButtonClicked={isCheckButtonClicked}/>
        <div className = "form-inline">
        <input className="form-control" placeholder="Player name here..." value={playerName} onChange={e => setPlayerName(e.target.value)} disabled={isInputDisabled}></input>
        <button type="button" className="btn btn-success" onClick={addPlayerAndUpdate} disabled={isInputDisabled}>Add</button>
        <button type="button" className="btn btn-danger" onClick={removeAllPlayers} disabled={isInputDisabled}>Remove all players...</button>
        </div>
        <PlayerList disabled={isInputDisabled} playersArray={playersArray}/>
    </div>
    );
}

export default ScattegoriesContent;
