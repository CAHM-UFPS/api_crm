import { useState, useEffect } from 'react';
import Cliente from '../components/Cliente';

function Inicio() {
    const [clientes, setClientes] = useState([]);

    useEffect(() => { //Luego de que el componente esté listo
        const obtenerClientes = async () => {
            try {
                const url = 'http://localhost:4000/clientes';
                const respuesta = await fetch(url); //Por defecto trae del metodo GET
                const resultado = await respuesta.json();
                setClientes(resultado);
            } catch (error) {
                console.log(error);
            }
        }

        obtenerClientes();
    }, [])

    //Para eliminar cliente
    const handleEliminar = async (id) => {
        const confirmar = confirm("¿Desea eliminar este cliente?");

        if (confirmar) {
            try {
                const url = `http://localhost:4000/clientes/${id}`;
                const respuesta = await fetch(url, {
                    method: 'DELETE', //Eliminar DELETE
                });
                await respuesta.json();

                const arrayClientes=clientes.filter((valores)=>{
                    return valores.id!==id; //Me trae todos los clientes que no se han eliminado
                })

                setClientes(arrayClientes);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
            <p>Administra tus Clientes</p>
            <table className='w-full mt-5 table-auto shadow bg-white'>
                <thead className='bg-blue-800 text-white'>
                    <tr>
                        <th className='p-2'>Nombre</th>
                        <th className='p-2'>Contacto</th>
                        <th className='p-2'>Empresa</th>
                        <th className='p-2'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((valores) => (
                        <Cliente
                            key={valores.id}
                            valores={valores}
                            handleEliminar={handleEliminar}
                        />
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Inicio;