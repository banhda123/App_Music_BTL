import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Thêm hình ảnh vào màn hình chào mừng */}
      <Image source={require('../songs/images/Welcome.jpg')} style={styles.logo} />
      
      <Text style={styles.title}>Welcome to Music App</Text>
      <Text style={styles.subtitle}>Your favorite music, all in one place.</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#01020B',
  },
  logo: {
    width: 200,  // Đặt kích thước phù hợp với hình ảnh
    height: 200, // Đặt kích thước phù hợp với hình ảnh
    marginBottom: 40, // Khoảng cách giữa logo và tiêu đề
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#bbb',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#8E44AD',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
