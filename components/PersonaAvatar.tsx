import { View, Text, StyleSheet } from "react-native";
import { Persona } from "@/lib/personas";

/**
 * Avatar 100% genere en code (pas d'image externe a gerer) : un cercle de la
 * couleur d'accent de la persona avec son initiale. Reste leger et coherent
 * avec le style neon/hologramme deja utilise dans l'app.
 */
export function PersonaAvatar({
  persona,
  size = 36,
  active = false,
}: {
  persona: Persona;
  size?: number;
  active?: boolean;
}) {
  const initial = persona.name.trim().charAt(0).toUpperCase();

  return (
    <View
      style={[
        styles.circle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: active ? persona.color : `${persona.color}26`,
          borderColor: persona.color,
        },
      ]}
    >
      <Text
        style={[
          styles.letter,
          { color: active ? "#00060a" : persona.color, fontSize: size * 0.42 },
        ]}
      >
        {initial}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
  },
  letter: {
    fontWeight: "700",
  },
});
