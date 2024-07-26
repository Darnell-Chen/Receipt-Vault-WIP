import { Link } from "expo-router";
import { Text, Button, View, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, Pressable, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Formik } from "formik";
import { loginSchema } from "./InitialPage/validation";
import { useState } from "react";
import { router, Redirect } from "expo-router";
import * as SecureStore from 'expo-secure-store';


function Index() {

  // checks if the user has a token to login with
  const loggedIn = async () => {
    let token = await SecureStore.getItemAsync('token');
    if (token) {
      return (<Redirect href="/Active"/>)
    }
  }

  loggedIn();

  // this is the state of warning messages that might appear if user is missing something
  const [loginMsg, setLoginMsg] = useState<string | null>(null);

  const loginFunction = async (value: object) => {
    const result = await fetch(`${process.env.EXPO_PUBLIC_FETCH_URL}:3001/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(value),
    })

    if (!result) {
      setLoginMsg("server error");
      return;
    }

    if (!result.ok) {
      setLoginMsg("Make sure all inputs are correct");
    }

    const token = await result.json();

    try {
      console.log(token.token);
      await SecureStore.setItemAsync("token", token.token);
      router.replace("/Active");
    } catch (error) {
      console.log("error storing token to secure storage");
      setLoginMsg("Client Error with Token");
      return;
    }
  }



  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>

      <SafeAreaView>
        <View style={{margin: 12}}>
          <Text style={styles.loginLogo}>Receipt</Text>
          <Text style={styles.loginLogo2}>Vault.</Text>
          <Text style={styles.phrase}>Keep Track of your Expenses 24/7</Text>


          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values) => (loginFunction(values))}
            validationSchema={loginSchema}
            >
            {(props) => (
              <View>
                <TextInput placeholder="Email"
                  style={styles.loginInput} 
                  onChangeText={props.handleChange('email')}
                  onBlur={props.handleBlur('email')}
                  value={props.values.email}
                />

                <TextInput placeholder="Password"
                  style={styles.loginInput} 
                  onChangeText={props.handleChange('password')}
                  onBlur={props.handleBlur('password')}
                  value={props.values.password}
                />

                <Link style={{textAlign: 'right', color: 'green', marginTop: 12}} href="./InitialPage/registration">
                  Need to Register?
                </Link>

                <Text style={styles.errorText}> {props.touched.email && props.errors.email && "Make sure all inputs are correct" } </Text>
                <Text style={styles.errorText}> {!(props.errors.email) && props.touched.password && props.errors.password && "Make sure all inputs are correct"} </Text>
                <Text style={styles.errorText}> {!(props.errors.email) && !(props.errors.password) && loginMsg} </Text>


                <TouchableOpacity style={styles.loginButton}>
                  <Button title="Login" color="white" onPress={() => props.handleSubmit()}/>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        
        </View>
      </SafeAreaView>

      </View>

    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
    loginLogo: {
      marginTop: '20%',
      textAlign: 'left',
      fontSize: 80,
      color: 'green',
      fontWeight: 'bold',
    },
    loginLogo2: {
      textAlign: 'left',
      marginTop: 0,
      fontSize: 80,
      color: 'green',
      fontWeight: 'bold',
    },
    phrase: {
      textAlign: 'left',
      marginTop: 0,
      fontSize: 20,
      fontWeight: 'bold',
    },
    loginInput: {
      height: 40,
      marginTop: 12,
      borderWidth: 1,
      padding: 10,
      borderColor: 'lightgray',
    },
    loginButton: {
      backgroundColor: 'green',
      marginHorizontal: '25%',
      marginTop: 10,
    },
    errorText: {
      color: 'red',
      fontSize: 15,
    }
});

export default Index;
