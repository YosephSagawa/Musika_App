import React from 'react';

const MusicCard = ({ music}) => {
    return (
        <div className="music">
            <div>
                <p>{music.artist}</p>
            </div>

            <div>
                <img src={music.image !== "null" ? music.image[2]["#text"]:"https://via.placeholder.com/400"} alt={music.name} />
            </div>
            <div>
                <span>Listeners:{music.listeners}</span>
                <h3>{music.name}</h3>
            </div>
    </div>
    )
}

export default MusicCard;