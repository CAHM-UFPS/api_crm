import {useNavigate} from 'react-router-dom';

function Cliente({valores, handleEliminar}) {
    const navigate=useNavigate();

    const {nombre, empresa, correo, telefono, notas, id}=valores;

    return (
        <tr className="border-b hover:bg-gray-50">
            <td className="p-3">{nombre}</td>
            <td className="p-3">
                <p><span className="text-gray-800 uppercase font-bold">Correo: </span>{correo}</p>
                <p><span className="text-gray-800 uppercase font-bold">Telefono: </span>{telefono}</p>
            </td>
            <td className="p-3">{empresa}</td>
            <td className="p-3">
            <button className="bg-yellow-500 hover:bg-yellow-600 block w-full text-white p-2 uppercase font-bold text-xs" type='button' onClick={()=>{navigate(`/clientes/${id}`)}}>Ver</button>
                <button className="bg-blue-600 hover:bg-blue-700 block w-full text-white p-2 uppercase font-bold text-xs mt-3" type='button' onClick={()=>{navigate(`/clientes/editar/${id}`)}}>Editar</button>
                <button className="bg-red-600 hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-xs mt-3" type='button' onClick={()=>{handleEliminar(id)}}>Eliminar</button>
            </td>
        </tr>
    )
}

export default Cliente;