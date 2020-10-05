
import * as yup from 'yup'
let UserSchemaStore = {}

let firstName = yup.string('Имя должно содержать только буквы!')
    .min(3, `Имя должно быть длинее 3 букв!`)
    .max(30, 'Имя должно быть короче 30 букв!').required('Это поле обязательное!')
let lastName = yup.string('Фамилия должна содержать только буквы!')
    .min(3 ,`Фамилия должна быть длинее 3 букв!`)
    .max(30 ,`Фамилия должна быть короче 30 букв!`).required('Это поле обязательное!')
let phone = yup.string().min(3).max(30).required('Это поле обязательное!')
let gender = yup.boolean().required()
let age = yup.number().required().positive().integer()
let complexUserSchema = yup.object().shape({
    firstName,
    lastName,
    phone,
    gender,
    age
})

UserSchemaStore = {
    firstName,
    lastName,
    phone,
    gender,
    age,
    complexUserSchema
}



export default UserSchemaStore