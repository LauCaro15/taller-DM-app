import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function PhotoPicker({ onImageSelect }) {
    const [image, setImage] = useState(null);
    
    const cameraLaunch = async () => {
        
        let options = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        };

        let result = await ImagePicker.launchCameraAsync(options);

        if (!result.canceled) {
            const selectedImage = result.assets[0];
            console.log('Image: ', selectedImage);
            setImage(selectedImage);
            onImageSelect(selectedImage);
        }
    }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Take a photo" onPress={cameraLaunch} />
    </View>
  );
}


