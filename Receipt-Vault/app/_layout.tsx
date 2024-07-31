import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function RootLayout() {
  return (

    // Gesture Handler is used by Bottom Sheet
    // https://github.com/gorhom/react-native-bottom-sheet/issues/1389#issuecomment-1608857169
    // Wrap it around whatever area you think it should be limited to. 
    // i.e., if you can find the root folder this Rootlayout, you could make it appear above the bottom nav tabs
    // i.e., if you wrap it around the bottom views in receipts, then it should be limited to that area for snapping points
    <GestureHandlerRootView style={{ flex: 1 }}>
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
    </GestureHandlerRootView>
  );
}
