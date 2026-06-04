import { useEffect } from "react";

import { useAuth } from "./AuthContext";
import { useAppDispatch } from "../store/hooks";
import { setExpenses } from "../features/expenses/expenseSlice";
import { loadExpenses, clearGuestExpenses } from "../services/storage";
import { fetchExpenses } from "../services/expenseApi";
import { syncGuestExpensesToCloud } from "../services/syncExpenses";

export function AppDataProvider({
    children,
} : {
    children: React.ReactNode;
}) {
    const { user } = useAuth();

    const dispatch = useAppDispatch();

    useEffect(() => {
        async function loadData() {
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
        }

        loadData();
    }, [user]);

    return <>{children}</>;
}