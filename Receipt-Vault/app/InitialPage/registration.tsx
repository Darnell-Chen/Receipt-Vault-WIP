import { SafeAreaView, Text, TextInput, StyleSheet, Button, View, Pressable,
    Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform
 } from "react-native";
import { Formik } from "formik";
import { registrationSchema } from "./validation";
import { useState } from "react";


function registrationPage() {

    const [warnMSG, setWarnMSG] = useState<String | null>(null);
    const [successMSG, setSuccessMSG] = useState<String | null>(null);

    const registerUser = async(value: Object, actions: any) => {

        setWarnMSG(null);
        setSuccessMSG(null);

        const result = await fetch(`${process.env.EXPO_PUBLIC_FETCH_URL}:3001/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        })

        if (result.ok) {
            actions.resetForm();
            setSuccessMSG("Account has been created")
        } else {
            setWarnMSG("error while trying to create account");
        }
    }

    
    
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardContainer}>

            <SafeAreaView style={styles.safeArea}>

                    <Formik
                        initialValues={{ fname: '', lname: '', email: '', password: '', confirmPassword: ''}}
                        validationSchema={registrationSchema}
                        onSubmit={(values, actions) => {
                            // actions.resetForm();
                            console.log("successfully passed validation");

                            try {
                                registerUser(values, actions)
                            } catch (e) {
                                setWarnMSG("error while trying to create account");
                            }
                        }}>

                        {(props) => (
                            <View style={styles.formStyle}>
                                <TextInput placeholder="First Name" 
                                    style={{...styles.defaultInput, marginVertical: 4}} 
                                    onChangeText={props.handleChange('fname')} 
                                    onBlur={props.handleBlur('fname')}
                                    value={props.values.fname}/>
                                <Text style={styles.errorText}> {props.touched.fname && props.errors.fname } </Text>


                                <TextInput placeholder="Last Name" 
                                    style={{...styles.defaultInput, marginVertical: 4}} 
                                    onChangeText={props.handleChange('lname')}
                                    onBlur={props.handleBlur('lname')} 
                                    value={props.values.lname}/>
                                <Text style={styles.errorText}> {props.touched.lname && props.errors.lname } </Text>



                                <TextInput placeholder="Email" 
                                    style={styles.defaultInput} 
                                    onChangeText={props.handleChange('email')} 
                                    onBlur={props.handleBlur('email')}
                                    value={props.values.email}/>
                                <Text style={styles.errorText}> {props.touched.email && props.errors.email } </Text>



                                <TextInput placeholder="Password" 
                                    style={{...styles.defaultInput, marginVertical: 4}} 
                                    onChangeText={props.handleChange('password')} 
                                    onBlur={props.handleBlur('password')}
                                    value={props.values.password}/>
                                <Text style={styles.errorText}> {props.touched.password && props.errors.password } </Text>
                                
                                <TextInput placeholder="Confirm Password" 
                                    style={{...styles.defaultInput, marginVertical: 4}} 
                                    onChangeText={props.handleChange('confirmPassword')} 
                                    onBlur={props.handleBlur('confirmPassword')}
                                    value={props.values.confirmPassword}/>
                                <Text style={styles.errorText}> {props.touched.confirmPassword && props.errors.confirmPassword } </Text>
                                

                                <Text style={styles.errorText}>
                                    {(warnMSG ? warnMSG : null)}
                                </Text>
                                <Text style={styles.successText}>
                                    {(successMSG ? successMSG : null)}
                                </Text>

                                <Pressable style={{backgroundColor: 'green', marginHorizontal: '25%', marginTop: '5%', bottom: '0%'}}>
                                    <Button onPress={() => props.handleSubmit()} color="white" title="Register" />
                                </Pressable>
                            </View>
                        )}

                    </Formik>

            </SafeAreaView>

            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    keyboardContainer: {
        flex: 1
    },
    safeArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 12,
        backgroundColor: 'white',
    },
    defaultInput: {
        borderWidth: 1,
        padding: 12,
        borderColor: 'lightgrey',
    },
    formStyle: {
        width: '100%',
    },
    errorText: {
        color: 'red',
        fontSize: 15,
    },
    successText: {
        color: 'green',
        fontSize: 15,
    },

})

export default registrationPage;