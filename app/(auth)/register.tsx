import { useState } from "react";
import { Alert, TouchableOpacity, TextInput, View, Text } from 'react-native';

import { signUp } from "@/src/services/auth";
import { ui } from "@/src/styles/uiStyles";

export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleRegister() {
        const { error } = await signUp(email, password);

        if (error) {
            Alert.alert(error.message);
        } else {
            Alert.alert("Account created");
        }
    }

    return (
        <View style={ui.screenCentered}>
            <View style={ui.container}>
                <Text style={ui.title}>Register</Text>

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

                <TouchableOpacity style={ui.buttonPrimary} onPress={handleRegister}>
                    <Text style={ui.buttonText}>Create account</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}