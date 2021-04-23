import React, { useState } from 'react';

interface Player {
    id: number,
    player: string,
    in_game: string,
};

interface IPlayerTurnProps {
    playersArray: Player[],
    isCheckButtonClicked: boolean,
    fetchAndStorePlayers: ()=>void,
}

function PlayerTurn(props: IPlayerTurnProps) {
    // let randomPlayer = props.playersArray[(Math.floor(Math.random() * props.playersArray.length))]?.player
    const [currentPlayer, setCurrentPlayer] = useState(chooseRandomPlayer())

    function chooseRandomPlayer() {
        let playersInGame = props.playersArray.filter(player => player.in_game === 'true')
        let randomPlayer = playersInGame[(Math.floor(Math.random() * playersInGame.length))]?.player
        return randomPlayer;
    }

    function handleNext() {
        let currentIndex = props.playersArray.findIndex(player => player.player === currentPlayer) //number of current index
        let playersInGameProperty = 'false'

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

    //person who is not in the game - name appears differnet (struck through) in list component
    //then figure out skipping

    return (<div>
                <h5>It's {currentPlayer}'s turn</h5>
                <div>
                <button type="button" className="btn btn-info" style={{marginBottom:5}} onClick={handleNext}>→</button>
                <button type="button" className="btn btn-danger" style={{marginBottom:5}} onClick={handleDelete}>X</button>
                </div>
    </div>)
}

export default PlayerTurn;

// // function shuffleArray() {
//     for (let i=0; i<props.playersArray.length; i++) {
//         let x = props.playersArray[i]; //on first iteration of loop, this will be first element
//         let y = Math.floor(Math.random() * (i+1)); //on first iteration of loop, this will give 0
//         props.playersArray[i] = props.playersArray[y];
//         props.playersArray[y] = x;
//     }
// }