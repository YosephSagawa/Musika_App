/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';

const MusicCardContainer = styled.div`
  width: 310px;
  height: 400px; 
  margin: 1.5rem;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  border: none;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0, 1), box-shadow 0.4s;
  background-color: #1f2123;
  box-shadow: 0px 13px 10px -7px rgba(0, 0, 0, 0.1), 0px 6px 5px rgba(0, 0, 0, 0.07);

  &:hover {
    transform: scale(1.05); 
    box-shadow: 0px 16px 24px -8px rgba(0, 0, 0, 0.3), 0px 12px 16px rgba(0, 0, 0, 0.15);
  }
`;

const MusicCardImage = styled.img`
  width: 100%;
  height: 60%; /* Image height */
  object-fit: cover;
`;

const MusicCardContent = styled.div`
  padding: 0.75rem;
  font-family: 'Raleway', sans-serif;
  color: #f0f0f0;
  text-align: center;
  background-color: #1f2123;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
  height: 40%; 
`;

const MusicCardTitle = styled.h3`
  font-size: 1rem; 
  margin: 0.25rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color:#f9d3b4;
`;

const MusicCardArtist = styled.p`
  font-size: 0.9rem;
  margin: 0.25rem 0; 
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; 
  -webkit-box-orient: vertical;
`;

const AddButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-family: 'Raleway', sans-serif;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  margin-top: auto;
  margin-bottom: 10%;

  &:hover {
    background-color: #d32f2f;
    transform: translateY(-2px); 
  }
`;

const MusicCard = ({ music, onAdd }) => {
  return (
    <MusicCardContainer>
      <MusicCardImage src={music.image?.[3]["#text"] || "https://via.placeholder.com/310x310"} alt={music.name} />
      <MusicCardContent>
        <MusicCardTitle>{music.name}</MusicCardTitle>
        <MusicCardArtist>{music.artist}</MusicCardArtist>
        <AddButton onClick={() => onAdd(music)}>Add to Playlist</AddButton>
      </MusicCardContent>
    </MusicCardContainer>
  );
};

export default MusicCard;
