import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTransparent: false,
        headerTintColor: 'green',
      }}>

      <Stack.Screen name="index" options={{
        headerShown: false,
      }}/>

      <Stack.Screen name="InitialPage/registration" options={{
        headerTitle: 'Registration'
      }}/>

      <Stack.Screen name="Active" options={{
        headerShown: false
      }}/>
      
    </Stack>
  );
}
