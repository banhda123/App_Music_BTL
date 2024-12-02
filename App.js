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
import MainScreen from './screens/MainScreen'; 
import WelcomeScreen from './screens/WelcomeScreen'; 
import AlbumList from './components/AlbumList';
import AlbumDetailScreen from "./components/AlbumDetailScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignIn" component={SignInUser} options={{ headerStyle: styles.header, headerTintColor: 'white', title: 'Sign In' }} />
        <Stack.Screen name="SignUp" component={SignUpUser} options={{ headerStyle: styles.header, headerTintColor: 'white', title: 'Sign Up' }} />
        <Stack.Screen name="Search" component={SearchScreen} options={{ headerStyle: styles.header, headerTintColor: 'white', title: 'Search' }} />
        <Stack.Screen name="AlbumList" component={AlbumList} options={{ headerStyle: styles.header, headerTintColor: 'white', title: 'Albums' }} />
        <Stack.Screen name="Main" component={MainScreen} options={{ headerStyle: styles.header, headerTintColor: 'white', title: 'Main' }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerStyle: styles.header, headerTintColor: 'white', title: 'Profile' }} />
        <Stack.Screen name="Home" component={HomeTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="AlbumDetail" component={AlbumDetailScreen} />
        <Stack.Screen 
          name="Music" 
          component={MusicScreen} 
          options={({ navigation }) => ({
            headerStyle: styles.header,
            headerTintColor: 'white',
            headerLeft: () => (
              <Ionicons 
                name="arrow-back" 
                size={24} 
                color="white" 
                style={{ marginLeft: 10 }}
                onPress={() => navigation.goBack()} 
              />
            ),
            headerRight: () => (
              <Ionicons 
                name="list" 
                size={24} 
                color="white" 
                style={{ marginRight: 10 }}
                onPress={() => navigation.navigate('MusicList')} 
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
    screenOptions={({ route }) => ({
      tabBarStyle: {
        backgroundColor: "#1A1C31",
        borderTopColor: "#01020B",
      },
      tabBarActiveTintColor: "#E63946",
      tabBarInactiveTintColor: "gray",
      tabBarIcon: ({ color }) => {
        let iconName;
        if (route.name === 'Menu') {
          iconName = "list-circle-outline";
        } else if (route.name === 'MusicList') {
          iconName = "menu-outline";
        } else if (route.name === 'Search') {
          iconName = "search";
        } else if (route.name === 'Profile') {
          iconName = "man-outline";
        }
        return <Ionicons name={iconName} size={24} color={color} />;
      },
      tabBarLabel: ({ focused, color }) => (
        <Text style={{ color, fontSize: 12, fontWeight: focused ? 'bold' : 'normal' }}>
          {route.name}
        </Text>
      ),
    })}
  >
    <Tab.Screen name="Menu" component={HomeScreen} />
    <Tab.Screen name="MusicList" component={MainScreen} />
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1A1C31',
  },
});
