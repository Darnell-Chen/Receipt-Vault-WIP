import { Text } from "react-native"
import { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import EmptyList from "./EmptyList";
import FilledList from "./FilledList";

interface recentReceiptsProps {
    userData: {
        userInfo: null | [];
        userReceipts: [];
    };
}

export default function RecentReceipts(props: recentReceiptsProps) {

    // flatlist has property ListEmptyComponent - but I won't be fixing what's not broken :)
    if (props.userData.userReceipts.length == 0) {
        return (
            <SafeAreaView style={styles.wrapperView}>
                <EmptyList/>
            </SafeAreaView>
        )
    } else {
        return (
            <SafeAreaView style={styles.wrapperView}>
            <FilledList 
            userReceipts={props.userData.userReceipts}/>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    wrapperView: {
        height: '65%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3%'
    }
})