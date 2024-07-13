import { SafeAreaView, Text, TextInput, StyleSheet, Button, View, Pressable,
    Keyboard, TouchableWithoutFeedback
 } from "react-native";
import {Formik} from "formik";



function registrationPage() {

    
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            
            <SafeAreaView>

                    <Text style={styles.registerStyle}>
                        Registration
                    </Text>


                    <Formik
                        initialValues={{ fname: '', lname: '', email: '', password: '', password2: ''}}
                        onSubmit={((values, actions) => {
                            console.log(values);
                            // actions.resetForm();

                        })}>

                        {(props) => (
                            <View style={styles.formStyle}>
                                <TextInput placeholder="First Name" style={{...styles.defaultInput, marginVertical: 4}} onChangeText={props.handleChange('fname')} value={props.values.fname}/>
                                <TextInput placeholder="Last Name" style={{...styles.defaultInput, marginVertical: 4}} onChangeText={props.handleChange('lname')} value={props.values.lname}/>

                                <TextInput placeholder="Email" style={styles.defaultInput} onChangeText={props.handleChange('email')} value={props.values.email}/>

                                <TextInput placeholder="Password" style={{...styles.defaultInput, marginVertical: 4}} onChangeText={props.handleChange('password')} value={props.values.password}/>
                                <TextInput placeholder="Re-Enter Password" style={{...styles.defaultInput, marginVertical: 4}} onChangeText={props.handleChange('password2')} value={props.values.password2}/>

                                <Pressable style={{backgroundColor: 'green', marginHorizontal: '25%', marginTop: '5%'}}>
                                    <Button onPress={() => props.handleSubmit()} color="white" title="Register" />
                                </Pressable>
                            </View>
                        )}

                    </Formik>

            </SafeAreaView>

        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    defaultInput: {
        fontSize: 20,
        borderWidth: 1,
        marginVertical: 12,
        padding: 12,
        borderColor: 'lightgrey'
    },
    registerStyle: {
        color: 'green',
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: '20%'
    },
    formStyle: {
        marginHorizontal: 12,
        marginVertical: '5%'
    }
})

export default registrationPage;