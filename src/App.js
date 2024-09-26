/** @jsxImportSource @emotion/react */
import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import MusicCard from './MusicCard';
import SearchIcon from './search.svg';
import { setSearchTerm, addToPlaylist, deleteFromPlaylist, updatePlaylist, clearMessage } from './store/musicSlice.js';

const API_KEY = "89838bf2d11d62f073e2804007089934";
const API_URL = "https://ws.audioscrobbler.com/2.0/";

const AppContainer = styled.div`
  height: 100%; 
  width: 100%; 
  border: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #212426;
`;


const Heading = styled.h1`
  font-size: 3rem;
  letter-spacing: 0.9px;
  background: linear-gradient(90deg, rgba(249, 211, 180, 1) 0%, rgba(249, 211, 180, 0) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  width: fit-content;
  font-family: "Roboto Slab", serif;
`;

const SearchBox = styled.div`
  width: 71%;
  margin: 4rem 0 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 1.75rem;
  border-radius: 3rem;
  background: #1f2123;
  -webkit-box-shadow: 5px 5px 7px #1c1d1f, -5px -5px 7px #222527;
  box-shadow: 5px 5px 7px #1c1d1f, -5px -5px 7px #222527;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  font-size: 1.5rem;
  font-family: "Raleway", sans-serif;
  font-weight: 500;
  padding-right: 1rem;
  outline: none;
  color: #a1a1a1;
  background: #1f2123;
`;

const SearchButton = styled.img`
  width: 35px;
  height: 35px;
  cursor: pointer;
`;

const Message = styled.div`
  position: fixed; 
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%); 
  background-color: rgba(0, 0, 0, 0.8); 
  color: #f9d3b4;
  padding: 20px 40px; 
  font-size: 1.5rem; 
  border-radius: 12px; 
  z-index: 1000; 
  text-align: center;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.4); 
`;

const PlaylistContainer = styled.div`
  margin-top: 4rem;
  padding: 2rem;
  background-color: #1f2123;
  border-radius: 12px;
  box-shadow: 5px 5px 7px #1c1d1f, -5px -5px 7px #222527;
  width: 70%;
`;

const PlaylistHeading = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #f9d3b4;
  text-align: center;
  margin-bottom: 1rem;
  font-family: "Roboto Slab", serif;
`;

const PlaylistItem = styled.li`
  font-size: 1.25rem;
  font-weight: 500;
  color: #f0f0f0;
  padding: 0.75rem 1.5rem;
  margin: 0.5rem 0;
  background-color: #343739;
  border-radius: 8px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #44474a;
  }
`;

const Button = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #f44336;
  color: white;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d32f2f;
  }

  &:nth-of-type(2) {
    background-color: #4CAF50;
  }

  &:nth-of-type(2):hover {
    background-color: #45a049;
  }
`;

const App = () => {
  const dispatch = useDispatch();
  const {message, playlist, searchTerm } = useSelector((state) => state.music);

  const [musicList, setMusicList] = useState([]);

  const searchMusic = async (title) => {
    try {
      const response = await fetch(`${API_URL}?method=track.search&track=${title}&api_key=${API_KEY}&format=json`);
      const data = await response.json();
      setMusicList(data.results.trackmatches.track || []);
    } catch (error) {
      console.error("Error fetching music data:", error);
    }
  };

  useEffect(() => {
    searchMusic('Starving');
  }, []);

  const handleAdd = (music) => {
    dispatch(addToPlaylist(music));
    setTimeout(() => dispatch(clearMessage()), 3000);
  };

  const handleDeleteFromPlaylist = (music) => {
    dispatch(deleteFromPlaylist(music));
  };

  const handleUpdatePlaylist = (music) => {
    const newName = prompt("Enter new music name", music.name);
    if (newName) {
      dispatch(updatePlaylist({ music, newName }));
    }
  };

  return (
    <AppContainer>
      <Heading>Musika</Heading>
      {message && <Message>{message}</Message>}
      <SearchBox>
        <SearchInput
          type="text"
          placeholder="Search for music"
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
        <SearchButton
          src={SearchIcon}
          alt="search"
          onClick={() => searchMusic(searchTerm)}
        />
      </SearchBox>
      {musicList?.length > 0 ? (
        <div css={css`
          width: 100%;
          margin-top: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
        `}>
          {musicList.map((music) => (
            <MusicCard
              key={`${music.listeners}-${music.name}`}
              music={music}
              onAdd={handleAdd}
            />
          ))}
        </div>
      ) : (
        <div css={css`
          width: 100%;
          margin-top: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        `}>
          <h2 css={css`
            font-size: 1.25rem;
            color: #f9d3b4;
            font-family: "Raleway", sans-serif;
          `}>No music found</h2>
        </div>
      )}

      {playlist.length > 0 && (
        <PlaylistContainer>
          <PlaylistHeading>Your Playlist</PlaylistHeading>
          <ul>
            {playlist.map((music) => (
              <PlaylistItem key={`${music.listeners} - ${music.name}`}>
                {music.name} by {music.artist}
                <Button onClick={() => handleDeleteFromPlaylist(music)}>Delete</Button>
                <Button onClick={() => handleUpdatePlaylist(music)}>Update</Button>
              </PlaylistItem>
            ))}
          </ul>
        </PlaylistContainer>
      )}
    </AppContainer>
  );
};

export default App;

