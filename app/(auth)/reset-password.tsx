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
import { Link, router, useLocalSearchParams } from "expo-router";
import { api, ApiError } from "@/lib/api";
import { theme } from "@/lib/theme";

export default function ResetPasswordScreen() {
  const params = useLocalSearchParams<{ email?: string }>();
  const [email, setEmail] = useState(params.email ?? "");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit() {
    setError(null);
    if (password.length < 8) {
      setError("Le mot de passe doit faire au moins 8 caracteres.");
      return;
    }
    if (password !== confirm) {
      setError("Les deux mots de passe ne correspondent pas.");
      return;
    }
    setLoading(true);
    try {
      await api.resetPassword(email.trim(), code.trim(), password);
      setDone(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Code invalide ou expire.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <View style={styles.screen}>
        <View style={styles.card}>
          <Text style={styles.title}>C&apos;est fait !</Text>
          <Text style={styles.subtitle}>Ton mot de passe a ete mis a jour.</Text>
          <TouchableOpacity style={styles.button} onPress={() => router.replace("/(auth)/login")}>
            <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Nouveau mot de passe</Text>
        <Text style={styles.subtitle}>
          Entre le code recu par email et choisis un nouveau mot de passe.
        </Text>

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
          placeholder="Code a 6 chiffres"
          placeholderTextColor={theme.text}
          keyboardType="number-pad"
          maxLength={6}
          value={code}
          onChangeText={setCode}
        />
        <TextInput
          style={styles.input}
          placeholder="Nouveau mot de passe"
          placeholderTextColor={theme.text}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirme le mot de passe"
          placeholderTextColor={theme.text}
          secureTextEntry
          value={confirm}
          onChangeText={setConfirm}
        />

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity style={styles.button} onPress={onSubmit} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "..." : "Reinitialiser"}</Text>
        </TouchableOpacity>

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
  button: { backgroundColor: theme.pri, borderRadius: 8, paddingVertical: 12, alignItems: "center", marginTop: 4 },
  buttonText: { color: theme.dark, fontWeight: "600" },
  footerRow: { flexDirection: "row", justifyContent: "center", marginTop: 8 },
  link: { color: theme.pri, fontSize: 13, fontWeight: "600" },
});
