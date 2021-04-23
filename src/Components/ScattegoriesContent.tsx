import React, { useState, useEffect } from 'react';
import './ScattegoriesContent.css';
import PlayerList from './PlayerList'
import PlayerTurn from './PlayerTurn';


//this is how the get request data will look
interface Player {
    id: number,
    player: string,
    in_game: string,
};

function ScattegoriesContent() {

    const [randomCategory, setRandomCategory] = useState("..."); //get random category from DB
    const [randomLetter, setRandomLetter] = useState("..."); //get random letter from DB
    const [isCheckButtonDisabled, setIsCheckButtonDisabled] = useState(true); //describes whether you can start game or not
    const [isInputDisabled, setIsInputDisabled] = useState(false); //describes whether input bar is enabled
    const [playerName, setPlayerName] = useState(""); //keeps track of the text in the input bar
    const [playersArray, setPlayersArray] = useState<Player[]>([]) //keeps track of array of players which is fetched from the DB
    const [isCheckButtonClicked, setIsCheckButtonClicked] = useState(false) //describes whether game has started
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


    //add a player to the game and reset text in input bar
    const addPlayer = async() => {
        const dataToSend = {player: playerName}
        await fetch("https://scattegories-backend-hi.herokuapp.com/names", {
            method: "POST",
            body: JSON.stringify(dataToSend),
            headers: {'Content-Type': 'application/json'}
        });
        setPlayerName("");
    };

    //remove all players from game and show empty list of players
    const removeAllPlayers = async() => {
        await fetch("https://scattegories-backend-hi.herokuapp.com/names", {
            method: "DELETE",
        });
        fetchAndStorePlayers()
    };

    //get players from DB and create an array of player objects
    const fetchAndStorePlayers = async() => {
        const response = await fetch("https://scattegories-backend-hi.herokuapp.com/names");
        const receivedPlayers = await response.json();
        setPlayersArray(receivedPlayers);
    };

    //add player to DB and show list with new player in it
    const addPlayerAndUpdate = async() => {
        await addPlayer()
        await fetchAndStorePlayers()
    };

    //Randomise button functionality
    const randomise = () => {
        getRandomCategory()
        getRandomLetter()
        setIsCheckButtonDisabled(false)
    }

    //Start button functionality
    const startGame = () => {
        setIsInputDisabled(true)
        setIsCheckButtonClicked(true)
    }

    //Reset button functionality
    const reset = async () => {
        const dataToSend = {in_game: "true"}
        await fetch("https://scattegories-backend-hi.herokuapp.com/names", {
            method: "PUT",
            body: JSON.stringify(dataToSend),
            headers: {'Content-Type': 'application/json'}
        });
        await fetchAndStorePlayers()
        setRandomCategory("...")
        setRandomLetter("...")
        setIsCheckButtonDisabled(true)
        setIsInputDisabled(false)
        setIsCheckButtonClicked(false)
    }

    //conditionally render a component depending on whether game is in play - both render a h5
    const checkListOfPlayers = () => {
        if (playersArray.length >= 1 && isCheckButtonClicked===true) {
            return <PlayerTurn playersArray={playersArray} isCheckButtonClicked={isCheckButtonClicked} fetchAndStorePlayers={fetchAndStorePlayers}/>
        }
        else {return <h5>Waiting for game to start...</h5>}
    }

    return (<div className="container-fluid">
        <button style={{marginTop:10, marginBottom: 5}} type="button" className="btn btn-outline-success btn-lg" onClick={randomise} disabled={isInputDisabled}>RANDOMISE</button>
        <button style={{marginTop:10, marginBottom: 5}} type="button" className="btn btn-success btn-lg" onClick={startGame} disabled={isCheckButtonDisabled}>✓</button>
        <p>• Your random category is <b>{randomCategory}</b></p>
        <p>• Your random letter is <b>{randomLetter}</b></p>
        {checkListOfPlayers()} 
        <div className = "form-inline">
        <input className="form-control" placeholder="Player name here..." value={playerName} onChange={e => setPlayerName(e.target.value)} disabled={isInputDisabled}></input>
        <button type="button" className="btn btn-success" onClick={addPlayerAndUpdate} disabled={isInputDisabled}>Add</button>
        <button type="button" className="btn btn-danger" onClick={removeAllPlayers} disabled={isInputDisabled}>Remove all players...</button>
        <button type="button" className="btn btn-warning" onClick={reset}>Reset</button>
        </div>
        <PlayerList disabled={isInputDisabled} playersArray={playersArray}/>
    </div>
    );
}

export default ScattegoriesContent;
