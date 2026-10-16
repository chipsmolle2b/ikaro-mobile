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
import { useAuth } from "@/lib/AuthContext";
import { theme } from "@/lib/theme";

export default function SignupScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    setError(null);

    if (password.length < 8) {
      setError("Le mot de passe doit faire au moins 8 caracteres.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.signup(email, password);
      await signIn(res.access_token);
      router.replace("/(tabs)/chat");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Inscription impossible. Reessaie.");
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
        <Text style={styles.title}>Creer un compte</Text>
        <Text style={styles.subtitle}>Acces illimite a toutes les personas IKARO.</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={theme.text}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe (8 caracteres min.)"
          placeholderTextColor={theme.text}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity style={styles.button} onPress={onSubmit} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Creation..." : "Creer mon compte"}</Text>
        </TouchableOpacity>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Deja un compte ? </Text>
          <Link href="/(auth)/login">
            <Text style={styles.link}>Connecte-toi</Text>
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
  button: { backgroundColor: theme.pri, borderRadius: 8, paddingVertical: 12, alignItems: "center", marginTop: 4 },
  buttonText: { color: theme.dark, fontWeight: "600" },
  footerRow: { flexDirection: "row", justifyContent: "center", marginTop: 8 },
  footerText: { color: theme.text, fontSize: 13 },
  link: { color: theme.pri, fontSize: 13, fontWeight: "600" },
});
