import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Formulario from "../components/Formulario";

function EditarCliente() {
    const [verCliente, setVerCliente] = useState({});
    const [cargando, setCargando] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setCargando(!cargando);
        const obtenerCliente = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}`;
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();
                setVerCliente(resultado);
            } catch (error) {
                console.log(error);
            }
            setCargando(false); //Una vez finalice la carga de los resultados , 5000
        }

        obtenerCliente();
    }, []);

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
            <p>Formulario para editar datos del cliente</p>
            {verCliente?.nombre ?(
                <Formulario
                    verCliente={verCliente}
                    cargando={cargando}
                />) : (<p>El cliente a editar NO existe</p>)
            }
        </>
    )
}

export default EditarCliente;