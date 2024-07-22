import { Tabs } from 'expo-router';


export default function ActiveLayout() {
    return (

        <Tabs initialRouteName="dashboard" screenOptions={{headerShown: true, tabBarActiveTintColor: 'green', headerTintColor: 'green'}}>
            <Tabs.Screen
                options={{
                    headerShown: false,
                    title: 'Dashboard'
                }}
                name="dashboard"
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