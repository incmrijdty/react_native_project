import { View, Button, Image, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera"
import { useRef, useState, useCallback } from "react";
import { useRouter, useFocusEffect } from "expo-router";

export default function CameraScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<any>(null);
    const [photo, setPhoto] = useState<string | null>(null);
    const router =  useRouter();

    useFocusEffect(
        useCallback(() => {
        setPhoto(null); 
        }, [])
    );

    if (!permission) return <View />

    if (!permission.granted) {
        return <Button title="Grant Permission" onPress={requestPermission} />
    }

    const takePhoto = async () => {
        if (!cameraRef.current) return;

        const result = await cameraRef.current.takePictureAsync();
        setPhoto(result.uri);
    };

    return (
        <View style={{ flex: 1 }}>
            {photo ? (
                <>
                    <Image source={{ uri: photo }} style={{ flex: 1 }} />
                    <View style={{ gap: 10, padding: 10 }}>
                        <Button title="Use this photo" onPress={() => {
                            router.push({
                                pathname: "/(tabs)/add",
                                params: { image: photo }
                            });
                        }} />
                        <Button 
                            title="Retake" 
                            onPress={() => {
                                Alert.alert("Retake photo?", "Current photo will be lost", [
                                    { text: "Cancel" },
                                    { text: "Retake", onPress: () => setPhoto(null) },
                                ]);
                            }} />
                    </View>
                </>
            ) : (
                <CameraView style={{ flex: 1 }} ref={cameraRef}>
                    <Button title="Take Photo" onPress={takePhoto} />
                </CameraView> 
            )}
        </View>
    )
}