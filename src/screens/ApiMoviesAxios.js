import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Image, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export const ApiMoviesAxios = () => {
    const [movies, setMovies]= useState([]);

    useEffect(() => {
        axios
            .get("https://taller-dm-production.up.railway.app/api/v1/movies/cast")
            .then((response) =>{
                setMovies(response.data);
                console.log(response.data);
            })
            .catch((error) =>  {
                console.error("Error al obtener los datos:", error);
            });
    }, []);

    return (
        <SafeAreaView>
            <FlatList
            data = {movies}
            keyExtractor = {( item ) => item.name}
            renderItem = {({ item }) => (
                <View>
                    <Image source = {{ uri: item.poster }} style = {{ width: 125 , height:200 }}></Image>
                    <Text>{ item.name }</Text>
                </View>
            )}
            ></FlatList>
        </SafeAreaView>
    )
}

export default ApiMoviesAxios
