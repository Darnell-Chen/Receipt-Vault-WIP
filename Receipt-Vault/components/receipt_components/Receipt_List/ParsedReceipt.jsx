import { FlatList, Text, View } from "react-native";

const ListItem = ({receipt}) => {
    return (
        <View style={{borderTopWidth: 1, borderColor: 'black', display: 'flex', flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 5}}>
            <Text style={{flex: 1}}>{receipt.description}</Text>
            <Text style={{flex: 1, textAlign: 'right'}}>${receipt.total_amount}</Text>
            <Text style={{flex: 1, textAlign: 'right'}}>${receipt.total_amount}</Text>
            <Text style={{flex: 1, textAlign: 'right'}}>${receipt.total_amount}</Text>
            <Text style={{flex: 1, textAlign: 'right'}}>${receipt.total_amount}</Text>
        </View>
    )
}

const ParsedReceipt = ({items, type}) => {
    if (type == "mindee") {
        return (
            <FlatList
                data={items}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (<ListItem receipt={item}/>)}
            />
        )
    } else {
        return (
            <Text>{`Description: ${items.description}`}</Text>
        )
    }
}

export default ParsedReceipt;