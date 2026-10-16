import { Redirect, Tabs } from "expo-router";
import { useAuth } from "@/lib/AuthContext";
import { theme } from "@/lib/theme";
import { Text } from "react-native";

export default function TabsLayout() {
  const { token, loading } = useAuth();

  if (loading) return null;
  if (!token) return <Redirect href="/(auth)/login" />;

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: theme.dark },
        headerTitleStyle: { color: theme.pri },
        headerTintColor: theme.pri,
        tabBarStyle: { backgroundColor: theme.dark, borderTopColor: theme.border },
        tabBarActiveTintColor: theme.pri,
        tabBarInactiveTintColor: theme.text,
      }}
    >
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerTitle: "IKARO",
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 16 }}>💬</Text>,
        }}
      />
      <Tabs.Screen
        name="tutoriel"
        options={{
          title: "Tutoriel",
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 16 }}>❓</Text>,
        }}
      />
    </Tabs>
  );
}
