import React from 'react';

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
    // const [playerTurn, setPlayerTurn] = useState("Waiting for game to start...")
//once button clicked, say game in progress


    return(<div>
        <h5 style={{fontFamily: "Merienda One"}}>{props.isCheckButtonClicked ? `It's ${props.playersArray[0]?.player}'s turn`: "Waiting for game to start..."}</h5>
        </div>)
}

export default PlayerTurn;

// //function shuffleArray() {
//     for (let i=props.playersArray.length -1; i>0; i++) {
//         let newPos = Math.floor(Math.random() * (i + 1));
//         let temp = props.playersArray[i];
//         props.playersArray[i] = props.playersArray[newPos];
//         props.playersArray[newPos] = temp;
//     };
//     console.log(props.playersArray)
// };