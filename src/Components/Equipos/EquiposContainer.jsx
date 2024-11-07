import { useState, useEffect } from 'react';
import EquiposView from './EquiposView.jsx';

const EquiposContainer = () => {
    const [data, setData] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const token = JSON.parse(localStorage.getItem('token'));

    const getDataEquipo = async () => {
        if (!token) {
            console.log("Token no encontrado");
            setLoadingData(false);
            return;
        }
        try {
            const response = await fetch("http://localhost:5000/equipos", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log("Response status:", response.status); // Verifica el estado de la respuesta
            if (!response.ok) {
                throw new Error("Hubo un error en la consulta");
            }
            const data = await response.json();
            console.log("Data recibida:", data); // Verifica los datos
            setData(data);
        } catch (error) {
            console.log("Theres an error with API:", error.message);
            setData([]);
        } finally {
            setLoadingData(false);
        }
    };
    
    useEffect(() => {
        getDataEquipo();
    }, [token]);

    return (
        <EquiposView loadingData={loadingData} data={data} />
    );
};

export default EquiposContainer;
