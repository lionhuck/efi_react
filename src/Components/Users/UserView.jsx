import { Fragment, useState } from "react"
import { ProgressSpinner } from "primereact/progressspinner"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ToggleButton } from 'primereact/togglebutton';
import { Formik } from "formik";
import * as Yup from 'yup'

const UsersView = ({ loadingUsers, data }) => {
    const token = JSON.parse(localStorage.getItem('token'))

    const [openDialogEditUser, setOpenDialogEditUser] = useState(false)
    const [editUser, setEditUser] = useState({})

    const bodyIsAdmin = (rowData) => {
        return (
            rowData.is_admin ? <span>Si</span> : <span>No</span>
        )
    }

    console.log(editUser);
    
    const bodyActions = (rowData) => {
        return (
            <div>
                <Button icon='pi pi-pencil' label='Editar' onClick={() => (setEditUser(rowData), setOpenDialogEditUser(true))} />
                <Button icon='pi pi-trash' label='Borrar' onClick={() => (onDeletUser(rowData))} />
            </div>
        )
    }

    const ValidationSchema = Yup.object().shape({
        nombre: Yup.string()
            .required('Este campo es requerido')
            .max(50, 'El nombre no debe ser mayor a 50 caracteres'),
    })


    const onEditUser = async (values) => {
        const bodyEditUser = {
            nombre: values.nombre,
            is_admin: values.is_admin
        }

        const response = await fetch(`http://127.0.0.1:5000/users/${editUser.id}`, {
            method: 'PUT',
            body: JSON.stringify(bodyEditUser),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })


    }

    const onDeletUser = async (values) => {
        const response = await fetch(`http://127.0.0.1:5000/users/${values.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })


    }

    console.log(data);
    

    return (
        <Fragment>
            {loadingUsers ?
                <ProgressSpinner />
                :
                <DataTable value={data} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="nombre" header="Nombre de usuario"></Column>
                    <Column field="is_admin" body={bodyIsAdmin} header="¿Es administrador?"></Column>
                    <Column body={bodyActions} header="Acciones"></Column>
                </DataTable>
            }
            {openDialogEditUser&&(
            <Dialog
                visible={openDialogEditUser}
                onHide={() => setOpenDialogEditUser(false)}
                header='Editar usuario'
            >
                <Formik
                    initialValues={{ is_admin: editUser.is_admin, nombre: editUser.nombre }}
                    validationSchema={ValidationSchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        isSubmitting,
                        isValid
                        /* and other goodies */
                    }) => (
                        <form style={{ display: 'inline-grid' }}>
                            <label>
                                Nombre de usuario
                            </label>
                            <input
                                type="text"
                                name="nombre"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.nombre}
                            />
                            {errors.nombre && touched.nombre && errors.nombre}
                            <label>
                                ¿Es administrador?
                            </label>
                            <ToggleButton
                                name='is_admin'
                                checked={values.is_admin}
                                onChange={handleChange}
                                onLabel="Si"
                                offLabel="No"
                            />
                            <button type="button" onClick={() => onEditUser(values)} disabled={values.password === '' || values.nombre === '' || !isValid}>
                                Modificar usuario
                            </button>
                        </form>
                    )}
                </Formik>

            </Dialog>
            )}
        </Fragment>
    )
}
export default UsersView