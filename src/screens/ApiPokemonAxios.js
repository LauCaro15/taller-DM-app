import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export const ApiPokemonAxios = () => {
    const [pokemons, setPokemons]= useState([]);
    /* const [loading, setLoading]= useState(true); */

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
        {/* {loading ?(<ActivityIndicator size="large" color="#0000ff" />
        ) : ( */}
        <FlatList
        data = {pokemons}
        keyExtractor = {( item ) => item.nombre.toString()}
        renderItem = {({ item }) => (
            <View>
                <Image source = {{ uri: item.imagen }} style = {{ width: 100 , height:100 }}></Image>
                <Text>{ item.nombre }</Text>
            </View>
        )}
        ></FlatList>
        {/* )} */}
    </SafeAreaView>
  )
}

export default ApiPokemonAxios
