import React, { useState } from 'react';

interface Player {
    id: number,
    player: string,
    in_game: string,
};

interface IPlayerTurnProps {
    playersArray: Player[],
    fetchAndStorePlayers: ()=>void,
}

function PlayerTurn(props: IPlayerTurnProps) {
    const [currentPlayer, setCurrentPlayer] = useState(chooseRandomPlayer()) //the player whose go it is

    //filter for players who are not eliminated and select player at a random index from resulting array
    function chooseRandomPlayer() {
        let playersInGame = props.playersArray.filter(player => player.in_game === 'true')
        let randomPlayer = playersInGame[(Math.floor(Math.random() * playersInGame.length))]?.player
        return randomPlayer;
    }

    //Next button functionality 
    function handleNext() {
        let currentIndex = props.playersArray.findIndex(player => player.player === currentPlayer) //current player's index
        let playersInGameProperty = 'false'

        //we want to skip over players who are 'out' the game - their in_game property is 'false'
        //we will display a player only when their in_game property is true (and exit the while loop)

        while (playersInGameProperty === 'false') {
            if (currentIndex === props.playersArray.length-1) {
                console.log(currentIndex + " is the max index")
                setCurrentPlayer(props.playersArray[0].player)
                playersInGameProperty = props.playersArray[0].in_game;
                currentIndex = 0;
            }
            else {
                console.log(currentIndex + " is not the max index")
                setCurrentPlayer(props.playersArray[currentIndex+1].player)
                playersInGameProperty = props.playersArray[currentIndex+1].in_game;
                currentIndex++;
            }
        }
    }

    //when you delete a player, you update their in_game property to false - and make a get request so parent knows to update its playerArray
    //, allowing it to signal to the PlayerList component that there has been a change & to use diff styling. Then go to next player
    const handleDelete = async() => {
        const dataToSend = {in_game: "false"}
        await fetch(`https://scattegories-backend-hi.herokuapp.com/names/${currentPlayer}`, {
            method: "PUT",
            body: JSON.stringify(dataToSend),
            headers: {'Content-Type': 'application/json'}
        });
        props.fetchAndStorePlayers()
        handleNext()
    };

    return (<div>
                <h5>It's {currentPlayer}'s turn</h5>
                <div>
                <button type="button" className="btn btn-info" style={{marginBottom:5}} onClick={handleNext}>→</button>
                <button type="button" className="btn btn-danger" style={{marginBottom:5}} onClick={handleDelete}>X</button>
                </div>
    </div>)
}

export default PlayerTurn;