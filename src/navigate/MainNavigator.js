import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Products from "../screens/Products"
import Pokemons from "../screens/Pokemons"
import Home from "../screens/Home"
import Movies from "../screens/Movies"
import Posts from "../screens/Posts"


const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (

    <Tab.Navigator
        initalRouteName="Home"
    >
        <Tab.Screen
            name="Products"
            component={Products}
            options={{
                tabBarLabel: "Products",
                tabBarIcon: ({ color, size})=>(
                    <MaterialCommunityIcons name="purse" color={color} size={size}/>
                )
            }}
        />
        <Tab.Screen
            name="Pokemons"
            component={Pokemons}
            options={{
                tabBarLabel: "Pokemon",
                tabBarIcon: ({ color, size})=>(
                    <MaterialCommunityIcons name="pokemon-go" color={color} size={size}/>
                )
            }}
        />
        <Tab.Screen
            name="Home"
            component={Home}
            options={{
                tabBarLabel: "Inicio",
                tabBarIcon: ({ color, size})=>(
                    <MaterialCommunityIcons name="home" color={color} size={size}/>
                )
            }}
        /> 
        <Tab.Screen
            name="Movies"
            component={Movies}
            options={{
                tabBarLabel: "Movies",
                tabBarIcon: ({ color, size})=>(
                    <MaterialCommunityIcons name="film" color={color} size={size}/>
                )
            }}
        />
        <Tab.Screen
            name="Posts"
            component={Posts}
            options={{
                tabBarLabel: "Posts",
                tabBarIcon: ({ color, size})=>(
                    <MaterialCommunityIcons name="post" color={color} size={size}/>
                )
            }}
        />
    </Tab.Navigator>

  )
}

export default MainNavigator
