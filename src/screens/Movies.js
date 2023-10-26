import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Image, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Surface } from '@react-native-material/core';
import gs from "../Styles";

export const ApiMoviesAxios = () => {
    const [movies, setMovies]= useState([]);

    useEffect(() => {
        axios
            .get("https://taller-dm-production.up.railway.app/api/v1/movies/cast")
            .then((response) =>{
                setMovies(response.data);
                //console.log(response.data);
            })
            .catch((error) =>  {
                console.error("Error al obtener los datos:", error);
            });
    }, []);

    return (
        <SafeAreaView>
            <FlatList
            data = {movies}
            columnWrapperStyle={{ flexWrap: 'wrap', flex: 1 , justifyContent: 'center'}}
            numColumns={25}
            style = {{ margin: 5 }}
            keyExtractor = {( item ) => item.name}
            renderItem = {({ item }) => (
                <Surface elevation={4}
                style={[gs.card]}>
                    <Text style={ [ gs.cardText , gs.cardTitle ] }>{ item.name } </Text>
                    <Image source = {{ uri: item.poster }} style = {{ width: 125 , height:200 }}/>
                </Surface>
            )}
            ></FlatList>
        </SafeAreaView>
    )
}

export default ApiMoviesAxios
