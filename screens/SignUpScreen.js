import { Image, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet, Dimensions } from "react-native";
import React, { useState } from "react";
import ToastManager, { Toast } from 'toastify-react-native';
import { usersData } from '../data1'; // Import your mock data

const SignUpUser = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    const userExists = usersData.find(user => user.email === email || user.username === username);

    if (!email || !username || !password) {
      Toast.error('Please fill all fields');
    } else if (userExists) {
      Toast.error('Email or username already taken');
    } else {
      usersData.push({ email, username, password });

      Toast.success('Account created successfully');
      navigation.navigate("SignIn");
    }
  };

  return (
    <View style={styles.container}>
      <ToastManager position="top" duration={2000} />
      
      {/* Logo as background */}
      <View style={styles.backgroundContainer}>
        <Image
          style={styles.logo}
          source={require('../songs/images/logo.jpg')}
        />
      </View>

      {/* Form Elements */}
      <View style={styles.formContainer}>
        {/* Sign Up Title */}
        <Text style={styles.title}>Sign Up</Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter your email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="rgba(235, 235, 245, 0.6)"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Username Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Create your username</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="rgba(235, 235, 245, 0.6)"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Create your password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="rgba(235, 235, 245, 0.6)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Sign In Link */}
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.signInText}>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flex: 1,
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    height: '100%',
    width: '100%',
  },
  logo: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    resizeMode: 'cover',
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 36,
    color: "white",
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    color: "white",
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    height: 50,
    fontSize: 17,
    paddingLeft: 14,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    color: "white",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    width: "100%",
  },
  button: {
    width: "90%",
    height: 50,
    backgroundColor: "rgba(0, 128, 128, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInText: {
    color: "white",
    fontSize: 17,
    fontWeight: '600',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});

export default SignUpUser;
