import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useState } from 'react';

const EditarEquipo = () => {
    const [message, setMessage] = useState("");
    const [editEquipo, setEditEquipo] = useState({})
    
    const bodyActions = (rowData) => {
        return (
            <div>
                <Button icon='pi pi-pencil' label='Editar' onClick={() => (setEditEquipo(rowData), setOpenDialogEditUser(true))} />
                <Button icon='pi pi-trash' label='Borrar' onClick={() => (onDeletEquipo(rowData))} />
            </div>
        )
    }


    const EditarEquipo = async (values) => {
        const token = JSON.parse(localStorage.getItem('token'));

        const bodyEditarEquipo = {
            nombre: values.nombre,
            costo: values.costo,
        };




        try {
            const response = await fetch(`http://localhost:5000/editar/${editEquipo.id}/equipo`, {
                method: 'POST',
                body: JSON.stringify(bodyEditarEquipo),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                setMessage("Equipo editado con éxito");
            } else {
                const errorData = await response.json();
                setMessage(`Error: ${errorData.mensaje || "No tiene permisos"}`);
            }
        } catch (error) {
            console.error("Error al editar el equipo:", error);
            setMessage("Error en la conexión. Inténtalo de nuevo.");
        }
    };

    const ValidationSchema = Yup.object().shape({
        nombre: Yup.string()
            .required("Es un campo requerido")
            .min(5, 'Mínimo 5 caracteres'),
        costo: Yup.number()
            .required("Ingrese el costo")
            .min(2, "El costo debe ser mayor a 2")
            .max(10000000, "El costo no debe superar los los 10 million"),
    });

    return (
        <div>
            <h2>Editar equipo</h2>
            {message && <p>{message}</p>}
            
            <Formik
                initialValues={{ nombre: '', costo: ''}}
                validationSchema={ValidationSchema}
                onSubmit={EditarEquipo}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isValid,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Nombre del Equipo</label>
                            <input
                                type="text"
                                name="nombre"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.nombre}
                            />
                            <ErrorMessage name="nombre" component="div" />
                        </div>

                        <div>
                            <label>Costo</label>
                            <input
                                type="number"
                                name="costo"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.costo}
                            />
                            <ErrorMessage name="costo" component="div" />
                        </div>

                        <button type="submit" disabled={!isValid || !values.nombre || !values.costo || !values.modelo_id || !values.categoria_id}>
                            Editar
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default EditarEquipo;
