import React, { useState, useEffect, useRef } from "react";
import { FlatList, Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons } from "@expo/vector-icons"; // Import Ionicons cho nút mũi tên
import Slider from '@react-native-community/slider';
import { Audio } from "expo-av";
import { useNavigation, useRoute } from "@react-navigation/native";
import { songs } from "../data"; // danh sách bài hát

const MusicScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [currentSong, setCurrentSong] = useState(route.params.index);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1.0); // Thêm state cho âm lượng
  const [isMiniPlayerVisible, setIsMiniPlayerVisible] = useState(false);

  const ref = useRef();

  useEffect(() => {
    const loadAndPlaySong = async () => {
      if (sound) {
        await sound.unloadAsync();  // Ensure previous sound is unloaded
        setSound(null);
        await new Promise(resolve => setTimeout(resolve, 100)); // Short delay to avoid issues
      }

      // Load the new sound
      const { sound: newSound, status } = await Audio.Sound.createAsync(
        songs[currentSong].url,
        { shouldPlay: true, volume }
      );

      setSound(newSound);  // Set the new sound
      setDuration(status.durationMillis);
      setIsPlaying(true);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setPosition(status.positionMillis);
          setSliderPosition(status.positionMillis);
          if (status.didJustFinish) {
            playNextSong();
          }
        }
      });
    };

    loadAndPlaySong();

    return () => {
      if (sound) {
        sound.unloadAsync();  // Cleanup when the component unmounts or when changing songs
      }
    };
  }, [currentSong]);

  useEffect(() => {
    if (sound) {
      sound.setVolumeAsync(volume);
    }
  }, [volume]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      ref.current.scrollToIndex({
        animated: true,
        index: currentSong,
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [currentSong]);

  const playPauseSong = async () => {
    if (sound) {
      try {
        if (isPlaying) {
          await sound.pauseAsync();
        } else {
          await sound.playAsync();
        }
        setIsPlaying(!isPlaying);
      } catch (error) {
        console.error("Error playing/pausing the song:", error);
      }
    } else {
      console.log("Sound is not loaded yet.");
    }
  };

  const playNextSong = () => {
    if (currentSong < songs.length - 1) {
      setCurrentSong(currentSong + 1);
    } else {
      setCurrentSong(0);
    }
  };

  const playPreviousSong = () => {
    if (currentSong > 0) {
      setCurrentSong(currentSong - 1);
    } else {
      setCurrentSong(songs.length - 1);
    }
  };

  const handleSliderValueChange = (value) => {
    setSliderPosition(value);
    if (sound) {
      try {
        sound.setPositionAsync(value);
      } catch (error) {
        console.error("Error setting position:", error);
      }
    } else {
      console.log("Sound is not loaded yet.");
    }
  };

  const formatTime = (timeMillis) => {
    const minutes = Math.floor(timeMillis / 60000);
    const seconds = Math.floor((timeMillis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleMiniPlayerToggle = () => {
    setIsMiniPlayerVisible(!isMiniPlayerVisible);
  };

  const exitScreenAndPlayBackground = () => {
    navigation.goBack();
  };

  const goToMusicList = () => {
    navigation.navigate("MusicList");  // Chuyển đến MusicList screen
  };

  return (
    <SafeAreaView style={styles.container}>
      {!isMiniPlayerVisible && (
        <>
          <FlatList
            horizontal
            ref={ref}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            style={styles.imageSlider}
            data={songs}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => setCurrentSong(index)} style={styles.imageWrapper}>
                <Image source={item.artwork} style={styles.songImage} />
              </TouchableOpacity>
            )}
          />

          <Text style={styles.nowPlayingText}>Now playing</Text>
          <Text style={styles.songTitle}>{songs[currentSong].title}</Text>

          <Slider
            style={styles.slider}
            value={sliderPosition}
            minimumValue={0}
            maximumValue={duration}
            onValueChange={handleSliderValueChange}
          />

          {/* Thêm khung thời gian */}
          <View style={styles.timeWrapper}>
            <Text style={styles.timeText}>{formatTime(position)}</Text>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>

          <View style={styles.controlWrapper}>
            <TouchableOpacity onPress={playPreviousSong}>
              <AntDesign name="stepbackward" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={playPauseSong}>
              {isPlaying ? (
                <AntDesign name="pause" size={40} color="white" />
              ) : (
                <AntDesign name="play" size={40} color="white" />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={playNextSong}>
              <AntDesign name="stepforward" size={30} color="white" />
            </TouchableOpacity>
          </View>

          {/* Thêm thanh điều chỉnh âm lượng */}
          <Text style={styles.volumeLabel}>Volume</Text>
          <Slider
            style={styles.volumeSlider}
            value={volume}
            minimumValue={0}
            maximumValue={1}
            onValueChange={setVolume}
          />

          <View style={styles.headerButtons}>
            <TouchableOpacity onPress={exitScreenAndPlayBackground} style={styles.backButton}>
              <Ionicons name="arrow-back" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={goToMusicList} style={styles.musicListButton}>
              <Ionicons name="musical-notes" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </>
      )}

      {isMiniPlayerVisible && (
        <View style={styles.miniPlayer}>
          <Text style={styles.miniPlayerText}>{songs[currentSong].title}</Text>
          <TouchableOpacity onPress={playPauseSong}>
            {isPlaying ? (
              <AntDesign name="pausecircleo" size={30} color="white" />
            ) : (
              <AntDesign name="playcircleo" size={30} color="white" />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={handleMiniPlayerToggle}>
            <AntDesign name="closecircleo" size={30} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Giữ nguyên các style cũ
  container: {
    backgroundColor: "#2C2C2C",
    height: "100%",
    paddingTop: 20,
    paddingBottom: 20,
  },
  imageSlider: {
    width: "80%",
    height: 250,
    alignSelf: "center",
    borderRadius: 20,
  },
  imageWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  songImage: {
    width: 250,
    height: 250,
    borderRadius: 20,
    marginTop: 10,
  },
  nowPlayingText: {
    color: "white",
    alignSelf: "center",
    fontSize: 16,
    marginTop: 20,
  },
  songTitle: {
    color: "white",
    alignSelf: "center",
    fontSize: 22,
    lineHeight: 26,
    marginTop: 10,
  },
  slider: {
    alignSelf: "center",
    width: "80%",
    marginTop: 20,
  },
  controlWrapper: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 40,
    alignSelf: "center",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  musicListButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  timeWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "80%",
    alignSelf: "center",
  },
  timeText: {
    color: "white",
  },
  volumeLabel: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
  volumeSlider: {
    width: "80%",
    alignSelf: "center",
  },
  miniPlayer: {
    backgroundColor: "#2C2C2C",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    left: "10%",
    right: "10%",
    borderRadius: 10,
  },
  miniPlayerText: {
    color: "white",
    fontSize: 16,
    marginBottom: 10,
  },
  headerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: 20,
    left: 10,
    right: 10,
  },
});

export default MusicScreen;
