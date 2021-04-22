import React, { useState, useEffect } from 'react';

interface Player {
    id: number,
    player: string,
    in_game: string,
};

interface IPlayerTurnProps {
    playersArray: Player[],
    isCheckButtonClicked: boolean,
}

function PlayerTurn(props: IPlayerTurnProps) {

    let randomPlayer = props.playersArray[(Math.floor(Math.random() * props.playersArray.length))]?.player
    console.log("random player is " + randomPlayer)
    const [currentPlayer, setCurrentPlayer] = useState(randomPlayer)
    console.log("current player is " + currentPlayer)

    function nextButton() {
        let currentPlayer = randomPlayer;
        console.log(currentPlayer)
    }
    nextButton()

    return (<div>
                <h5 style={{ fontFamily: "Merienda One" }}>It's {currentPlayer}'s turn</h5>
                <button>Next Player</button>
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