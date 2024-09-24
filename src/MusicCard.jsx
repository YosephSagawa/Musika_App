import React from 'react';

const MusicCard = ({ music, onAdd }) => {
    return (
        <div className="music">
            <div>
                <p>{music.artist}</p>
            </div>
            <div>
                <img 
                    src={
                        Array.isArray(music.image) && music.image.length > 0 
                        ? music.image[0] && music.image[0]["#text"] 
                            ? music.image[2]["#text"]
                            : "https://via.placeholder.com/400" 
                        : "https://via.placeholder.com/400"
                    } 
                    alt={music.name} 
                />
            </div>
            <div>
                <span>Listeners: {music.listeners}</span>
                <h3>{music.name}</h3>
                <button onClick={() => onAdd(music)}>Add to Playlist</button>
            </div>
        </div>
    );
};

export default MusicCard;
