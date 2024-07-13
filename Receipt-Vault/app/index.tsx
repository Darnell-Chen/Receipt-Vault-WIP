import { Link } from "expo-router";
import { Text, Button, View, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, Pressable, Keyboard, TouchableWithoutFeedback } from "react-native";
function Index() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>

      <SafeAreaView>
        <View style={{margin: 12}}>
          <Text style={styles.loginLogo}>Receipt</Text>
          <Text style={styles.loginLogo2}>Vault.</Text>
          <Text style={styles.phrase}>Keep Track of your Expenses 24/7</Text>


          <TextInput style={styles.loginInput} placeholder="Username"/>
          <TextInput style={styles.loginInput} placeholder="Password"/>
          
          <Pressable>
            <Link style={{textAlign: 'right', color: 'green'}} href="./InitialPage/registration">
              Need to Register?
            </Link>
          </Pressable>
        </View>

        <TouchableOpacity style={styles.loginButton}>
          <Button title="Login" color="white"/>
        </TouchableOpacity>
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
      marginVertical: 12,
      borderWidth: 1,
      padding: 10,
      borderColor: 'lightgray',
    },
    loginButton: {
      backgroundColor: 'green',
      marginHorizontal: '25%',
      marginTop: 10,
    },
});

export default Index;
