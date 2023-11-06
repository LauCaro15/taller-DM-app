import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from "@react-native-material/core"

export default function PhotoPicker({ onImageSelect }) {
    const [image, setImage] = useState(null);

    const cameraLaunch = async () => {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        const selectedImage = result;
        setImage(selectedImage);
        onImageSelect([selectedImage]); // Envía una matriz con la imagen seleccionada
      }
    };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Take a photo" onPress={cameraLaunch} style={{color: "#841584"}}/>
    </View>
  );
}
