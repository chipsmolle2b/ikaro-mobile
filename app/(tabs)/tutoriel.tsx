import { ScrollView, Text, View, StyleSheet, Linking, TouchableOpacity } from "react-native";
import { PERSONAS } from "@/lib/personas";
import { theme } from "@/lib/theme";

const STEPS = [
  {
    title: "1. Cree ton compte",
    body: "Depuis l'ecran de connexion, appuie sur \"Cree-en un\". Il te faut juste un email et un mot de passe (8 caracteres minimum).",
  },
  {
    title: "2. Choisis une persona",
    body: "En haut de l'onglet Chat, fais defiler les personas disponibles et appuie sur celle qui t'interesse.",
  },
  {
    title: "3. Discute en texte",
    body: "Ecris ton message en bas de l'ecran et appuie sur Envoyer. Chaque persona garde son propre fil de conversation.",
  },
  {
    title: "4. Change de persona librement",
    body: "Tu peux passer d'une persona a l'autre a tout moment, tu ne perds jamais l'historique.",
  },
];

export default function TutorielScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 20, gap: 24 }}>
      <View style={{ gap: 4 }}>
        <Text style={styles.title}>Comment utiliser IKARO</Text>
        <Text style={styles.subtitle}>Un guide rapide pour demarrer en quelques minutes.</Text>
      </View>

      <View style={{ gap: 12 }}>
        {STEPS.map((step) => (
          <View key={step.title} style={styles.card}>
            <Text style={styles.cardTitle}>{step.title}</Text>
            <Text style={styles.cardBody}>{step.body}</Text>
          </View>
        ))}
      </View>

      <View style={{ gap: 12 }}>
        <Text style={styles.sectionTitle}>Les personas</Text>
        {PERSONAS.map((p) => (
          <View key={p.id} style={styles.card}>
            <Text style={styles.cardTitle}>{p.name}</Text>
            <Text style={styles.tagline}>{p.tagline}</Text>
            <Text style={styles.cardBody}>{p.description}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.card, { borderColor: theme.borderB, backgroundColor: theme.priGhost }]}>
        <Text style={styles.cardBody}>
          Besoin d'aide ?{" "}
          <TouchableOpacity onPress={() => Linking.openURL("mailto:chipsmolle2b47@gmail.com")}>
            <Text style={{ color: theme.pri }}>chipsmolle2b47@gmail.com</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.bg },
  title: { color: theme.pri, fontSize: 22, fontWeight: "700" },
  subtitle: { color: theme.text, fontSize: 13 },
  sectionTitle: { color: theme.pri, fontSize: 18, fontWeight: "700" },
  card: {
    backgroundColor: theme.barBg,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 14,
    padding: 14,
    gap: 4,
  },
  cardTitle: { color: theme.pri, fontWeight: "700" },
  tagline: { color: theme.acc2, fontSize: 12 },
  cardBody: { color: theme.white, fontSize: 13, lineHeight: 18 },
});
