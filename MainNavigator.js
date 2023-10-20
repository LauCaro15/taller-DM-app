import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import HomeStack from './src/stack/HomeStack';
import ProductStack from './src/stack/ProductStack';
import PokemonStack from './src/stack/PokemonStack';
import MovieStack from './src/stack/MovieStack';
import PostStacks from './src/stack/PostStacks';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator
        initalRouteName='FirstScreen'
    >
        <Tab.Screen
            name="Products"
            component={ProductStack}
            options={{
                tabBarLabel: "Products",
                tabBarIcon: ({ color, size})=>(
                    <MaterialCommunityIcons name="purse" color={color} size={size}/>
                )
            }}
        />
        <Tab.Screen
            name="Pokemon"
            component={PokemonStack}
            options={{
                tabBarLabel: "Pokemon",
                tabBarIcon: ({ color, size})=>(
                    <MaterialCommunityIcons name="pokemon-go" color={color} size={size}/>
                )
            }}
        />
        <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
                tabBarLabel: "Inicio",
                tabBarIcon: ({ color, size})=>(
                    <MaterialCommunityIcons name="home" color={color} size={size}/>
                )
            }}
        />
        <Tab.Screen
            name="Movies"
            component={MovieStack}
            options={{
                tabBarLabel: "Movies",
                tabBarIcon: ({ color, size})=>(
                    <MaterialCommunityIcons name="film" color={color} size={size}/>
                )
            }}
        />
        <Tab.Screen
            name="PostStacks"
            component={PostStacks}
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
