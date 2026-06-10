import { StyleSheet } from "react-native";
import { AppTheme, Spacing } from "../../constants/theme";

export const ui = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppTheme.dark.background,
    padding: 20,
    justifyContent: "flex-start",
  },

  screenCentered: {
    flex: 1,
    backgroundColor: AppTheme.dark.background,
    padding: 20,
    justifyContent: "center",
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 50,
  },

  container: {
    width: "100%",
    maxWidth: 420,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: AppTheme.dark.text,
    marginBottom: 24,
    letterSpacing: 0.5,
    marginTop: 24
  },

  subtitle: {
    fontSize: 16,
    color: AppTheme.dark.textMuted,
    marginBottom: 12
  },

  card: {
    backgroundColor: AppTheme.dark.card,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: AppTheme.dark.border,
  },

  input: {
    backgroundColor: AppTheme.dark.card,
    color: AppTheme.dark.text,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: AppTheme.dark.border,
    marginBottom: 12,
  },

  buttonPrimary: {
    backgroundColor: AppTheme.dark.primary,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#0B0F0D",
    fontWeight: "700",
    fontSize: 16,
  },

  linkText: {
    color: AppTheme.dark.primary,
    marginTop: 16,
    textAlign: "center",
  },

  dangerText: {
    color: AppTheme.dark.danger,
  },
});