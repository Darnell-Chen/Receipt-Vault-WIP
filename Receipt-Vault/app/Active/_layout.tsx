import { Tabs } from 'expo-router';


export default function ActiveLayout() {
    return (

        <Tabs initialRouteName="Dashboard" screenOptions={{headerShown: true, tabBarActiveTintColor: 'green', headerTintColor: 'green'}}>
            <Tabs.Screen
                options={{
                    headerShown: false,
                    title: 'Dashboard'
                }}
                name="Dashboard"
            />

            <Tabs.Screen
                name="Receipts"
                options={{
                    headerShown: false
                }}
            />

            <Tabs.Screen
                name="Settings"
                options={{
                    headerShown: false
                }}
            />
        </Tabs>
    );
};