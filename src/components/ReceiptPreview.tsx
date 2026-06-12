import { Alert, Image, TouchableOpacity, Text } from "react-native";
import { router } from "expo-router";

import { ui } from "../styles/uiStyles";

type Props = {
    image?: string | null;
    onRemove?: () => void;
    onPickImage?: () => void;
    returnTo: "/add" | "edit";
    expenseId?: string;
};

export default function ReceiptPreview({ image, onRemove, onPickImage, returnTo, expenseId } : Props) {
    return (
        <>
            {image && (
                <>
                    <Image source={{ uri: image }} style={ui.photo} />
                    <TouchableOpacity style={ui.buttonPrimary} onPress={() => {
                        Alert.alert(
                            "Receipt photo",
                            "What would you like to do?",
                            [
                                {
                                    text: "Keep",
                                    style: "cancel"
                                },
                                {
                                    text: "Add a different one",
                                    onPress: () => {
                                        Alert.alert(
                                            "Adding a receipt photo",
                                            "How would you like to add a photo?",
                                            [
                                                {
                                                    text: "Open Camera",
                                                    onPress: () => router.push({
                                                        pathname: "/camera",
                                                        params: {
                                                            returnTo, 
                                                            expenseId
                                                        }
                                                    })
                                                },
                                                {
                                                    text: "Pick from Galery",
                                                    onPress: onPickImage
                                                }
                                            ]
                                        )
                                    }
                                },
                                {
                                    text: "Remove",
                                    style: "destructive",
                                    onPress: onRemove
                                },
                            ]
                        );
                    }}>
                        <Text style={ui.buttonText}>Manage photo</Text>
                    </TouchableOpacity>
                </>
            )}

            {!image && (
                <TouchableOpacity style={ui.buttonPrimary} onPress={() => {
                    Alert.alert(
                        "Adding a receipt photo",
                        "How would you like to add a photo?",
                        [
                            {
                                text: "Open Camera",
                                onPress: () => router.push({
                                    pathname: "/camera",
                                    params: {
                                        returnTo,
                                        expenseId
                                    }
                                })
                            },
                            {
                                text: "Pick from Galery",
                                onPress: onPickImage
                            }
                        ]
                    )
                }}>
                    <Text style={ui.buttonText}>Add a receipt</Text>
                </TouchableOpacity>
            )}
        </>
    );
}