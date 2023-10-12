import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Image, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Surface } from '@react-native-material/core';
import gs from "../Styles";

export const ApiPokemonAxios = () => {
    const [pokemons, setPokemons]= useState([]);

    useEffect(() => {
        axios
            .get("https://taller-dm-production.up.railway.app/api/v1/pokemons/list-pokemons")
            .then((response) =>{
                setPokemons(response.data);
                console.log(response.data);
            })
            .catch((error) =>  {
                console.error("Error al obtener los datos:", error);
            });
    }, []);

    return (
        <SafeAreaView>
            <FlatList
            data = {pokemons}
            columnWrapperStyle={{ flexWrap: 'wrap', flex: 1 , justifyContent: 'center'}}
            numColumns={25}
            style = {{ margin: 5 }}
            keyExtractor = {( item ) => item.nombre.toString()}
            renderItem = {({ item }) => (
                <Surface elevation={4}
                style={ [gs.card ]}>
                    <Image source = {{ uri: item.imagen }} style = {{ width: 100 , height:100 }}></Image>
                    <Text style={[ gs.cardText , gs.cardTitle ]}>{ item.nombre }</Text>
                </Surface>
            )}
            ></FlatList>
        </SafeAreaView>
    )
}

export default ApiPokemonAxios
