import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "ikaro_token";

export async function saveToken(token: string) {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch {
    // stockage indisponible — l'utilisateur devra se reconnecter plus souvent.
  }
}

export async function getToken(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export async function clearToken() {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch {
    // ignore
  }
}
