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

const Tab = createBottomTabNavigator();

export default function App() {
  const [userRegistered,setUserRegistered] = useState(false);

  const handleRegistrationComplete = ()=> {
    setUserRegistered(!userRegistered);
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarLabel: "Inicio",
            tabBarIcon: ({ color, size})=>(
              <MaterialCommunityIcons name="home" color={color} size={size}/>
            )
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

