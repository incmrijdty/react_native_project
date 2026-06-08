import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { useAuth } from "@/src/context/AuthContext";
import { signOut } from "@/src/services/auth";
import { ui } from "@/src/styles/uiStyles";

export default function AccountScreen() {
  const { user, loading } = useAuth();

  async function handleLogout() {
    const { error } = await signOut();

    if (error) {
      console.log(error.message);
    }
  }

  if (loading) {
    return (
      <View style={{ flex: 1, padding: 16 }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={ui.screen}>
      <View style={ui.container}>
        <Text style={ui.title}>Account</Text>
        {!user ? (
          <>
            <Text style={ui.title}>Account</Text>
            <Text style={ui.subtitle}>You are not logged in.</Text>

            <TouchableOpacity style={ui.buttonPrimary} onPress={() => router.push("/(auth)/login")}>
              <Text style={ui.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={ui.buttonPrimary} onPress={() => router.push("/(auth)/register")}>
              <Text style={ui.buttonText}>Register</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={ui.subtitle}>Logged in as:</Text>

            <Text style={ui.subtitle}>{user.email}</Text>

            <Text style={ui.subtitle}>Status: Connected to cloud sync</Text>

            <TouchableOpacity style={ui.buttonPrimary} onPress={handleLogout}>
              <Text style={ui.buttonText}>Logout</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}