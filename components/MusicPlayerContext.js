import React, { createContext, useContext, useState } from 'react';

const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
  const [isMiniPlayerVisible, setMiniPlayerVisible] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        isMiniPlayerVisible,
        setMiniPlayerVisible,
        currentSong,
        setCurrentSong,
        isPlaying,
        togglePlayPause,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};
