import { FlatList, Text, View, StyleSheet, TouchableOpacity, Image, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import { songs } from "../data";
import MusicList from "../components/MusicList";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
      if (storedEmail !== null) {
        setEmail(storedEmail);
      }
      if (!storedEmail || !storedUsername) {
        navigation.navigate("SignIn");
      }
      if (storedUsername !== null) {
        setUsername(storedUsername);
      }
      const storedUserImage = await AsyncStorage.getItem("userImage");
      if (storedUserImage) {
        setUserImage(storedUserImage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToProfile = () => {
    navigation.navigate("ProfileScreen");
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
        </View>
        <FlatList
          data={genres}
          keyExtractor={(item) => item[0]}
          renderItem={({ item }) => (
            <View style={styles.genreContainer}>
              <Text style={styles.genreTitle}>{item[0]}</Text>
              <FlatList
                horizontal
                data={item[1]}
                renderItem={({ item }) => (
                  <MusicList item={item} />
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
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
    resizeMode: 'cover',
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
    padding: 10,
  },
  separator: {
    width: 10,
  },
});

export default HomeScreen;