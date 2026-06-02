import { useState, useEffect } from "react";
import { Alert, Button, TextInput, View } from 'react-native';
import { router } from "expo-router";

import { signIn } from "@/src/services/auth";
import { useAuth } from "@/src/context/AuthContext";

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, loading } = useAuth();

    async function handleLogin() {
        const { error } = await signIn(email, password);

        if (error) {
            Alert.alert(error.message);
        }
    }

    useEffect(() => {
        if (!loading && user) {
            router.replace("/account");
        }
    }, [user, loading]);

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                style={{ borderWidth: 1, marginBottom: 12 }}
            />

            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ borderWidth: 1, marginBottom: 12 }}
            />

            <Button
                title="Login"
                onPress={handleLogin}
            />
        </View>
    )
}