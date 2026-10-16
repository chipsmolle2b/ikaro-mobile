import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { api, ApiError, ChatMessage } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";
import { PERSONAS, PersonaId } from "@/lib/personas";
import { theme } from "@/lib/theme";

type Thread = Record<PersonaId, ChatMessage[]>;

const EMPTY_THREAD: Thread = {
  ara: [],
  iris: [],
  phoenix: [],
  itoko: [],
  lumiere: [],
  dedale: [],
};

export default function ChatScreen() {
  const { token, signOut } = useAuth();
  const [persona, setPersona] = useState<PersonaId>("ara");
  const [messages, setMessages] = useState<Thread>(EMPTY_THREAD);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<FlatList>(null);

  const current = PERSONAS.find((p) => p.id === persona)!;
  const thread = messages[persona];

  useEffect(() => {
    listRef.current?.scrollToEnd({ animated: true });
  }, [thread.length]);

  async function send() {
    const text = input.trim();
    if (!text || !token || sending) return;

    setError(null);
    const history = messages[persona];
    setMessages((m) => ({ ...m, [persona]: [...history, { role: "user", content: text }] }));
    setInput("");
    setSending(true);

    try {
      const res = await api.chat(token, persona, text, history);
      setMessages((m) => ({
        ...m,
        [persona]: [...m[persona], { role: "assistant", content: res.reply }],
      }));
    } catch (err) {
      if (err instanceof ApiError && err.status === 402) {
        setError("Ton acces n'est pas encore actif (abonnement requis).");
      } else if (err instanceof ApiError && err.status === 502) {
        setError("Cette persona n'est pas encore configuree cote serveur.");
      } else {
        setError(err instanceof ApiError ? err.message : "Erreur de connexion au serveur.");
      }
    } finally {
      setSending(false);
    }
  }

  async function logout() {
    await signOut();
    router.replace("/(auth)/login");
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.personaRow}
        contentContainerStyle={{ gap: 8, paddingHorizontal: 12 }}
      >
        {PERSONAS.map((p) => (
          <TouchableOpacity
            key={p.id}
            onPress={() => setPersona(p.id)}
            style={[
              styles.personaChip,
              p.id === persona && { borderColor: theme.borderB, backgroundColor: theme.priGhost },
            ]}
          >
            <Text style={{ color: p.id === persona ? theme.pri : theme.text, fontWeight: "600" }}>
              {p.name}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={logout} style={styles.logoutChip}>
          <Text style={{ color: theme.muted, fontSize: 12 }}>Deconnexion</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>{current.name}</Text>
        <Text style={styles.headerSubtitle}>{current.description}</Text>
      </View>

      <FlatList
        ref={listRef}
        data={thread}
        keyExtractor={(_, i) => String(i)}
        contentContainerStyle={{ padding: 16, gap: 10, flexGrow: 1 }}
        ListEmptyComponent={
          <Text style={styles.empty}>Dis bonjour a {current.name} pour commencer.</Text>
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.bubble,
              item.role === "user" ? styles.bubbleUser : styles.bubbleAssistant,
            ]}
          >
            <Text style={{ color: item.role === "user" ? theme.dark : theme.white }}>
              {item.content}
            </Text>
          </View>
        )}
      />

      {sending && <Text style={styles.thinking}>{current.name} reflechit...</Text>}
      {error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder={`Ecrire a ${current.name}...`}
          placeholderTextColor={theme.text}
          onSubmitEditing={send}
        />
        <TouchableOpacity style={styles.sendButton} onPress={send} disabled={sending || !input.trim()}>
          <Text style={styles.sendButtonText}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.bg },
  personaRow: { flexGrow: 0, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: theme.border },
  personaChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "transparent",
  },
  logoutChip: { paddingHorizontal: 12, paddingVertical: 8, justifyContent: "center" },
  header: { paddingHorizontal: 16, paddingVertical: 10 },
  headerTitle: { color: theme.pri, fontWeight: "700", fontSize: 16 },
  headerSubtitle: { color: theme.text, fontSize: 12, marginTop: 2 },
  empty: { color: theme.text, textAlign: "center", marginTop: 40 },
  bubble: { maxWidth: "80%", borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10 },
  bubbleUser: { alignSelf: "flex-end", backgroundColor: theme.priDim },
  bubbleAssistant: { alignSelf: "flex-start", backgroundColor: theme.barBg, borderWidth: 1, borderColor: theme.border },
  thinking: { color: theme.text, paddingHorizontal: 16, paddingBottom: 4, fontSize: 12 },
  error: { color: theme.muted, paddingHorizontal: 16, paddingBottom: 4, fontSize: 12 },
  inputRow: {
    flexDirection: "row",
    gap: 8,
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.border,
    backgroundColor: theme.dark,
    color: theme.white,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  sendButton: {
    backgroundColor: theme.pri,
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  sendButtonText: { color: theme.dark, fontWeight: "700" },
});
