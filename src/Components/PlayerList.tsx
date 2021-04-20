import React, {useEffect, useState} from 'react';
import PlayerCard from './PlayerCard';
import './PlayerList.css';


interface Player {
    player: string,
};

function PlayerList() {
    const [playerName, setPlayerName] = useState("")
    const [playersArray, setPlayersArray] = useState<Player[]>([])
    useEffect(() => {fetchAndStorePlayers()}, [])


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


    return(<div className="container">
        <div className = "form-inline">
        <input className="form-control" placeholder="Player name here..." value={playerName} onChange={e => setPlayerName(e.target.value)}></input>
        <button type="button" className="btn btn-success" onClick={addPlayerAndUpdate}>Add</button>
        <button type="button" className="btn btn-danger" onClick={removeAllPlayers}>Remove all players...</button>
        </div>
        <ul className="list-group">{playersArray.map((player) => <PlayerCard key={player.player} player={player.player} />)}</ul>
    </div>)
}

export default PlayerList;