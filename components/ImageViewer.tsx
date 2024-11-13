import { StyleSheet } from "react-native";
import { Image, type ImageSource } from "expo-image";

type Props = {
  imgSource: ImageSource;
  image?: string;
};

export default function ImageViewer({ imgSource, image }: Props) {
  const selectedImage = image ? { uri: image } : imgSource;
  return <Image source={selectedImage} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
