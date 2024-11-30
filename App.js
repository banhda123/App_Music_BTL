import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpUser from './screens/SignUpScreen';
import SignInUser from './screens/SignInScreen';
import HomeScreen from './screens/HomeScreen';
import { useState } from 'react';
import SearchScreen from './screens/SearchScreen';
import MusicScreen from './screens/MusicScreen';
import ProfileScreen from './screens/ProfileScreen';
import MainScreen from './screens/MainScreen'; // Import MainScreen
import WelcomeScreen from './screens/WelcomeScreen'; // Import WelcomeScreen

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        {/* WelcomeScreen will be the first screen */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignIn" component={SignInUser} options={{ headerShown: true }} />
        <Stack.Screen name="SignUp" component={SignUpUser} options={{ headerShown: true }} />
        <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: true }} />
        
        {/* MainScreen added to Stack Navigator */}
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: true }} />
        
        {/* Add ProfileScreen to the Stack Navigator */}
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen} 
          options={{ headerShown: true }}
        />
        
        {/* Home tab navigator inside Stack */}
        <Stack.Screen
          name="Home"
          component={HomeTabNavigator}
          options={{ headerShown: false }}  // Hide header in Tab Navigator screen
        />
        
        {/* MusicScreen */}
        <Stack.Screen 
          name="Music" 
          component={MusicScreen} 
          options={({ navigation }) => ({
            headerShown: true,
            headerLeft: () => (
              <Ionicons 
                name="arrow-back" 
                size={24} 
                color="white" 
                style={{ marginLeft: 10 }}
                onPress={() => navigation.goBack()} // Back button action
              />
            ),
            headerRight: () => (
              <Ionicons 
                name="list" 
                size={24} 
                color="white" 
                style={{ marginRight: 10 }}
                onPress={() => navigation.navigate('MusicList')} // Navigate to MusicList
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        backgroundColor: "#1A1C31",
        borderTopColor: "#01020B",
      }
    }}
  >
    <Tab.Screen
      name="Menu"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Menu',
        tabBarIcon: ({ color }) => <Ionicons name="list-circle-outline" size={24} color={color} />,
      }}
    />
    
    <Tab.Screen
      name="MusicList"
      component={MainScreen}  // This will navigate to MainScreen when selected
      options={{
        tabBarLabel: 'Musiclist',
        tabBarIcon: ({ color }) => <Ionicons name="menu-outline" size={24} color={color} />,
      }}
    />

    {/* Swap Profile and Search tabs */}
    <Tab.Screen
      name="Search"
      component={SearchScreen}
      options={{
        tabBarLabel: 'Search',
        tabBarIcon: ({ color }) => <Ionicons name="search" size={24} color={color} />,
      }}
    />
    
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color }) => <Ionicons name="man-outline" size={24} color={color} />,
      }}
    />
  </Tab.Navigator>
);  
