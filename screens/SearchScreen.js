import { FlatList, Text, TextInput, View, Image, TouchableOpacity, StyleSheet, ImageBackground, ScrollView } from "react-native";
import React, { useState } from "react";
import { songs, albums } from "../data"; 
import MusicList from "../components/MusicList";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSongs, setFilteredSongs] = useState(songs);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedAlbum(null); 
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

  const filterByAlbum = (album) => {
    setSearchQuery("");
    setSelectedAlbum(album);
    const filtered = songs.filter(song => album.songs.includes(song.id));
    setFilteredSongs(filtered);
  };

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
        
        {/* Thanh tìm kiếm album */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.albumScroll}
        >
          {albums.map((album) => (
            <TouchableOpacity
              key={album.id}
              style={[
                styles.albumButton,
                selectedAlbum?.id === album.id && styles.selectedAlbum,
              ]}
              onPress={() => filterByAlbum(album)}
            >
              <Text style={styles.albumButtonText}>{album.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

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
    resizeMode: "cover",
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
  albumScroll: {
    paddingVertical: 10,
    paddingLeft: 10,
  },
  albumButton: {
    backgroundColor: "rgba(94, 94, 102, 0.3)",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 10,
    width: 100,
    height: 40, 
    alignItems: "center",
    justifyContent: "center", 
  },
  selectedAlbum: {
    backgroundColor: "#00FFF6",
  },
  albumButtonText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
  songList: {
    paddingBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: "#3A3D5C",
    marginVertical: 10,
    marginHorizontal: 16, 
  },
  songItem: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 10,
    padding: 12,
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
});


export default SearchScreen;
