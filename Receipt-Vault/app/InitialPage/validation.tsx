import * as yup from 'yup';

const registrationSchema = yup.object({
    fname: yup.string().required("First Name is required").min(2),
    lname: yup.string().required("Last Name is required").min(2),

    // https://github.com/jquense/yup/issues/507#issuecomment-765799429
    // using this since built-in validation for email is weak
    email: yup.string().required("Email is required.")
    .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Invalid Email"),

    password: yup.string().required("Password is required").min(8, 'Password too short')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"),
    confirmPassword: yup.string().required().oneOf([yup.ref('password')], 'Passwords must match'),
})




const loginSchema = yup.object({
    email: yup.string().required("Email is required")
    .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),

    password: yup.string().required("Password is required").min(8),
})

export {registrationSchema, loginSchema};