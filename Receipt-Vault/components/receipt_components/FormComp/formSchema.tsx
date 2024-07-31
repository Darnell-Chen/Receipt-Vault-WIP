import * as Yup from 'yup';

const formSchema = Yup.object().shape({
    store: Yup.string()
      .max(50, 'Too Long!')
      .required('Required'),
    total: Yup.string()
      .min(1)
      .required('Required')
      .test(
        'is-number',
        'make sure total is a positive number',
        (value) => /^([0-9]*[.])?[0-9]+$/.test(value)
      )
      .test(
        'decimal-test',
        'please enter to 2 decimal places',
        (value) => /^\d+(\.\d{2})?$/.test(value)
      ),

    description: Yup.string().max(100).required('Required'),
});

export default formSchema;