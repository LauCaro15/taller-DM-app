import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function PhotoPicker({ onPhotoSelect }) {

    const cameraLaunch = () => {
        let options = {
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
        };
        
        ImagePicker.launchCameraAsync(options, (res) => {
        console.log('Response = ', res);

        if (res.didCancel) {
            console.log('User cancelled image picker');
        } else if (res.error) {
            console.log('ImagePicker Error: ', res.error);
        } else if (res.customButton) {
            console.log('User tapped custom button: ', res.customButton);
            alert(res.customButton);
        } else {
            const source = { uri: res.uri };
            console.log('response', JSON.stringify(res));
            this.setState({
            filePath: res,
            fileData: res.data,
            fileUri: res.uri
            });
        }
        });
    }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Take a photo" onPress={cameraLaunch} />
    </View>
  );
}


