import { Formik, Form, Field } from 'formik'; //Libreria formularios
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Alerta from './Alerta';
import Spinner from './Spinner';

function Formulario({ verCliente, cargando }) {
    const navigate = useNavigate(); //Funcion que toma como valor la url a donde queremos redirigir al usuario una vez llene el formulario

    const nuevoClienteSchema = Yup.object().shape({ //Esquema de cliente, obtiene los datos del formulario
        nombre: Yup.string().min(3, 'El nombre es muy corto').max(20, 'El nombre es muy largo').required('El nombre del cliente es obligatorio'),
        empresa: Yup.string().required('El nombre de la empresa es obligatorio'),
        correo: Yup.string().email('Correo no valido').required('El correo es obligatorio'),
        telefono: Yup.number().integer('Numero no valido').positive('Numero no valido').typeError('El número no es válido'),
        notas: ''
    })

    const handleSubmit = async (valores) => { //Siempre que una funcion vaya a recibir o enviar peticiones debe ser async
        try {
            let respuesta;

            if (verCliente.id) { //Existe id de cliente
                const url = `http://localhost:4000/clientes/${verCliente.id}`;
                respuesta = await fetch(url, {
                    method: 'PUT', //Actualizar PUT
                    body: JSON.stringify(valores), //A la url le enviamos a informacion en String
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } else { //Agregando
                const url = "http://localhost:4000/clientes";
                respuesta = await fetch(url, {
                    method: 'POST', //Nuevo registro por POST
                    body: JSON.stringify(valores), //A la url le enviamos a informacion en String
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }

            await respuesta.json(); //Recibimos la respuesta del servidor en JSON
            navigate('/clientes');

        } catch (error) {
            console.log(error);
        }
    }

    return (
        cargando ? <Spinner /> : (
            <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
                <h1 className="text-gray-600 font-bold text-xl uppercase text-center">{verCliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1>
                <Formik initialValues={
                    {//Propiedad initialvalues para state
                        nombre: verCliente.nombre ?? '',
                        empresa: verCliente.empresa ?? '',
                        correo: verCliente.correo ?? '',
                        telefono: verCliente.telefono ?? '',
                        notas: verCliente.notas ?? ''
                    }
                }
                    enableReinitialize={true} //Esto me permite pintar los datos de initialvalues si están presentes desde editar --->Funciona con defaultprops abajo
                    onSubmit={async (values, { resetForm }) => { await handleSubmit(values); resetForm() }/*Values sirve para guardar lo recogido en el formulario*/}
                    validationSchema={nuevoClienteSchema} //Aqui enviamos la variable del handlesubmit para validaciones
                >{/*Aqui cierra etiqueta Formik*/}
                    {({ errors, touched }) => ( //Funcion de flecha para todo el formulario
                        <Form className='mt-10'>
                            <div className='mb-4'>
                                <label className='text-gray-800' htmlFor='nombre'>Nombre:</label>
                                <Field id='nombre' type='text' className='mt-2 block w-full p-3 bg-gray-50' placeholder='Nombre del Cliente' name='nombre' /> {/*Formik -->Form reemplaza etiqueta form de html y tiene las mismas propiedades*/}
                                {errors.nombre && touched.nombre ? ( //Si doy click fuera del campo de texto, con touch me arroja el mensaje
                                    <Alerta>{errors.nombre}</Alerta>
                                ) : (
                                    null
                                )}
                            </div>
                            <div className='mb-4'>
                                <label className='text-gray-800' htmlFor='empresa'>Empresa:</label>
                                <Field id='empresa' type='text' className='mt-2 block w-full p-3 bg-gray-50' placeholder='Empresa del Cliente' name='empresa' /> {/*Formik -->Form reemplaza etiqueta form de html y tiene las mismas propiedades*/}
                                {errors.empresa && touched.empresa ? ( //Si doy click fuera del campo de texto, con touch me arroja el mensaje
                                    <Alerta>{errors.empresa}</Alerta>
                                ) : (
                                    null
                                )}
                            </div>
                            <div className='mb-4'>
                                <label className='text-gray-800' htmlFor='correo'>Correo:</label>
                                <Field id='correo' type='email' className='mt-2 block w-full p-3 bg-gray-50' placeholder='Correo del Cliente' name='correo' /> {/*Formik -->Form reemplaza etiqueta form de html y tiene las mismas propiedades*/}
                                {errors.correo && touched.correo ? ( //Si doy click fuera del campo de texto, con touch me arroja el mensaje
                                    <Alerta>{errors.correo}</Alerta>
                                ) : (
                                    null
                                )}
                            </div>
                            <div className='mb-4'>
                                <label className='text-gray-800' htmlFor='telefono'>Telefono:</label>
                                <Field id='telefono' type='tel' className='mt-2 block w-full p-3 bg-gray-50' placeholder='Telefono del Cliente' name='telefono' /> {/*Formik -->Form reemplaza etiqueta form de html y tiene las mismas propiedades*/}
                                {errors.telefono && touched.telefono ? ( //Si doy click fuera del campo de texto, con touch me arroja el mensaje
                                    <Alerta>{errors.telefono}</Alerta>
                                ) : (
                                    null
                                )}
                            </div>
                            <div className='mb-4'>
                                <label className='text-gray-800' htmlFor='notas'>Notas:</label>
                                <Field as='textarea' id='notas' type='text' className='mt-2 block w-full p-3 bg-gray-50 h-40' placeholder='Notas del Cliente' name='notas' /> {/*as para decirle a Form que tipo de campo quiero*/}
                            </div>
                            <input type='submit' value={verCliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'} className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg' />
                        </Form>
                    )}
                </Formik>
            </div>
        )
    )
}

Formulario.defaultProps = { //En caso de que sea nuevo cliente, retorna el objeto vacio en el state
    verCliente: {},
    cargando: false
}

export default Formulario;