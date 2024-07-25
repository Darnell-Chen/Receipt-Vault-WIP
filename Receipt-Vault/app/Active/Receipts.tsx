import {Text, SafeAreaView, Button, FlatList, View, StyleSheet} from "react-native";
import { router } from "expo-router";
import colors from '@globals/colors';
import ImagePickerButton from "../../components/receipt_components/imagePicker";


function Receipts(){
    return (
        <>
        <View style={{backgroundColor: colors.color1, borderRadius: 30, display: 'flex', justifyContent: 'flex-end'}}>
            <SafeAreaView>
            <Text style={styles.title}>The Receipt Vault</Text>
            </SafeAreaView>
        </View>

        <View style={styles.centerConsole}>

            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <View style={styles.buttons}>
                    <Button color="white" title="Scan Receipt"/>
                </View>
                <View style={styles.buttons}>
                    {/* <Button color="white" title="Enter Manual Bill"/> */}
                    <ImagePickerButton/>
                </View>
            </View>

            <Text style={styles.topMessages}>
                You have saved: # receipts so far!
            </Text>

        </View>
        </>
    )
}

const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 15
    },
    topMessages: {
        fontSize: 15,
        fontWeight: 'bold',
        color: colors.color2,
        marginHorizontal: 10,
        marginTop: '5%'
    },
    buttons: {
        marginTop: 5,
        backgroundColor: colors.color2,
        width: '47%',
        marginHorizontal: '1%',
        borderRightWidth: 1,
        borderColor: 'white',
        borderRadius: 10
    },
    bottomView: {
        height: '50%',
    },
    topView: {
        height: '30%',
        backgroundColor: colors.color1
    },
    centerConsole: {
        backgroundColor: 'white',
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 15,
        shadowColor: 'darkgray',
        shadowOpacity: 0.5,
        shadowOffset: {width: 0, height: 5},
        elevation: 1
    }
})

export default Receipts;