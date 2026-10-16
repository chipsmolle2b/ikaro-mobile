import { Redirect } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useAuth } from "@/lib/AuthContext";
import { theme } from "@/lib/theme";

export default function Index() {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: theme.bg }}>
        <ActivityIndicator color={theme.pri} />
      </View>
    );
  }

  return <Redirect href={token ? "/(tabs)/chat" : "/(auth)/login"} />;
}
