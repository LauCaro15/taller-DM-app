import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample({ onImageSelect }) {
  const [images, setImages] = useState([]);

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      /* allowsMultipleSelection: true, */ // Permite seleccionar múltiples imágenes
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      const selectedImages = result.assets;
      setImages(selectedImages);
      onImageSelect(selectedImages); // Llama a la función onImageSelect con las imágenes seleccionadas
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick images from camera roll" onPress={pickImages} />
    </View>
  );
}
