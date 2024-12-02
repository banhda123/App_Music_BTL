import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const AlbumList = ({ album, onPress }) => {
  // Kiểm tra album và artwork có tồn tại không
  if (!album || !album.artwork) {
    return null; // Nếu không có album hoặc artwork, không render gì cả
  }

  return (
    <TouchableOpacity style={styles.albumContainer} onPress={onPress}>
      <Image source={album.artwork} style={styles.artwork} />
      <Text style={styles.albumTitle}>{album.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  albumContainer: {
    marginRight: 15,
    alignItems: 'center',
  },
  artwork: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  albumTitle: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AlbumList;
