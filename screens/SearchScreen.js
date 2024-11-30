import { FlatList, Text, TextInput, View, Image, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import React, { useState } from "react";
import { songs } from "../data";
import MusicList from "../components/MusicList";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSongs, setFilteredSongs] = useState(songs);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredSongs(songs);
    } else {
      const filtered = songs.filter(song =>
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase()) ||
        song.genre.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSongs(filtered);
    }
  };

  const renderSongItem = ({ item }) => (
    <TouchableOpacity style={styles.songItem}>
      <Image source={item.artwork} style={styles.artwork} />
      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>{item.title}</Text>
        <Text style={styles.songArtist}>{item.artist}</Text>
        <Text style={styles.songGenre}>{item.genre}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={require('../songs/images/Home.jpg')} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search songs, artists, or genres..."
          placeholderTextColor="rgba(235, 235, 245, 0.6)"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <FlatList
          contentContainerStyle={styles.songList}
          data={filteredSongs}
          renderItem={({ item, index }) => (
            <MusicList item={item} index={index} data={filteredSongs} />
          )}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No songs found</Text>
          }
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flex: 1,
    paddingHorizontal: 16,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  searchInput: {
    height: 50,
    backgroundColor: "rgba(94, 94, 102, 0.24)",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 17,
    color: "white",
    marginVertical: 16,
  },
  songList: {
    paddingBottom: 20,
  },
  songItem: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  artwork: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  songInfo: {
    marginLeft: 12,
    flex: 1,
  },
  songTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  songArtist: {
    color: "rgba(235, 235, 245, 0.8)",
    fontSize: 16,
  },
  songGenre: {
    color: "rgba(235, 235, 245, 0.6)",
    fontSize: 14,
  },
  emptyText: {
    color: "rgba(235, 235, 245, 0.6)",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  separator: {
    height: 1,
    backgroundColor: "#3A3D5C",
    marginVertical: 10,
  },
});

export default SearchScreen;