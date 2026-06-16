import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";

import { useAuth } from "./AuthContext";
import { useAppDispatch } from "../store/hooks";
import { setExpenses } from "../features/expenses/expenseSlice";
import { loadExpenses, clearGuestExpenses } from "../services/asyncStorage";
import { fetchExpenses } from "../services/expenseApi";
import { syncGuestExpensesToCloud } from "../services/syncExpenses";

export function AppDataProvider({
    children,
} : {
    children: React.ReactNode;
}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    const dispatch = useAppDispatch();

    useEffect(() => {
        async function loadData() {
            try {

                setLoading(true);
                setError(null);

                if (!user) {
                    const localExpenses = await loadExpenses();

                    dispatch(setExpenses(localExpenses));

                    return;
                }

                const guestExpenses = await loadExpenses();

                if (guestExpenses.length > 0) {
                    await syncGuestExpensesToCloud(
                        guestExpenses,
                        user.id
                    );

                    await clearGuestExpenses();
                }

                const { data } = await fetchExpenses(user.id);

                dispatch(setExpenses(data ?? []));
            } catch (error) {
                console.error(error);
                setError("Failed to load expenses")
            } finally {
                setLoading(false)
            }
        }

        loadData();
    }, [user, dispatch]);

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" />
                <Text>Loading expenses...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>{error}</Text>
            </View>
        );
    }

    return <>{children}</>;
}