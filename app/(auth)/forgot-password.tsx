import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { Link, router } from "expo-router";
import { api, ApiError } from "@/lib/api";
import { theme } from "@/lib/theme";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    setError(null);
    setLoading(true);
    try {
      await api.forgotPassword(email.trim());
      setSent(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Impossible d'envoyer le code. Reessaie.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Mot de passe oublie</Text>
        <Text style={styles.subtitle}>
          Indique ton email, on t&apos;envoie un code a 6 chiffres pour reinitialiser ton mot de
          passe.
        </Text>

        {!sent ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={theme.text}
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            {error && <Text style={styles.error}>{error}</Text>}
            <TouchableOpacity
              style={styles.button}
              onPress={onSubmit}
              disabled={loading || !email.trim()}
            >
              <Text style={styles.buttonText}>{loading ? "Envoi..." : "Envoyer le code"}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.success}>
              Si ce compte existe, un code vient d&apos;etre envoye a {email.trim()}.
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                router.push({ pathname: "/(auth)/reset-password", params: { email: email.trim() } })
              }
            >
              <Text style={styles.buttonText}>J&apos;ai mon code</Text>
            </TouchableOpacity>
          </>
        )}

        <View style={styles.footerRow}>
          <Link href="/(auth)/login">
            <Text style={styles.link}>Retour a la connexion</Text>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.bg, alignItems: "center", justifyContent: "center", padding: 20 },
  card: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.barBg,
    borderColor: theme.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 24,
    gap: 12,
  },
  title: { color: theme.pri, fontSize: 24, fontWeight: "600", textAlign: "center" },
  subtitle: { color: theme.text, fontSize: 13, textAlign: "center", marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: theme.border,
    backgroundColor: theme.dark,
    color: theme.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  error: { color: theme.muted, fontSize: 13 },
  success: { color: theme.green, fontSize: 13, textAlign: "center" },
  button: { backgroundColor: theme.pri, borderRadius: 8, paddingVertical: 12, alignItems: "center", marginTop: 4 },
  buttonText: { color: theme.dark, fontWeight: "600" },
  footerRow: { flexDirection: "row", justifyContent: "center", marginTop: 8 },
  link: { color: theme.pri, fontSize: 13, fontWeight: "600" },
});
