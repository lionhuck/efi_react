import { Fragment, useState, useRef } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ToggleButton } from 'primereact/togglebutton';
import { Formik } from "formik";
import { Toast } from 'primereact/toast';  // Importa Toast
import * as Yup from 'yup';

const UsersView = ({ loadingUsers, data }) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const [openDialogEditUser, setOpenDialogEditUser] = useState(false);
    const [editUser, setEditUser] = useState({});
    const toast = useRef(null);  // Define ref para Toast

    const bodyIsAdmin = (rowData) => {
        return (
            rowData.is_admin ? <span>Si</span> : <span>No</span>
        );
    };

    const bodyActions = (rowData) => {
        return (
            <div>
                <Button icon='pi pi-pencil' label='Editar' onClick={() => (setEditUser(rowData), setOpenDialogEditUser(true))} />
                <Button icon='pi pi-trash' label='Borrar' onClick={() => onDeletUser(rowData)} />
            </div>
        );
    };

    const ValidationSchema = Yup.object().shape({
        nombre: Yup.string()
            .required('Este campo es requerido')
            .max(50, 'El nombre no debe ser mayor a 50 caracteres'),
    });

    const onEditUser = async (values) => {
        const bodyEditUser = {
            nombre: values.nombre,
            is_admin: values.is_admin
        };

        const response = await fetch(`http://127.0.0.1:5000/users/${editUser.id}`, {
            method: 'PUT',
            body: JSON.stringify(bodyEditUser),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            toast.current.show({ severity: 'success', summary: 'Usuario actualizado', detail: 'El usuario ha sido modificado exitosamente.' });
            setTimeout(() => window.location.reload(), 1000);  // Recarga la página después de mostrar el mensaje
        }
    };

    const onDeletUser = async (values) => {
        const response = await fetch(`http://127.0.0.1:5000/users/${values.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            toast.current.show({ severity: 'success', summary: 'Usuario eliminado', detail: 'El usuario ha sido eliminado exitosamente.' });
            setTimeout(() => window.location.reload(), 1000);  // Recarga la página después de mostrar el mensaje
        }
    };

    return (
        <Fragment>
            <Toast ref={toast} /> {/* Agrega el Toast */}
            {loadingUsers ?
                <ProgressSpinner />
                :
                <DataTable value={data} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="nombre" header="Nombre de usuario"></Column>
                    <Column field="is_admin" body={bodyIsAdmin} header="¿Es administrador?"></Column>
                    <Column body={bodyActions} header="Acciones"></Column>
                </DataTable>
            }
            {openDialogEditUser && (
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
                            isValid
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
                                <button type="button" onClick={() => onEditUser(values)} disabled={!isValid}>
                                    Modificar usuario
                                </button>
                            </form>
                        )}
                    </Formik>
                </Dialog>
            )}
        </Fragment>
    );
};

export default UsersView;
