import React from 'react';
import './PlayerList.css';

interface PlayerCardProps {
    player: string,
    playerNumber: number,
    in_game: string
}
//if in game false, inline styling grey or add classname


function PlayerCard(props: PlayerCardProps) {

    function makeClassName() {
        if (props.in_game === 'true') {
            return "list-group-item item-in-game"
        }
        else {return "list-group-item item-not-in-game"}
    }

    return(<div>
        <li className={makeClassName()}>Player {props.playerNumber}: {props.player}</li>
        </div>)
}

export default PlayerCard;