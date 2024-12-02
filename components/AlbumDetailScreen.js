import React, { useState, useEffect } from "react"; 
import { FlatList, Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { songs } from "../data"; 
import { AntDesign, Ionicons } from "@expo/vector-icons";
import MusicList from "./MusicList";
const AlbumDetailScreen = ({ route, navigation }) => {
    const { album, songs } = route.params;
    const [sound, setSound] = useState();  
    const [isPlaying, setIsPlaying] = useState(false); 
    
    const exitScreenAndPlayBackground = () => {
      navigation.goBack();
    };
  

    const playSong = async (url) => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          { uri: url },
          { shouldPlay: true }
        );
        setSound(sound);
        setIsPlaying(true);
      } catch (error) {
        console.log("Error playing the song:", error);
      }
    };
  

    const stopMusic = async () => {
      if (sound) {
        await sound.stopAsync();
        setIsPlaying(false);
      }
    };
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.headerButtons}>
            <TouchableOpacity onPress={exitScreenAndPlayBackground} style={styles.backButton}>
              <Ionicons name="arrow-back" size={30} color="white" />
            </TouchableOpacity>
            
          </View>

      <View style={styles.header}>
        <Image source={album.artwork} style={styles.albumArtwork} />
        <Text style={styles.albumTitle}>{album.title}</Text>
      </View>

        

      {/* Song List */}
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <MusicList 
            item={item} 
            index={index} 
            data={songs} 
            onPlay={() => playSong(item.url)} 
            isPlaying={isPlaying}
            onStop={stopMusic}  
          />
        )}
        contentContainerStyle={styles.songList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#1a1a2e",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  albumArtwork: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  albumTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  songList: {
    paddingBottom: 20,
  },
  songItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#2A2D44",
    padding: 10,
    borderRadius: 10,
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
  },
  songDetails: {
    flex: 1,
  },
  songTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  songArtist: {
    fontSize: 14,
    color: "#B0B3C8",
  },
  playButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: "#00FFF6",
    borderRadius: 5,
  },
  playButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AlbumDetailScreen;
