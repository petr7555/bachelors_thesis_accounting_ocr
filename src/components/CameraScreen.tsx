import {useTheme} from '@react-navigation/native';
import {Button, Text, View} from 'react-native';
import * as React from 'react';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

import vision from '@react-native-firebase/ml-vision';
import ImagePicker from 'react-native-image-crop-picker';

const processDocument = async (localPath: string) => {
  try {
    const processed = await vision().cloudDocumentTextRecognizerProcessImage(
      localPath,
    );

    console.log('Found text in document: ', processed.text);

    processed.blocks.forEach((block) => {
      console.log('Found block with text: ', block.text);
      console.log('Confidence in block: ', block.confidence);
      console.log('Languages found in block: ', block.recognizedLanguages);
    });
  } catch (e) {
    console.log(e);
  }
};

const requestCameraPermission = async () => {
  console.log('Asking for permissions...');
  const result = await request(PERMISSIONS.ANDROID.CAMERA);
  switch (result) {
    case RESULTS.UNAVAILABLE:
      console.log(
        'This feature is not available (on this device / in this context)',
      );
      break;
    case RESULTS.DENIED:
      console.log(
        'The permission has not been requested / is denied but requestable',
      );
      break;
    case RESULTS.GRANTED:
      console.log('The permission is granted');
      break;
    case RESULTS.BLOCKED:
      console.log('The permission is denied and not requestable anymore');
      break;
  }
};

const CameraScreen = () => {
  const {colors} = useTheme();

  const selectImage = async () => {
    await requestCameraPermission();

    ImagePicker.openCamera({
      cropping: true,
      freeStyleCropEnabled: true,
      hideBottomControls: true,
    }).then((image) => {
      console.log(image);
      processDocument(image.path);
    });
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: colors.text}}>Camera!</Text>
      <Button title="Select image" onPress={selectImage} />
    </View>
  );
};

export default CameraScreen;
