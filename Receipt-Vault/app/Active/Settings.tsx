import {Text, SafeAreaView, Button} from "react-native";
import { router } from "expo-router";


function Settings(){
    return (
        <SafeAreaView>
            <Text>Settings</Text>
            <Button title="Logout"/>
        </SafeAreaView>
    )
}

export default Settings;