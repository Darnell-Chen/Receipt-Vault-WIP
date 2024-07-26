import {Text, SafeAreaView, Button} from "react-native";
import { router } from "expo-router";


function Settings(){
    const logOut = () => {
        router.navigate("/");
    }

    return (
        <SafeAreaView>
            <Text>Settings</Text>
            <Button onPress={logOut} title="Logout"/>
        </SafeAreaView>
    )
}

export default Settings;