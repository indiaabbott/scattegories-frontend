import React from 'react';

interface PlayerCardProps {
    player: string,
}

function PlayerCard(props: PlayerCardProps) {
    return(<div>
        {props.player}
        </div>)
}

export default PlayerCard;