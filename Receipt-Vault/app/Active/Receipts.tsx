import {Text, SafeAreaView, Button, FlatList, View, StyleSheet, Keyboard, TouchableWithoutFeedback} from "react-native";
import colors from '@globals/colors';
import ImagePickerButton from "../../components/receipt_components/imagePicker";
import { SharedContext } from "@components/active_components/sharedContext";
import { useContext, useState } from "react";
import ReceiptList from "@components/receipt_components/Receipt_List/ReceiptList";
import ManualForm from "@components/receipt_components/FormComp/ManualForm";
import ExampleFlatList from "@components/dashboard_components/ExampleFlatList";

function Receipts(){
    const [formState, setFormState] = useState<boolean>(false);
    const data = useContext(SharedContext);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>

                <View style={styles.topView}>
                    <SafeAreaView>
                        <Text style={styles.title}>The Receipt Vault</Text>
                    </SafeAreaView>
                </View>

                <View style={styles.centerConsole}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <View style={styles.buttons}>
                            <Button color="white" onPress={() => setFormState(!formState)} title="Enter Manual Bill"/>
                        </View>
                        <View style={styles.buttons}>
                            <ImagePickerButton/>
                        </View>
                    </View>
                    <Text style={styles.topMessages}>
                        {(data.userData.userReceipts.length > 1) ? `You have stored ${data.userData.userReceipts.length} receipts so far!` : null}
                    </Text>
                </View>

                <View style={styles.bottomView}>
                    <Text style={{fontSize: 25, fontWeight: '600', textAlign: 'center', color: 'white'}}>your receipts.</Text>
                    <ReceiptList receipts={data.userData.userReceipts}/>
                </View>

                {(formState) ? <ManualForm setFormState={setFormState} formState={formState}/> : null}

            </>
        </TouchableWithoutFeedback>
    );
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
        backgroundColor: colors.color1,
        width: '47%',
        marginHorizontal: '1%',
        borderRightWidth: 1,
        borderColor: 'white',
        borderRadius: 10
    },
    bottomView: {
        flex: 1, // Ensures bottomView takes remaining space
        backgroundColor: colors.color1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    topView: {
        backgroundColor: colors.color1,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingBottom: 10,
    },
    centerConsole: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 15,
        elevation: 1,
        marginBottom: 10,
    }
});

export default Receipts;
