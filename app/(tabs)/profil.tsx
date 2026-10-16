import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { api, ApiError, MeResponse } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";
import { theme } from "@/lib/theme";

export default function ProfilScreen() {
  const { token, signOut } = useAuth();
  const [me, setMe] = useState<MeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    api
      .me(token)
      .then(setMe)
      .catch((err) =>
        setError(err instanceof ApiError ? err.message : "Impossible de charger le profil.")
      )
      .finally(() => setLoading(false));
  }, [token]);

  async function logout() {
    await signOut();
    router.replace("/(auth)/login");
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={theme.pri} />
      </View>
    );
  }

  const statusLabel = me?.is_owner
    ? "Compte proprietaire — acces illimite"
    : me?.subscription_active
    ? "Abonnement actif"
    : "Aucun abonnement actif";

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{me?.email ?? "—"}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Statut</Text>
        <Text style={[styles.value, { color: me?.has_access ? theme.green : theme.muted }]}>
          {statusLabel}
        </Text>
        {!me?.has_access && (
          <Text style={styles.hint}>Active un abonnement pour discuter avec les personas.</Text>
        )}
      </View>

      {error && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Se deconnecter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.bg, padding: 20, gap: 14 },
  center: { flex: 1, backgroundColor: theme.bg, alignItems: "center", justifyContent: "center" },
  card: {
    backgroundColor: theme.barBg,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 14,
    padding: 16,
    gap: 4,
  },
  label: { color: theme.text, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 },
  value: { color: theme.white, fontSize: 16, fontWeight: "600" },
  hint: { color: theme.text, fontSize: 12, marginTop: 4 },
  error: { color: theme.muted, fontSize: 13 },
  button: {
    backgroundColor: theme.pri,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: { color: theme.dark, fontWeight: "700" },
});
