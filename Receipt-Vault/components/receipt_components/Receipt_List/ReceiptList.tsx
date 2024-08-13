import { View, Text, FlatList, StyleSheet, Animated, TouchableOpacity, LayoutAnimation, Platform, UIManager } from "react-native";
import { useState, useRef } from "react";
import parseReceipt from './ParsedReceipt';
import ParsedReceipt from "./ParsedReceipt";
import colors from "@globals/colors";

// I enjoy having bad practices for variable names

interface ReceiptList {
    receipts: Receipt[];
}

interface Receipt {
    items: any,
    receiptID: number,
    receipt_date: string,
    store: string,
    total: string
    type: string
}

const ReceiptItem = (receipt: {receipt: Receipt}) => {
    const curr = receipt.receipt;
    const [expanded, setExpanded] = useState<boolean>(false);

    if (Platform.OS === 'android') {
        if (UIManager.setLayoutAnimationEnabledExperimental) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    return (
        <>
        <View style={{display: 'flex', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 15, backgroundColor: 'white', marginHorizontal: 10, marginTop: 20, 
            borderTopStartRadius: 10, borderTopEndRadius: 10, borderBottomEndRadius: (expanded ? 0 : 10), borderBottomStartRadius: (expanded ? 0 : 10)}}>
            <View style={{justifyContent: 'center', flex: 5}}>
                <Text style={{fontSize: 20, fontWeight: '600'}}>
                    {`Store: ${curr.store}`}
                </Text>
                <Text>
                    {`Date: ${(new Date(curr.receipt_date).toLocaleDateString("en-US", {year: 'numeric', month: "long", day: "numeric",}))}`}
                </Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'white', flex: 4}}>
                <Text style={{fontSize: 30, fontWeight: '700', color: colors.color2}}>
                    {`$ ${curr.total}`}
                </Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    setExpanded(!expanded);
                    }}>
                    <Text style={{fontSize: 30, fontWeight: '500', alignItems: 'center', justifyContent: 'center', color: colors.color2}}>
                        {expanded ? `v ` : '<'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>

        {expanded && (
            <View style={{paddingHorizontal: 10, paddingBottom: 20, paddingTop: 10, backgroundColor: 'white', marginHorizontal: 10, borderBottomEndRadius: 10, borderBottomStartRadius: 10}}>
                <Text style={{fontSize: 16, fontWeight: '600', paddingVertical: 3}}>
                    Type: {curr.type.toUpperCase()}
                </Text>
                <ParsedReceipt type={curr.type} items={curr.items}/>
            </View>
        )}
        </>
    )
}

const ReceiptList = (receiptList: ReceiptList) => {
    const myReceipts = receiptList.receipts;

    return (
        <>
            <FlatList
            scrollEnabled={true}
            data={myReceipts}
            keyExtractor={item => item.receiptID.toString()}
            renderItem={({item}) => (<ReceiptItem receipt={item}/>)}
            />
        </>
    )
}

const styles = StyleSheet.create({
    receiptItem: {
        backgroundColor: 'white',
        padding: 10
    }
})

export default ReceiptList;