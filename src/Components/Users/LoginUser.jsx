import { Formik, Field, ErrorMessage } from "formik"
import * as Yup from 'yup'

const LoginUser = () => {

    const onLoginUser = async (values) =>{

        const bodyLoginUser = btoa(`${values.username}:${values.password}`)

        const response = await fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {
                "Authorization": `Basic ${bodyLoginUser}`
            }

        })

        if (!response.ok){
            console.log("Error en la solicitud")
        }
        const data = await response.json()
        
        localStorage.setItem('token', JSON.stringify(data.Token))

        console.log(data.Token)
    }
    return (
        <Formik
            initialValues={{ password: '', username: '' }}>
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

                    <button type="button" onClick={() => onLoginUser(values)} disabled={values.username === '' || values.password === '' || !isValid}>
                        LOGIN
                    </button>
                </form>
            )}
        </Formik>
    )
}
export default LoginUser