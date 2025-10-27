import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="screens/onboardingScreen" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="screens/homeScreen" 
        options={{ 
          title: "Home",
          headerShown: true 
        }} 
      />
    </Stack>
  );
}
