import { Text, SafeAreaView, Button, View, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import colors from "@globals/colors";

function Settings() {
    const logOut = () => {
        router.navigate("/");
    }

    return (
        <>
            <View style={styles.topView}>
                <SafeAreaView>
                    <Text style={styles.title}>Settings</Text>
                </SafeAreaView>
            </View>

            <TouchableOpacity style={styles.button} onPress={logOut}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 15,
    },
    buttonText: {
        paddingVertical: 10,
        fontSize: 20,
        textAlign: 'center',
        color: 'white'
    },
    button: {
        backgroundColor: colors.color1,
        borderRadius: 25,
        marginVertical: 20,
        marginHorizontal: 20,
    },
    topView: {
        backgroundColor: colors.color1,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingBottom: 10,
    },
});

export default Settings;
