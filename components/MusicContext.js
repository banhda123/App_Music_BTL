import React, { createContext, useContext, useState } from 'react';

const MusicContext = createContext();

export const useMusic = () => {
  return useContext(MusicContext);
};

export const MusicProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null); // Track hiện tại

  const setTrack = (track) => {
    setCurrentTrack(track); // Set track đang phát
  };

  const clearTrack = () => {
    setCurrentTrack(null); // Xóa track khi không còn bài hát nào đang phát
  };

  return (
    <MusicContext.Provider value={{ currentTrack, setTrack, clearTrack }}>
      {children}
    </MusicContext.Provider>
  );
};
