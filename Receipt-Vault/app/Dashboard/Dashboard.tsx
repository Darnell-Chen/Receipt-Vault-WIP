import { router } from "expo-router";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import * as SecureStore from 'expo-secure-store';

import {FETCH_URL} from "@env";

function Dashboard() {
    const fetchData = async() => {
        let token = await SecureStore.getItemAsync('token');
        if (token) {
            alert("🔐 Here's your value 🔐 \n" + token);
        } else {
            alert('No values stored under that key.');
        }
    
        const result = await fetch(`${process.env.FETCH_URL}:3001/getData`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log(result);
    }

    return(
        <SafeAreaView>
            <Text>Dashboard</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})

export default Dashboard;