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


// const EquiposView = ({ loadingData, data, handleDelete, handleUpdate }) => {

const EquiposView = ({ loadingData, data}) => {
    const token = JSON.parse(localStorage.getItem('token'))
    const [openDialogEditEquipo, setOpenDialogEditEquipo] = useState(false)
    const [editEquipo, setEditEquipo] = useState({})
    const toast = useRef(null);  // Define ref para Toast


    const bodyActions = (rowData) => {
        return (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button label="Editar" onClick={() => { setEditEquipo(rowData); setOpenDialogEditEquipo(true); }} />
            <Button label="Delete" onClick={() => onDeleteEquipo(rowData)} />
        </div>
        );
    };


    // const bodyActions = (row) => {
    //     return (
    //         <div style={{ display: 'flex', gap: '0.5rem' }}>
    //             <Button label="Update" onClick={() => handleUpdate(row.id)} />
    //             <Button label="Delete" onClick={() => handleDelete(row.id)} />
                
    //         </div>
    //     );
    // };

    const onEditEquipo = async (values) => {
        const bodyEditEquipo = {
            nombre: values.nombre,
            costo: values.costo
        }

        const response = await fetch(`http://localhost:5000/editar/${editEquipo.id}/equipos`, {
            method: 'PUT',
            body: JSON.stringify(bodyEditEquipo),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            toast.current.show({ severity: 'success', summary: 'Equipo actualizado', detail: 'El equipo ha sido modificado exitosamente.' });
            setTimeout(() => window.location.reload(), 1000);  // Recarga la página después de mostrar el mensaje
            }
        };

    const onDeleteEquipo = async (values) => {
        const response = await fetch(`http://localhost:5000/editar/${values.id}/equipos`, {
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
            {loadingData ? <ProgressSpinner /> 
            : data.length > 0 ? (
                <DataTable value={data} paginator rows={10} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="nombre" header="Nombre"></Column>
                    <Column field="modelo_id" header="ID Modelo"></Column>
                    <Column field="categoria_id" header="ID Categoria"></Column>
                    <Column field="costo" header="Costo"></Column>
                    <Column body={bodyActions} header="Acciones"></Column>
                </DataTable>
            ) : (
                <p>No hay datos disponibles.</p>
            )}

            {openDialogEditEquipo&&(
            <Dialog
                visible={openDialogEditEquipo}
                onHide={() => setOpenDialogEditEquipo(false)}
                header='Editar Equipo'
            >
                <Formik
                    initialValues={{ costo: editEquipo.costo, nombre: editEquipo.nombre }}
                    // validationSchema={ValidationSchema}
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
                                Nombre del equipo
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
                                Costo
                            </label>
                            <input
                                type="number"
                                name="costo"
                                step={"0.01"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.costo}
                            />
                            {errors.costo && touched.costo && errors.costo}
                            
                            <button type="button" onClick={() => onEditEquipo(values)} disabled={!values.nombre || !values.costo || !isValid}>
                                Modificar Equipo
                            </button>
                        </form>
                    )}
                </Formik>

            </Dialog>
            )}


        </Fragment>
    );
};

export default EquiposView;
