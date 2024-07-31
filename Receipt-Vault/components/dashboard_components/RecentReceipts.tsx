import { Text } from "react-native"
import { useState } from "react";
import EmptyList from "./EmptyList";
import FilledList from "./FilledList";

export default function RecentReceipts(props: any) {

    console.log("From Recent Receipts Component: " + props.userData);

    if (!props.userData.userInfo || props.userData.userInfo.length == 0) {
        return (
            <EmptyList/>
        )
    } else {
        console.log("In Recent Receipts: " + props.userData.userInfo);
        return (
            <FilledList data={props.userData}/>
        )
    }
}