import { Text, StyleSheet, FlatList, SafeAreaView } from "react-native"
import ListItem from "./ListItem"

interface receiptList {
    userReceipts: {
        receiptID: number,
        store: string,
        items: any,
        total: string,
        buyer: string,
        type: string, 
        receipt_date: string
    }[];
}

function FilledList(props: receiptList) {

    // for Dashboard, we'll only display the five most recent purchases
    const myList = props.userReceipts.slice(props.userReceipts.length - 5, props.userReceipts.length);

    return (
        <SafeAreaView style={{width: '100%'}}>
            <FlatList
                contentContainerStyle={{ flexGrow: 1, display: 'flex' }}
                style={styles.list}
                data={myList}
                renderItem={({item}) => (<ListItem receipt={item}/>)}
                keyExtractor={item => item.receiptID.toString()}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    list: {
        height: '100%',
        width: '100%',
        display: 'flex'
    }
})

export default FilledList;