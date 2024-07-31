import { Tabs } from 'expo-router';
import { SharedProvider } from '@components/active_components/sharedContext';



export default function ActiveLayout() {
    return (
        <SharedProvider>
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
        </SharedProvider>
    );
};