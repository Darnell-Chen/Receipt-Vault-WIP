import * as Yup from 'yup';

const formSchema = Yup.object().shape({
    store: Yup.string()
      .max(50, 'too long')
      .required('required'),
    total: Yup.string()
      .min(1)
      .required('required')
      .test(
        'is-number',
        'make sure total is a number greater than or equal to 0',
        (value) => /^([0-9]*[.])?[0-9]+$/.test(value)
      )
      .test(
        'decimal-test',
        'please round to 2 decimal places',
        (value) => /^\d+(\.\d?\d?)?$/.test(value)
      ),

    description: Yup.string().max(100).required('required'),
});

export default formSchema;