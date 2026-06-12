import { useState } from "react";
import { Alert, TouchableOpacity, TextInput, View, Text } from 'react-native';

import { signIn } from "@/src/services/auth";
import { ui } from "@/src/styles/uiStyles";

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin() {
        const { error } = await signIn(email, password);

        if (error) {
            Alert.alert(error.message);
        }
    }

    return (
        <View style={ui.screenCentered}>
            <View style={ui.container}>
                <Text style={ui.title}>Login</Text>

                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#777"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    style={ui.input}
                />

                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#777"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={ui.input}
                />

                <TouchableOpacity style={ui.buttonPrimary} onPress={handleLogin}>
                    <Text style={ui.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}