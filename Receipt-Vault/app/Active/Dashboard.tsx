import { router } from "expo-router";
import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import { useContext, useEffect } from "react";
import * as SecureStore from 'expo-secure-store';
import colors from '@globals/colors';
import { SharedContext } from "@components/active_components/sharedContext";
import RecentReceipts from "@components/dashboard_components/RecentReceipts";

function Dashboard() {
    const data = useContext(SharedContext);

    const fetchData = async() => {
        let token = await SecureStore.getItemAsync('token');
        if (!token) {
            alert("login session has expired.");
            router.push("/");
        }
    
        const result = await fetch(`${process.env.EXPO_PUBLIC_FETCH_URL}:3001/getData`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        if (!result.ok) {
            await SecureStore.setItemAsync("token", "");
            console.log("fetching result was NOT OKAY");
            alert("login session has expired.");
            router.push("/")
        }

        const jsonResult = await result.json();
        console.log(jsonResult); 

        data.setUserData(jsonResult);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return(
        <View style={{height: '100%'}}>
            <View style={styles.topView}>
                <SafeAreaView style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                    <Text style={{...styles.welcomeText, textAlign: 'center', marginBottom: '10%'}}>Dashboard</Text>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Image source={ require('@images/person3.png')} style={styles.profilePic}/>
                        <View>
                            <Text style={styles.welcomeText}> 
                                &nbsp; &nbsp; Welcome to your Vault!
                                {"\n"}
                                <Text style={styles.secondaryText}> &nbsp; &nbsp; User: Darnell Chen</Text>
                            </Text>
                        </View>
                    </View>
                    
                </SafeAreaView>
            </View>

            <View style={styles.bottomView}>
                <Text style={styles.bottomTitle}>Recent Receipts:</Text>
                <RecentReceipts userData={data.userData}/>
            </View>

            <View style={styles.centerConsole}>
                <Text style={styles.centerText}> 
                    You have spent:
                    {"\n"}
                    <Text style={{fontSize: 85, fontWeight: '900'}}>
                        $100
                    </Text>
                    {"\n"}
                    this month.
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
        paddingBottom: '30%',
        flexDirection: 'row'
    },
    bottomView: {
        borderRadius: 30,
        backgroundColor: colors.lightlightgray,
        paddingTop: '25%',
        overflow: 'hidden',
        paddingHorizontal: '5%'
    },
    centerConsole: {
        position: 'absolute',
        height: '22%',
        backgroundColor: 'white',
        width: '90%',
        top: '27.5%',
        left: '5%',
        borderRadius: 20,
        padding: 15,
        shadowColor: 'darkgray',
        shadowOpacity: 0.5,
        shadowOffset: {width: 0, height: 3},
        elevation: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    centerText: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '600'
    },
    welcomeText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    secondaryText: {
        fontWeight: 'normal',
        fontSize: 15
    },
    profilePic: {
        width: '25%',
        aspectRatio: 1,
        borderRadius: 1000
    },
    bottomTitle: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        color: colors.color1
    }
})

export default Dashboard;