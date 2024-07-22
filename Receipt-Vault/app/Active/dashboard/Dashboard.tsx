import { router } from "expo-router";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import * as SecureStore from 'expo-secure-store';
import colors from '@globals/colors';

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
        <View style={{height: '100%'}}>
            <View style={styles.topView}>
                <SafeAreaView>
                    <Text style={styles.welcomeText}> Welcome to your Vault.</Text>
                </SafeAreaView>
            </View>

            <View style={styles.bottomView}>
            
            </View>

            <View style={styles.centerConsole}>
                <Text> 
                    You have spent:
                    {"\n"}
                    <Text>
                        $85
                    </Text>
                    {"\n"}
                    This month.
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    topView: {
        height: '40%',
        backgroundColor: colors.color1,
        display: 'flex',
        borderRadius: 30,
        overflow: 'hidden',
        paddingHorizontal: '5%',
        paddingBottom: '20%',
    },
    bottomView: {
        borderRadius: 30,
        backgroundColor: colors.lightlightgray,
    },
    centerConsole: {
        position: 'absolute',
        height: '25%',
        backgroundColor: 'white',
        width: '90%',
        top: '27.5%',
        left: '5%',
        borderRadius: 20,
        padding: 15,
        shadowColor: 'darkgray',
        shadowOpacity: 0.5,
        shadowOffset: {width: 0, height: 3},
        elevation: 1
    },
    welcomeText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    }
})

export default Dashboard;