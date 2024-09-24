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
            (track) => track.mbid === music.mbid || (track.name === music.name && track.artist === music.artist)
        );
        
        if (isAlreadyInPlaylist) {
            setMessage(`${music.name} is already in the playlist!`);
        } else {
            setPlaylist([...playlist, music]);
            setMessage(`${music.name} successfully added to playlist!`);
        }
    
        setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    };
    const handleDeleteFromPlaylist = (musicId) => {
        setPlaylist(playlist.filter(music => music.mbid !== musicId));
    };

    const handleUpdatePlaylist = (musicId, newName) => {
        setPlaylist(playlist.map(music =>
            music.mbid === musicId ? { ...music, name: newName } : music
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
                            key={music.mbid || `${music.name}-${music.artist}`} 
                            music={music}
                            onAdd={handleAdd} 
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
                            <li key={music.mbid || `${music.name}-${music.artist}`}>
                                {music.name} by {music.artist}
                                <button onClick={() => handleDeleteFromPlaylist(music.mbid)}>Delete</button>
                                <button onClick={() => {
                                    const newName = prompt("Enter new music name", music.name);
                                    if (newName) {
                                        handleUpdatePlaylist(music.mbid, newName);
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
