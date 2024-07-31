import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Formik, FieldArray, FieldArrayRenderProps } from 'formik';
import { ScrollView } from 'react-native-gesture-handler';
import formSchema from './formSchema';


const ManualForm = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // renders
  return (
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={['60%', '75%', '85%']}>
          <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardContainer}>
          <ScrollView style={{marginHorizontal: '5%'}}>
            <Formik
              initialValues={{ store: '', total: '', description: ''}}
              onSubmit={values => console.log(values)}
              validationSchema={formSchema}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View>
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
                    placeholder='Discription [max 100 characters] (required)'
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

                  <Button onPress={() => handleSubmit} title="Submit" />
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
    marginVertical: 5
  },
  keyboardContainer: {
    flex: 1
  },
  errorText: {
    color: 'red',
    fontSize: 15
  }
});

export default ManualForm;