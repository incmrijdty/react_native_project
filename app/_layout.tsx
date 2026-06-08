import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { useEffect } from "react";

import { supabase } from "@/src/lib/supabase";
import { store } from "@/src/store/store";
import { AuthProvider } from "@/src/context/AuthContext";
import { AppDataProvider } from "@/src/context/AppDataProvider";

export default function RootLayout() {
  
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(event);
        console.log(session);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Provider store={store}>
      <AuthProvider>
        <AppDataProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            <Stack.Screen name="(auth)" options={{ headerShown: false }} />

            <Stack.Screen
              name="camera"
              options={{
                presentation: 'modal',
                headerShown: false
              }}
            />

            <Stack.Screen
              name="expense/[id]"
              options={{
                animation: 'slide_from_right',
                headerShown: false
              }}
            />

            <Stack.Screen
              name="expense/edit/[id]"
              options={{
                animation: "slide_from_right",
                headerShown: false
              }}
            />

          </Stack>
          <StatusBar style="auto" />
        </AppDataProvider>
      </AuthProvider>
    </Provider>
  );
}