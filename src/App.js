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
    const searchMusic = async (title) => {
        try {
            const response = await fetch(`${API_URL}?method=track.search&track=${title}&api_key=${API_KEY}&format=json`);
            const data = await response.json();
            console.log("API response:",data);//log the entire response object
            console.log(data.results.trackmatches.track);//log specific array from the response
            setMusic(data.results.trackmatches.track); // Adjust based on API response structure
        } catch (error) {
            console.error("Error fetching music data:", error);
        }
    }

    useEffect(() => {
        searchMusic('Starving');
    }, []);

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

            {
                musics?.length>0
                ?(
                    <div className="container">
                    {musics.map((music) => (
                        <MusicCard music={music}/>
                    ))}
                 </div>
                ):(
                    <div className="empty">
                        <h2>No music found</h2>
                    </div>
                )
            }


        </div>
    );
}

export default App;