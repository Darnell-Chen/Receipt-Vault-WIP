import React, { useCallback, useContext, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button, TextInput, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Formik } from 'formik';
import { ScrollView } from 'react-native-gesture-handler';
import formSchema from './formSchema';
import colors from '@globals/colors';
import postData from './postForm';
import { SharedContext } from '@components/active_components/sharedContext';



const ManualForm = () => {

  const contextData = useContext(SharedContext);
  let uuid = "";
  
  uuid = contextData.userData.userInfo[0].uuid;

  // the documentation has this, and it takes value: 
  // React.DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES[keyof React.DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES]) ???
  // so just dont use it I guess
  const bottomSheetRef = useRef<BottomSheet>(null);


  // renders
  return (
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['10%', '35%','45%', '60%', '75%', '89%']}>
          <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardContainer}>
          <ScrollView style={{marginHorizontal: '5%'}}>
            <Formik
              initialValues={{ store: '', total: '', description: ''}}
              onSubmit={(values, actions) => {
                console.log(values);
                postData(values, uuid, "manual")
              }}
              validationSchema={formSchema}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View>
                  <Text style={styles.title}>Manual Input Form</Text>

                  <TextInput
                    style={styles.textInput}
                    onChangeText={handleChange('store')}
                    onBlur={handleBlur('store')}
                    value={values.store}
                    placeholder='Store Name'
                  />
                  {errors.store && touched.store ? (<Text style={styles.errorText}>{errors.store}</Text>) : null}

                  <TextInput
                    style={styles.textInput}
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                    value={values.description}
                    placeholder='Discription [max 100 characters]'
                  />
                  {errors.description && touched.description ? (<Text style={styles.errorText}>{errors.description}</Text>) : null}


                  <TextInput
                    style={styles.textInput}
                    onChangeText={handleChange('total')}
                    onBlur={handleBlur('total')}
                    value={values.total}
                    placeholder='Total'
                  />
                  {errors.total && touched.total ? (<Text style={styles.errorText}>{errors.total}</Text>) : null}

                  <View style={styles.submitButton}>
                    <Button color="white" onPress={() => handleSubmit()} title="Store Bill" />
                  </View>
                </View>
              )}
            </Formik>
            </ScrollView>
            </KeyboardAvoidingView>
      </BottomSheet>
  );


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  textInput: {
    borderColor: 'lightgray',
    borderWidth: 2,
    padding: 5,
    fontSize: 20,
    marginVertical: 5,
    borderRadius: 20,
    paddingHorizontal: 10
  },
  keyboardContainer: {
    flex: 1
  },
  errorText: {
    color: 'red',
    fontSize: 15
  },
  submitButton: {
    backgroundColor: colors.color1,
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 5
  },
  title: {
    color: colors.color2,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  }
});

export default ManualForm;