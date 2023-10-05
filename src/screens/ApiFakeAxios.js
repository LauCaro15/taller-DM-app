import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Surface } from '@react-native-material/core';
import gs from "../Styles";

export const ApiFakeAxios = () => {
    const [products, setProducts]= useState([]);
    /* const [loading, setLoading]= useState(true); */

    useEffect(() => {
        axios
            .get("https://fakestoreapi.com/products/")
            .then((response) =>{
                setProducts(response.data);
                //console.log(response.data);
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
            data = {products}
            columnWrapperStyle={{ flexWrap: 'wrap', flex: 1 , justifyContent: 'center'}}
            numColumns={25}
            style = {{ margin: 5 }}
            keyExtractor = {( item ) => item.id.toString()}
            renderItem = {({ item }) => (
                <Surface elevation={4}
                style={ [gs.card ]}>
                    <Text style={ [ gs.cardText , gs.cardTitle ] }>{ item.title }</Text>
                    <Image source = {{ uri: item.image }} style = {{ width: 125 , height:150 }}></Image>
                    <Text style={ [ gs.cardText ] }>{ item.price.toString() }</Text>
                    <Text style={ [ gs.cardText ] }>{ item.category }</Text>
                </Surface>
            )}
            ></FlatList>
            {/* )} */}
        </SafeAreaView>
    )
}

export default ApiFakeAxios
