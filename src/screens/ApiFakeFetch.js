import React from 'react'
import { Text, View } from 'react-native';

const ApiFake = async() => {

    try {
        const response = await fetch('https://fakestoreapi.com/products/',{
            method: 'GET'
        });
        const jsonData = await response.json();
        console.log(typeof(JSON.stringify(jsonData)));
        console.log(JSON.stringify(jsonData));

    } catch (error) {
        console.error('Error al obtener datos:', error);
    }

    return (
        <View>
            <Text>Contenido de la API:</Text>
        </View>
    );
}

export default ApiFake
