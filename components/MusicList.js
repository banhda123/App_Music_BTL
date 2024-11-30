import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const MusicList = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#3A3A3C",
        height: 100, // Increased height
        borderRadius: 15, // More rounded corners
        marginBottom: 15, // More space below the element
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 20, // More padding on the left
        justifyContent: "space-between",

      }}
      onPress={() => navigation.navigate("Music", { index: item.id - 1 })}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={{
            width: 60,
            height: 60,
            borderRadius: 10,
            marginRight: 10,
          }}
          source={item.artwork}
        />
        <View>
          <Text style={{ color: "white", fontWeight: "bold" }}>{item.artist}</Text>
          <Text style={{ color: "white" }}>{item.title}</Text>
        </View>
      </View>
      <AntDesign
        name="play"
        size={24}
        color="white"
        style={{ paddingRight: 20 }}
      />
    </TouchableOpacity>
  );
};

export default MusicList;