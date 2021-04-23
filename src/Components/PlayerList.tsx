import React from 'react';
import PlayerCard from './PlayerCard';
import './PlayerList.css';

interface Player {
    id: number,
    player: string,
    in_game: string,
};

interface IPlayerProps {
    playersArray: Player[],
}


//map over my list of players, each element is applied styling outlined by the PlayerCard component
function PlayerList(props: IPlayerProps) {

    return(<div>
        <div className="container-fluid">
        <div className="row">{props.playersArray.map((player, index) => <PlayerCard key={player.player} player={player.player} playerNumber={index+1} in_game={player.in_game} />)}</div>
        </div>
    </div>)
}

export default PlayerList;