import React, { createContext, useContext, useState } from 'react';

const MusicContext = createContext();

export const useMusic = () => {
  return useContext(MusicContext);
};

export const MusicProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null); 

  const setTrack = (track) => {
    setCurrentTrack(track); 
  };

  const clearTrack = () => {
    setCurrentTrack(null); 
  };

  return (
    <MusicContext.Provider value={{ currentTrack, setTrack, clearTrack }}>
      {children}
    </MusicContext.Provider>
  );
};
