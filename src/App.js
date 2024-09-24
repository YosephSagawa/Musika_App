import React, { useState, useEffect } from "react";
import './App.css';
import MusicCard from "./MusicCard";
import SearchIcon from './search.svg';

const API_KEY = "89838bf2d11d62f073e2804007089934";
const API_URL = "https://ws.audioscrobbler.com/2.0/";


const App = () => {
    const [musics, setMusic] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [message, setMessage] = useState('');
    const [playlist, setPlaylist] = useState([]);

    const searchMusic = async (title) => {
        try {
            const response = await fetch(`${API_URL}?method=track.search&track=${title}&api_key=${API_KEY}&format=json`);
            const data = await response.json();
            setMusic(data.results.trackmatches.track || []); // Adjust based on API response structure
        } catch (error) {
            console.error("Error fetching music data:", error);
        }
    };

    useEffect(() => {
        searchMusic('Starving');
    }, []);

    const handleAdd = (music) => {
        const isAlreadyInPlaylist = playlist.some(
            (track) => track.listeners === music.listeners && track.name === music.name
        );
    
        if (isAlreadyInPlaylist) {
            setMessage(`${music.name} is already in the playlist!`);
        } else {
            setPlaylist([...playlist, music]); 
            setMessage(`${music.name} successfully added to playlist! Scroll down to view.`);
        }
    
        setTimeout(() => setMessage(''), 3000);
    };
    const handleDeleteFromPlaylist = (music) => {
        setPlaylist(playlist.filter(
            (track) => !(track.listeners === music.listeners && track.name === music.name)
        ));
    };

    const handleUpdatePlaylist = (music, newName) => {
        setPlaylist(playlist.map(
            (track) => track.listeners === music.listeners && track.name === music.name
                ? { ...track, name: newName }
                : track
        ));
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
                    onClick={() => searchMusic(searchTerm)}
                />
            </div>

            {message && <div className="message">{message}</div>}

            {musics?.length > 0 ? (
                <div className="container">
                    {musics.map((music) => (
                        <MusicCard
                            key={`${music.listeners}-${music.name}`} 
                            music={music}
                            onAdd={handleAdd} 
                            onDelete={() => handleDeleteFromPlaylist(music)}
                            onUpdate={() => {
                                const newName = prompt("Enter new music name", music.name);
                                if (newName) {
                                    handleUpdatePlaylist(music, newName);
                                }
                            }}
                        />
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h2>No music found</h2>
                </div>
            )}

            {playlist.length > 0 && (
                <div className="playlist">
                    <h2>Your Playlist</h2>
                    <ul>
                        {playlist.map((music) => (
                            <li key={`${music.listeners} - ${music.name}`}>
                                {music.name} by {music.artist}
                                <button onClick={() => handleDeleteFromPlaylist(music)}>Delete</button>
                                <button onClick={() => {
                                    const newName = prompt("Enter new music name", music.name);
                                    if (newName) {
                                        handleUpdatePlaylist(music, newName);
                                    }
                                }}>
                                    Update
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default App;
