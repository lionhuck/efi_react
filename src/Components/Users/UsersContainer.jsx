import {useState, useEffect} from 'react'
import UsersView from './UserView.jsx';
        

const UsersContainer = () =>{
    const [data,setData] = useState([]),
    [loadingData,setLoadingData] = useState(true);
    const token = JSON.parse(localStorage.getItem('token'))
    const getDataUser = async () => {
        if (!token) {
            console.log("Token no encontrado");
            setLoadingData(false);
            return;
        }
        try{
            
        const response = await fetch("http://localhost:5000/users",{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        if(!response.ok) {
            console.log("Hubo un error en la consulta")
        }
        const data = await response.json()
        setData(data)
    }catch{
        console.log("There`s an error with API")
    }
    finally{
        setLoadingData(false)
    }
}
useEffect(()=>{
    getDataUser()
    },[])
    return(
        <UsersView loadingData={loadingData} data={data}/>
    )

}    


export default UsersContainer