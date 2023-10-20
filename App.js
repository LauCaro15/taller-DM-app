import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Dimensions, StyleSheet } from "react-native";
import WelcomeSlide from "./src/screens/WelcomeSlide";
import RegisterForm from "./src/screens/RegisterForm";
import LoginForm from "./src/screens/LoginForm";
import { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./src/stack/HomeStack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ApiFakeAxios from "./src/screens/ApiFakeAxios";
import ApiMoviesAxios from "./src/screens/ApiMoviesAxios";
import ApiPokemonAxios from "./src/screens/ApiPokemonAxios";
import PokemonStack from "./src/stack/PokemonStack";
import ProductStack from "./src/stack/ProductStack";
import MovieStack from "./src/stack/MovieStack";
import MainNavigator from "./MainNavigator";

const Tab = createBottomTabNavigator();

export default function App() {
  const [userRegistered,setUserRegistered] = useState(false);

  const handleRegistrationComplete = ()=> {
    setUserRegistered(!userRegistered);
  };

  return (
    <NavigationContainer>
      <MainNavigator></MainNavigator>
    </NavigationContainer>
  );
}
