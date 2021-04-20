import React from 'react';

interface PlayerCardProps {
    player: string,
}

function PlayerCard(props: PlayerCardProps) {
    return(<li className="list-group-item">{props.player}</li>)
}

export default PlayerCard;