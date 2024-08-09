import React, { useCallback, useContext, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Formik } from 'formik';
import { ScrollView } from 'react-native-gesture-handler';
import formSchema from './formSchema';
import colors from '@globals/colors';
import postData from './postForm';
import { SharedContext } from '@components/active_components/sharedContext';
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface manualFormProps {
  setFormState: React.Dispatch<React.SetStateAction<boolean>>;
  formState: boolean;
}

const ManualForm = (props: manualFormProps) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // this is the reference for the bottomsheet - use bottomsheet.ref.* to access its methods
  // https://ui.gorhom.dev/components/bottom-sheet/methods/
  const bottomSheetRef = useRef<BottomSheet>(null);

  const confirmDate = (date: Date, setFieldValue: any) => {
    setFieldValue('date', date);
    setDatePickerVisibility(!isDatePickerVisible);
  }


  return (
      <BottomSheet
        ref={bottomSheetRef}
        enablePanDownToClose={true}
        onClose={() => {props.setFormState(!props.formState)}}
        snapPoints={['75%', '89%']}>
          <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardContainer}>
          <ScrollView style={{marginHorizontal: '5%'}}>
            <Formik
              initialValues={{ store: '', total: '', description: '', date: (new Date)}}
              onSubmit={(values, actions) => {
                console.log(values);
                postData(values, "manual");
                actions.resetForm();
                props.setFormState(!props.formState);
              }}
              validationSchema={formSchema}
            >
              {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
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

                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={(date) => confirmDate(date, setFieldValue)}
                    onCancel={() => setDatePickerVisibility(!isDatePickerVisible)}
                  />

                  <TextInput
                      style={styles.textInput}
                      onPress={() => setDatePickerVisibility(!isDatePickerVisible)}
                      value = {values.date.toLocaleDateString("en-US")}
                      placeholder='Date'
                      editable = {false}
                  />
                  
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

                  <View style={styles.cancelButton}>
                    <Button color="white" onPress={() => {bottomSheetRef!.current!.close()}} title="Cancel" />
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
    marginTop: 15
  },
  title: {
    color: colors.color2,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  cancelButton: {
    backgroundColor: colors.semilightgray,
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 5
  }
});

export default ManualForm;