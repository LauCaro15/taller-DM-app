import React, { useEffect, useState } from 'react'
import Posts from '../components/Posts';
import { Dimensions, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const PostStacks = () => {
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
        initialRouteName="Posts"
        screenOptions={{
            headerStyle:
            orientation === "Portrait"
                ? styles.headerStylePortrait
                : styles.headerStyleLandscape,
                headerTintColor: "#fff",}}
    >
        <Stack.Screen
            name="Posts"
            component={Posts}
            options={{ title: "Posts" }} // Esto oculta el encabezado
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

export default PostStacks
