import { Formik, Field, ErrorMessage } from "formik"
import * as Yup from 'yup'

const CreateUser = () => {

        
    const RegisterUser = async (values) =>{

        const token = JSON.parse(localStorage.getItem('token'))

        const bodyRegisterUser = {
            nombre:values.username,
            password:values.password
        }

        console.log("bodyRegisterUser", bodyRegisterUser)

        const response = await fetch('http://localhost:5000/users', {
            method:'POST',
            body: JSON.stringify(bodyRegisterUser),
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })

        console.log(response)

    }

    const ValidationSchema = Yup.object().shape({
        password:Yup.string()
            .required("Es un campo requerido")
            .min(5, 'esta contraseña debe ser por lo menos de 5 caracteres'),
        username:Yup.string()
            .required("Pone username, no me hagas calentar")
            .min(5)
            .max(15)
    })

    return (
        <Formik
            initialValues={{ password: '', username: '' }}
            validationSchema={ValidationSchema}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                isValid,
                /* and other goodies */
            }) => (
                // console.log("isValid", isValid),
                <form>
                    
                    <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                    />
                    {errors.username && touched.username && errors.username}

                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                    />
                    {errors.password && touched.password && errors.password}

                    <button type="button" onClick={() => RegisterUser(values)} disabled={values.username === '' || values.password === '' || !isValid}>
                        Crear Usuario
                    </button>
                </form>
            )}
        </Formik>
    )
}

export default CreateUser