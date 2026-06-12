import { View, Button, Image, Alert, Text, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera"
import { useRef, useState, useCallback } from "react";
import { useRouter, useFocusEffect, useLocalSearchParams } from "expo-router";

import { ui } from "@/src/styles/uiStyles";

export default function CameraScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<any>(null);
    const [photo, setPhoto] = useState<string | null>(null);
    const router =  useRouter();
    const params = useLocalSearchParams<{ returnTo?: string; expenseId?: string }>();

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
        <View style={ui.cameraContainer}>
            {photo ? (
                <>
                    <Image source={{ uri: photo }} style={ui.cameraContainer} />
                    <View style={ui.cameraActions}>
                        <TouchableOpacity style={ui.cameraButton} onPress={() => {
                            if (!params.expenseId) {
                                return;
                            }
                            
                            if (params.returnTo === "edit") {
                                router.push({
                                    pathname: "/expense/edit/[id]",
                                    params: {
                                        id: params.expenseId,
                                        image: photo,
                                    },
                                });

                                return;
                            }
                            else {
                                router.push({
                                    pathname: "/add",
                                    params: {
                                        image: photo,
                                    },
                                });
                            } 
                        }}>
                            <Text style={ui.buttonText}>Use this photo</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={ui.cameraButton} onPress={() => {
                            Alert.alert("Retake photo?", "Current photo will be lost", [
                                { text: "Cancel" },
                                { text: "Retake", onPress: () => setPhoto(null) },
                            ]);
                        }}>
                            <Text style={ui.buttonText}>Retake</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                    <View style={ui.cameraContainer}>
                        <CameraView
                            style={ui.camera}
                            ref={cameraRef}
                        />

                        <View style={ui.cameraButtonContainer}>
                            <TouchableOpacity
                                style={ui.cameraButton}
                                onPress={takePhoto}
                            >
                                <Text style={ui.buttonText}>
                                    Take Photo
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            )}
        </View>
    )
}