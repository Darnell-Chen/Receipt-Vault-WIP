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

    console.log("From Recent Receipts Component: " + JSON.stringify(props.userData));

    if (props.userData.userReceipts.length == 0) {
        return (
            <SafeAreaView style={styles.wrapperView}>
                <EmptyList/>
            </SafeAreaView>
        )
    } else {
        console.log("In Recent Receipts: " + props.userData.userInfo);
        return (
            <SafeAreaView style={styles.wrapperView}>
            <FilledList userReceipts={props.userData.userReceipts}/>
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