import { useState, useEffect } from "react";
import { Alert, Button, TextInput, View } from 'react-native';
import { router } from "expo-router";

import { signUp } from "@/src/services/auth";
import { useAuth } from "@/src/context/AuthContext";

export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, loading } = useAuth();

    async function handleRegister() {
        const { error } = await signUp(email, password);

        if (error) {
            Alert.alert(error.message);
        } else {
            Alert.alert("Account created");
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
                title="Register"
                onPress={handleRegister}
            />
        </View>
    )

}