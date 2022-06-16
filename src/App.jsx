import { BrowserRouter, Routes, Route} from 'react-router-dom'; //Implementacion de dependencia react-router-dom
import Layout from './layout/Layout';
import Inicio from './paginas/Inicio';
import NuevoCliente from './paginas/NuevoCliente';
import EditarCliente from './paginas/EditarCliente';
import VerCliente from './paginas/VerCliente';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/clientes' element={<Layout />}>
            <Route index element={<Inicio />} /> {/*Atributo index para inyectar el codigo html*/}
            <Route path='nuevo' element={<NuevoCliente />} />
            <Route path='editar/:id' element={<EditarCliente />} /> {/*/:id -->Placeholder*/}
            <Route path=':id' element={<VerCliente />} /> {/*:id -->Trata id como si fuera variable*/}
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
