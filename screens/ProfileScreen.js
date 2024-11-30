import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { usersData } from "../data1"; // Import data1.js để lấy thông tin user

const ProfileScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [userImage, setUserImage] = useState(null); // Lưu ảnh người dùng

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem("email");
      const storedUsername = await AsyncStorage.getItem("username");

      if (storedEmail !== null && storedUsername !== null) {
        setEmail(storedEmail);
        setUsername(storedUsername);

        // Tìm user trong dữ liệu và lấy ảnh của user
        const user = usersData.find((u) => u.email === storedEmail);
        if (user) {
          setUserImage(user.userimage); // Lưu ảnh người dùng
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("email");
      await AsyncStorage.removeItem("username");
      navigation.navigate("SignIn");
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Đặt ảnh người dùng làm background của toàn bộ màn hình */}
      <Image
        source={userImage || require("../songs/images/default.jpg")}
        style={styles.backgroundImage}
      />
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.profileImage}
            source={userImage || require("../songs/images/default.jpg")}
          />
        </View>
        <Text style={styles.profileText}>Profile</Text>

        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="face-man-profile"
            size={80}
            color="#00FFF6"
          />
        </View>

        <Text style={styles.username}>{username}</Text>
        <Text style={styles.email}>{email}</Text>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative", // Để có thể đặt các phần tử lên trên ảnh nền
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject, // Để ảnh phủ toàn bộ màn hình
    opacity: 0.3, // Mờ để các phần tử khác dễ nhìn hơn
    zIndex: -1, // Đảm bảo ảnh ở dưới các phần tử khác
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent", // Đảm bảo LinearGradient không bị che khuất
  },
  imageContainer: {
    marginTop: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#00FFF6",
    alignSelf: "center",
  },
  profileText: {
    color: "black", // Change to black for a more natural look
    fontSize: 24,
    fontWeight: "700",
    marginTop: 20,
  },
  iconContainer: {
    marginTop: 15,
  },
  username: {
    color: "black", // Change to black for a more natural look
    fontSize: 20,
    fontWeight: "600",
    marginTop: 15,
  },
  email: {
    color: "#555", // Softer color for email text
    fontSize: 16,
    marginTop: 5,
  },
  logoutButton: {
    marginTop: 50,
    width: "80%",
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF4081", // Soft pink background for the button
  },
  logoutText: {
    color: "black", // Change text color to black
    fontSize: 18,
    fontWeight: "600",
    textTransform: "uppercase", // Chữ hoa cho ấn tượng mạnh mẽ
    letterSpacing: 1.5, // Khoảng cách chữ để tạo sự rõ ràng
    textAlign: "center",
  },
});

export default ProfileScreen;
