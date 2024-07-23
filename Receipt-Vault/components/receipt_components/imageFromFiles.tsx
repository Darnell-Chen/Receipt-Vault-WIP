// THIS FILE IS NOT IN USE.

// NOTE: IF YOU WANT TO IMPLEMENT GETTING IMAGE FROM FILE
// REPLACE THE CURRENT SCAN RECEIPT BUTTON W/ THIS, OR INTEGRATE THIS INTO IMAGEPICKER
import * as ImagePicker from 'expo-image-picker';

const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    base64: true,
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: false,
    quality: 1,
  });

  if (!result.canceled) {
    // getReceiptInfo(result.assets[0].base64!)
  }
};

  export default pickImage;