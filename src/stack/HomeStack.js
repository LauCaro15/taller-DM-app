import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import WelcomeSlide from '../screens/WelcomeSlide';
import RegisterForm from '../screens/RegisterForm';
import LoginForm from '../screens/LoginForm';


const Stack = createStackNavigator();

const HomeStack = () => {
    const [orientation, setOrientation] = useState(null);

    const handleOrientationChange = ({ window: { width, height } }) => {
        const newOrientation = height > width ? "Portrait" : "Landscape";
        setOrientation(newOrientation);
    };

    useEffect(() => {
        Dimensions.addEventListener("change", handleOrientationChange);
        return () => {
          //Dimensions.removeEventListener("change", handleOrientationChange);
        };
    }, []);

    useEffect(() => {
        console.log("Orientation:", orientation);
    }, [orientation]); // Se ejecutará cuando cambie la orientación

  return (
    <Stack.Navigator
    initialRouteName="Welcome"
    screenOptions={{
        headerStyle:
        orientation === "Portrait"
            ? styles.headerStylePortrait
            : styles.headerStyleLandscape,
            headerTintColor: "#fff",}}
    >
        <Stack.Screen
            name="Welcome"
            component={WelcomeSlide}
            options={{ headerShown: false }} // Esto oculta el encabezado
        />
        <Stack.Screen
            name="Registro"
            component={RegisterForm}
            options={{ title: "Registro" }} // Personaliza el título del encabezado
        />
        <Stack.Screen
            name="Login"
            component={LoginForm}
            options={{ title: "Login" }} // Personaliza el título del encabezado
        />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    headerStylePortrait: {
      backgroundColor: "#2181CD",
      height: 100,
    },
    headerStyleLandscape: {
      backgroundColor: "#2181CD",
      height: 75,
    },
});

export default HomeStack
