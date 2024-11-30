import { FlatList, Text, View, StyleSheet, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import { songs } from "../data";
import MusicList from "../components/MusicList";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MainScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ImageBackground source={require('../songs/images/Home.jpg')} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>MusicList</Text>
        </View>

        {/* Music List */}
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={songs}
          renderItem={({ item, index }) => (
            <MusicList item={item} index={index} data={songs} />
          )}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    marginBottom: 20,
    paddingVertical: 10,
    backgroundColor: '#2A2D44', // Nền header
    borderRadius: 10,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF', // Màu chữ trắng
  },
  listContainer: {
    paddingBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#3A3D5C', // Dải phân cách nhẹ
    marginVertical: 10,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2D44', // Nền từng bài nhạc
    padding: 10,
    borderRadius: 10,
  },
  songImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  songTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF', // Màu chữ cho tiêu đề bài hát
  },
  songSubtitle: {
    fontSize: 14,
    color: '#B0B3C8', // Màu chữ phụ nhẹ hơn
  },
});

export default MainScreen;