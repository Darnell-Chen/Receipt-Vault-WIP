import {Stack} from 'expo-router';

export default function DashboardLayout() {
    return(
        <Stack initialRouteName='Dashboard' screenOptions={{
            headerTintColor: 'white',
            headerTransparent: true,
            headerShown: false,
        }}>
             <Stack.Screen name="Dashboard"/>
        </Stack>
    )
}