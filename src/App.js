import React from "react";
import { useState, useEffect } from "react";
import './App.css';
import MusicCard from "./MusicCard";
import SearchIcon from './search.svg';

const API_KEY = "89838bf2d11d62f073e2804007089934";
const API_URL = "https://ws.audioscrobbler.com/2.0/";


const App = () => {
    const [musics, setMusic] = useState([]);
    const[searchTerm, setSearchTerm] = useState('');
    const[message, setMessage] = useState('');
    const[playlist, setPlaylist] = useState([]);
    const searchMusic = async (title) => {
        try {
            const response = await fetch(`${API_URL}?method=track.search&track=${title}&api_key=${API_KEY}&format=json`);
            const data = await response.json();
            setMusic(data.results.trackmatches.track || []); // Adjust based on API response structure
        } catch (error) {
            console.error("Error fetching music data:", error);
        }
    }

    useEffect(() => {
        searchMusic('Starving');
    }, []);

    const handleDelete = (musicName,artistName) =>{
        setMusic(musics.filter(music => !(music.name === musicName && music.artist === artistName)));
    };

    const handleUpdate = (musicName,artistName, newName)  => {
        setMusic(musics.map(music => 
            music.name === musicName && music.artist === artistName
             ? { ...music, name: newName} : music));
    };

    const handleAdd = (music) => {
        setPlaylist([...playlist, music]);
        setMessage(`${music.name} by ${music.artist} successfully added to playlist!`);
        setTimeout(() => setMessage(''), 3000); 
    };    

    return (
        <div className="app">
            <h1>Musika</h1>

            <div className="search">
                <input
                    type="text"
                    placeholder="Search for music"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img 
                src={SearchIcon}
                alt="search"
                onClick={() => searchMusic(searchTerm) }
                />
            </div>

            {message && <div className = "message">{message}</div>}

            {musics?.length>0
                ?(
                    <div className="container">
                    {musics.map((music) => (
                        <MusicCard 
                        key={`${music.name} - ${music.artist}`}
                        music={music}
                        onDelete={handleDelete}
                        onUpdate={handleUpdate}
                        onAdd={handleAdd}
                        />
                    ))}
                 </div>
                ):(
                    <div className="empty">
                        <h2>No music found</h2>
                    </div>
                )
            }
            {playlist.length > 0 && (
                <div className="playlist">
                    <h2>Your Playlist</h2>
                    <ul>
                        {playlist.map((music, index) => (
                            <li key={index}>{music.name} by {music.artist}</li>
                        ))}
                    </ul>
                </div>
            )}        
        </div>
    );
};

export default App;