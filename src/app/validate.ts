import * as Yup from 'yup';

export const UpdateSchema = Yup.object().shape({
    first: Yup.string().required('First name is required'),
    last: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    school: Yup.string(),
    campus: Yup.string(),
    company: Yup.string()
});

export const resetPassSchema = Yup.object().shape({
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        ),
    confPassword: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('password')], 'Passwords must match')
});
