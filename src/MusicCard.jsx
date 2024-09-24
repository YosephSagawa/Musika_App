import React from 'react';

const MusicCard = ({music, onDelete, onUpdate, onAdd}) => {
    const handleUpdate = () =>{
        const newName = prompt("Enter new music name", music.name);
        if(newName){
            onUpdate(music.name, music.artist, newName);
        }
    };
    
    return(
        <div className="music">
            <div>
                <p>{music.artist}</p>
            </div>
            <div>
                <img src={Array.isArray(music.image) && music.image.length >2 ? music.image[2]["#text"]:"https://via.placeholder.com/400"} alt="muic.name" />
            </div>
            <div>
                <span>Listeners:{music.listeners}</span>
                <h3>{music.name}</h3>
                <button onClick={handleUpdate}>Update</button>
                <button onClick={() => onDelete(music.name, music.atist)}>Delete</button>
                <button onClick={() => onAdd(music)}>Add</button>
            </div>
        </div>
    );
};


export default MusicCard;