import { useState } from 'react';
import { Button, Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import getReceiptInfo from './mindee';

export default function ImagePickerButton() {
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }
    
    const result = await ImagePicker.launchCameraAsync({
      base64: true
    });
    
    if (!result.canceled) {
      getReceiptInfo(result.assets[0].base64!)
    }
  }

  return (
    <View style={styles.container}>
      <Button color='white' title="Scan Receipt" onPress={openCamera} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
