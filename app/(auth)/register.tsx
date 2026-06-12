import { useState } from "react";
import { Alert, TouchableOpacity, TextInput, View, Text, ActivityIndicator } from 'react-native';

import { signUp } from "@/src/services/auth";
import { ui } from "@/src/styles/uiStyles";
import { AppTheme } from "@/constants/theme";

export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleRegister() {
        try {
            setLoading(true);

            const { error } = await signUp(email, password);

            if (error) {
                Alert.alert(error.message);
            } else {
                Alert.alert("Account created");
            }

        } catch {
            Alert.alert("Error", "Could not sign you up");
        } finally {
            setLoading(false);
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

                <TouchableOpacity style={ui.buttonPrimary} onPress={handleRegister} disabled={loading}>
                    {loading ? (
                        <>
                            <ActivityIndicator color={AppTheme.dark.text} />
                            <Text style={ui.buttonText}>Loading...</Text>
                        </>
                    ) : (
                        <Text style={ui.buttonText}>Create Account</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    )

}