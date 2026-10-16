# IKARO — Appli mobile (Android & iOS)

Meme principe que l'appli web, mais en React Native/Expo : connexion,
inscription, chat texte avec les personas, et un onglet Tutoriel — un seul
code pour Android et iOS.

Elle appelle le meme backend FastAPI (`ikaro-backend`) que l'appli web —
aucune cle API dans ce projet.

## Tester en local (le plus simple : avec ton telephone)

1. Installe l'app **Expo Go** sur ton telephone (App Store ou Play Store).
2. Sur ton ordinateur, dans ce dossier :

   ```powershell
   npm install
   copy .env.example .env
   notepad .env
   ```

   Remplace `EXPO_PUBLIC_API_URL` par l'URL de ton backend (celle de Railway,
   ou `https://api.chipsmolle2bprod.fr` une fois le DNS pret). Enregistre.

3. Lance le serveur de developpement :

   ```powershell
   npm run start
   ```

4. Un QR code s'affiche dans le terminal. Scanne-le avec l'appareil photo de
   ton telephone (iPhone) ou directement dans l'app Expo Go (Android) — ton
   telephone et ton ordinateur doivent etre sur le meme reseau Wi-Fi.

L'appli s'ouvre alors dans Expo Go, exactement comme une vraie app installee.

## Structure

- `app/(auth)/login.tsx`, `app/(auth)/signup.tsx` — authentification
- `app/(tabs)/chat.tsx` — chat texte, personas en haut, historique separe par persona
- `app/(tabs)/tutoriel.tsx` — guide d'utilisation
- `lib/api.ts` — appels au backend (identique a la version web)
- `lib/auth.ts` — stockage du jeton (AsyncStorage, l'equivalent mobile du localStorage)
- `lib/personas.ts` — a garder synchronise avec le backend et l'appli web

## Publier sur l'App Store / Play Store (etape future)

Ca se fait avec les outils Expo (EAS Build/Submit), une fois que l'appli est
stable et testee. Grandes lignes (on detaillera le moment venu) :

1. Creer un compte developpeur Apple (99$/an) et un compte Google Play
   (25$ une fois).
2. `npx eas-cli build --platform android` / `--platform ios` — Expo compile
   l'app dans le cloud, pas besoin de Mac ni d'Android Studio.
3. `npx eas-cli submit` — envoie le fichier compile directement sur les stores.

On n'a pas besoin de s'en occuper tout de suite — d'abord on valide que
l'appli fonctionne bien via Expo Go.
