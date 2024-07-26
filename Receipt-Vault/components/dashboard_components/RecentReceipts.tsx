import { Text } from "react-native"
import { useState } from "react";

export default function RecentReceipts(props: any) {


    console.log("From Recent Receipts Component: " + props.userData);

    if (!props.userData.userInfo || props.userData.userInfo.length == 0) {
        return (
            <>
            <Text>Get started on adding receipts for them to appear here!</Text>
            </>
        )
    } else {
        console.log(props.userData.userInfo)
    }

    const emptyReturn = () => {
        <>
            <Text>Get started on adding receipts for them to appear here!</Text>
        </>
    }

    const listReturn = () => {
        
    }
}