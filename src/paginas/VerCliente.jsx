import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; //Leer parametros del enlace
import Spinner from '../components/Spinner';

function VerCliente() {
    const { id } = useParams();
    const [verCliente, setVerCliente] = useState({});
    const [cargando, setCargando] = useState(false);

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
        cargando ? <Spinner /> : Object.keys(verCliente).length === 0 ? (<p>Sin Resultados</p>) : (

            <div>
                <>
                    <h1 className="font-black text-4xl text-blue-900">Ver Cliente: {verCliente.nombre}</h1>
                    <p>Información del cliente</p>
                    <p className='text-gray-600 text-2xl mt-10'><span className='uppercase font-bold'>Cliente: </span>{verCliente.nombre}</p>
                    <p className='text-gray-600 text-2xl mt-4'><span className='uppercase font-bold'>Empresa: </span>{verCliente.empresa}</p>
                    <p className='text-gray-600 text-2xl mt-4'><span className='uppercase font-bold'>Correo: </span>{verCliente.correo}</p>
                    {verCliente.telefono && <p className='text-gray-600 text-2xl mt-4'><span className='uppercase font-bold'>Telefono: </span>{verCliente.telefono}</p>}
                    {verCliente.notas && <p className='text-gray-600 text-2xl mt-4'><span className='uppercase font-bold'>Cliente: </span>{verCliente.notas}</p>}
                </>
            </div>
        )
    )
}

export default VerCliente;