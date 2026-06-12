import { useState } from "react";
import { Alert, TouchableOpacity, TextInput, View, Text, ActivityIndicator } from 'react-native';

import { signIn } from "@/src/services/auth";
import { AppTheme } from "@/constants/theme";
import { ui } from "@/src/styles/uiStyles";

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleLogin() {
        try {
            setLoading(true);

            const { error } = await signIn(email, password);

            if (error) {
                Alert.alert(error.message);
            }

        } catch {
            Alert.alert("Error", "Could not sign you in");
        } finally {
            setLoading(false);
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
                <TouchableOpacity style={ui.buttonPrimary} onPress={handleLogin} disabled={loading}>
                    {loading ? (
                        <>
                            <ActivityIndicator color={AppTheme.dark.text} />
                            <Text style={ui.buttonText}>Loading...</Text>
                        </>
                    ) : (
                        <Text style={ui.buttonText}>Login</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    )
}