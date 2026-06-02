import { View, Text, Button } from "react-native";
import { router } from "expo-router";

import { useAuth } from "@/src/context/AuthContext";
import { signOut } from "@/src/services/auth";

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
    <View
      style={{
        flex: 1,
        padding: 16,
        gap: 12,
      }}
    >
      {!user ? (
        <>
          <Text>You are not logged in.</Text>

          <Button
            title="Login"
            onPress={() => router.push("/(auth)/login")}
          />

          <Button
            title="Register"
            onPress={() => router.push("/(auth)/register")}
          />
        </>
      ) : (
        <>
          <Text>Logged in as:</Text>

          <Text>{user.email}</Text>

          <Text>Status: Connected to cloud sync</Text>

          <Button
            title="Logout"
            onPress={handleLogout}
          />
        </>
      )}
    </View>
  );
}