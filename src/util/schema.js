import * as yup from "yup";
export const validationSchemaLogin = yup.object({
    // phoneNo: yup.string()
    //     .required()
    //     .matches(/^[0-9]/, "Must be only digits")
    //     .min(10, 'Phone Num Must Be 10 Digit Long')
    //     .max(10, 'Phone Num Must Be 10 digit Long'),
    username: yup.string().email().required(),
    password: yup.string().min(6).max(20).required(),
})