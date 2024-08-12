import {View, Text, StyleSheet, Dimensions} from 'react-native';

interface currReceipt {
    receipt: {
        receiptID: number;
        store: string;
        items: any;
        total: string;
        buyer: string;
        type: string;
        receipt_date: string;
    }
}

// I dont actually remember what this part of the dashboard is
// I'm assuming it's 30 - 35% of height, so I'll use 33%
const height = Dimensions.get('window').height * 0.35 * (1/5);

const ListItem = (props: currReceipt) => {
    let curr = props.receipt;
    curr.store = curr.store.toUpperCase();

    // we'll get a readable date
    const date = new Date(curr.receipt_date);
    let dateString = date.toLocaleDateString('en-US');



    return (
        <View style={styles.listItem}>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{fontSize: 15, fontWeight: '700'}}>{`Store: ${curr.store}`}</Text>
                <Text>{`Date: ${dateString}`}</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                <Text style={{fontSize: 25, fontWeight: '700'}}>{`$${curr.total}`}</Text>
            </View>
        </View>
     )
}

const styles = StyleSheet.create({
    listItem: {
        flex: 1,
        borderColor: 'black',
        borderTopWidth: 1,
        height: height,
        justifyContent: 'center',
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row'
    }
})

export default ListItem;