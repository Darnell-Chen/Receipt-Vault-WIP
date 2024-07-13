import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        headerTintColor: 'green',
      }}>

        <Stack.Screen name="index" options={{
          headerShown: false,
        }}/>

      <Stack.Screen name="InitialPage/registration" options={{
        headerTitle: 'Registration'
      }}/>
      
    </Stack>
  );
}
