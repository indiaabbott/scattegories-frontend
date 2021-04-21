import React from 'react';

interface PlayerCardProps {
    player: string,
    playerNumber: number,
}

function PlayerCard(props: PlayerCardProps) {
    return(<div>
        <li className="list-group-item">Player {props.playerNumber}: {props.player}</li>
        </div>)
}

export default PlayerCard;