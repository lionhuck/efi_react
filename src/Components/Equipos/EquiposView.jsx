import { Fragment } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";

const EquiposView = ({ loadingData, data, handleDelete, handleUpdate }) => {
    const bodyActions = (row) => {
        return (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button label="Delete" onClick={() => handleDelete(row.id)} />
                <Button label="Update" onClick={() => handleUpdate(row.id)} />
            </div>
        );
    };

    return (
        <Fragment>
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
        </Fragment>
    );
};

export default EquiposView;
