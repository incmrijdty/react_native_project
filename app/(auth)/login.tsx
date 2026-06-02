import { useState } from "react";
import { Alert, Button, TextInput, View } from 'react-native';

import { signIn } from "@/src/services/auth";

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
        <View>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />

            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button
                title="Login"
                onPress={handleLogin}
            />
        </View>
    )
}