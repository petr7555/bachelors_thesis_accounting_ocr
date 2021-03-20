import vision from '@react-native-firebase/ml';

export const getTextFromImage = async (localPath: string) => {
  try {
    const processed = await vision().cloudDocumentTextRecognizerProcessImage(
      localPath,
    );

    console.log(`Found text in document:\n${processed.text}`);

    processed.blocks.forEach((block) => {
      console.log(`Found block with text:\n${block.text}`);
      console.log('Bounding box: ', block.boundingBox);
      console.log('Confidence in block: ', block.confidence);
      console.log('Languages found in block: ', block.recognizedLanguages);
    });

    return processed;
  } catch (error) {
    console.error(error);
  }
};
