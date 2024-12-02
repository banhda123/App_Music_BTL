import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useMusicPlayerContext } from '../components/MusicPlayerContext';

const MiniPlayer = () => {
  const { currentSong, isPlaying, togglePlayPause } = useMusicPlayerContext();

  return (
    <View style={styles.miniPlayer}>
      <Text style={styles.miniPlayerText}>{currentSong.title}</Text>
      <TouchableOpacity onPress={togglePlayPause}>
        {isPlaying ? (
          <AntDesign name="pausecircleo" size={30} color="white" />
        ) : (
          <AntDesign name="playcircleo" size={30} color="white" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  miniPlayer: {
    backgroundColor: "#2C2C2C",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  miniPlayerText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
});

export default MiniPlayer;
