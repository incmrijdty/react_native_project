import { useState } from "react";
import { Alert, Button, TextInput, View } from 'react-native';

import { signUp } from "@/src/services/auth";

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
                title="Register"
                onPress={handleRegister}
            />
        </View>
    )

}