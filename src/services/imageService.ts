import * as ImagePicker from "expo-image-picker";

export async function pickImageFromGallery() {
    const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
        throw new Error("Permission denied");
    }

    const result =
        await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            quality: 0.7,
            allowsEditing: true,
        });

    if (result.canceled) return null;

    return result.assets[0].uri;
}