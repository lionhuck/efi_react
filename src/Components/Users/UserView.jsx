import { Fragment } from "react"
import { ProgressSpinner } from "primereact/progressspinner"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
        



const UsersView = ({loadingData, data}) => {
    const bodyIsAdmin = (rowData) =>{
        return (
            rowData.is_admin === true ? <span>SI</span> : <span>NO</span>
        )
    }

    const bodyActions = (row) => {
        return(
            <div>
                <Button label="Delete" />
                <Button label="Update"/>
            </div>
        )
    }


    return (
        <Fragment>
        {loadingData ? <ProgressSpinner/> 
        : 
        <DataTable value={data} tableStyle={{ minWidth: '50rem' }}>
            <Column field="nombre" header="Username"></Column>
            <Column field="is_admin" body={bodyIsAdmin} header="Admin"></Column>
            <Column body={bodyActions} header="Botones"></Column>
        </DataTable>
        }
    </Fragment>
    )

}
export default UsersView