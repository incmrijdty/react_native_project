import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

import { useAuth } from "@/src/context/AuthContext";
import { signOut } from "@/src/services/auth";
import { ui } from "@/src/styles/uiStyles";
import { AppTheme } from "@/constants/theme";

export default function AccountScreen() {
  const { user, loading } = useAuth();
  const [loadingState, setLoadingState] = useState(false); 

  async function handleLogout() {
    try {
      setLoadingState(true);

      const { error } = await signOut();

      if (error) {
        Alert.alert(error.message);
      }

    } catch {
      Alert.alert("Error", "Could not sign you in");
    } finally {
      setLoadingState(false);
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
        {!user ? (
          <>
            <Text style={ui.title}>Account</Text>
            <Text style={ui.subtitle}>You are not logged in.</Text>

            <TouchableOpacity style={ui.buttonPrimary} onPress={() => router.push("/login")}>
              <Text style={ui.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={ui.buttonPrimary} onPress={() => router.push("/register")}>
              <Text style={ui.buttonText}>Register</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={ui.title}>Account</Text>
            <Text style={ui.subtitle}>Logged in as:</Text>

            <Text style={ui.subtitle}>{user.email}</Text>

            <Text style={ui.subtitle}>Status: Connected to cloud sync</Text>
            <TouchableOpacity style={ui.buttonPrimary} onPress={handleLogout} disabled={loadingState}>
              {loadingState ? (
                <>
                  <ActivityIndicator color={AppTheme.dark.text} />
                  <Text style={ui.buttonText}>Loading...</Text>
                </>
              ) : (
                <Text style={ui.buttonText}>Logout</Text>
              )}
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}