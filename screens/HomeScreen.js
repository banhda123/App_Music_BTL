import React, { useEffect, useState } from "react";
import { 
  FlatList, 
  Text, 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ImageBackground 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { songs, albums } from "../data"; 
import MusicList from "../components/MusicList";
import AlbumList from "../components/AlbumList";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem("email");
      const storedUsername = await AsyncStorage.getItem("username");
      const storedUserImage = await AsyncStorage.getItem("userImage");

      if (storedEmail) setEmail(storedEmail);
      if (storedUsername) setUsername(storedUsername);
      if (storedUserImage) setUserImage(storedUserImage);

      if (!storedEmail || !storedUsername) {
        navigation.navigate("SignIn");
      }
    } catch (error) {
      console.log("Error retrieving data:", error);
    }
  };

  const navigateToProfile = () => {
    navigation.navigate("ProfileScreen");
  };

  const getSongsByIds = (ids) => {
    return songs.filter((song) => ids.includes(song.id));
  };

  const groupSongsByGenre = () => {
    const grouped = songs.reduce((acc, song) => {
      if (!acc[song.genre]) {
        acc[song.genre] = [];
      }
      acc[song.genre].push(song);
      return acc;
    }, {});
    return Object.entries(grouped);
  };

  const genres = groupSongsByGenre();

  const goToMusicList = () => {
    navigation.navigate("MusicList");  
  };

  return (
    <ImageBackground source={require('../songs/images/Home.jpg')} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>Hello, {username}!</Text>
            <Text style={styles.subHeader}>{email}</Text>
          </View>
          {userImage && (
            <TouchableOpacity onPress={navigateToProfile}>
              <Image source={{ uri: userImage }} style={styles.profileImage} />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={goToMusicList} style={styles.musicListButton}>
              <Ionicons name="musical-notes" size={30} color="white" />
            </TouchableOpacity>
            
        </View>
        
        {/* Albums List */}
        <FlatList
  data={albums}
  keyExtractor={(item) => item.id.toString()}
  horizontal
  renderItem={({ item }) => (
    <View style={styles.albumContainer}>
      <AlbumList
        album={item}
        onPress={() =>
          navigation.navigate("AlbumDetail", {
            album: item,
            songs: getSongsByIds(item.songs),
          })
        }
      />
      {/* Đảm bảo rằng item.name là một chuỗi hợp lệ */}
      {item.title && <Text style={styles.albumName}>{item.title}</Text>}
    </View>
  )}
  contentContainerStyle={styles.albumListContainer}
  showsHorizontalScrollIndicator={false}
/>


        {/* Genre List */}
        <FlatList
          data={genres}
          keyExtractor={(item) => item[0]}
          renderItem={({ item }) => (
            <View style={styles.genreContainer}>
              <Text style={styles.genreTitle}>{item[0]}</Text>
              <FlatList
                horizontal
                data={item[1]}
                renderItem={({ item }) => <MusicList item={item} />}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          )}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  header: {
    padding: 20,
    backgroundColor: "#1a1a2e",
    borderBottomWidth: 1,
    borderBottomColor: "#2e2e4d",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 16,
    color: "#b5b5c3",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#00FFF6",
  },
  albumListContainer: {
    paddingVertical: 10,
    paddingLeft: 10,
  },
  albumContainer: {
    alignItems: "center", // Center the album name below each album
    marginRight: 15, // Add some space between items
  },
  albumName: {
    fontSize: 14,
    color: "#ffffff",
    marginTop: 5, // Adds space between the album image and its name
  },
  genreContainer: {
    marginVertical: 10,
  },
  genreTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginLeft: 10,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  separator: {
    width: 10,
  },
});

export default HomeScreen;
