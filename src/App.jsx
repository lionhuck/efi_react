import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import UsersContainer from './Components/Users/UsersContainer'
import { Menubar } from 'primereact/menubar';
import CreateUser from './Components/Users/CreateUsers'
import LoginUser from './Components/Users/LoginUser'
import CreateEquipo from './Components/Equipos/CreateEquipo';
function App() {
  const items = [
    {label: 'Usuarios', icon:'pi pi-users', url:'/usuarios'},
    {label: 'CargarUsuario', icon:'pi pi-users', url:'/nuevo-usuario'},
    {label: 'Login', icon:'pi pi-users', url:'/inicio-sesion'},
    {label: 'Equipos', icon:'pi pi-users', url:'/nuevo-equipo'},    
  ]
  return (
    <BrowserRouter>
      <Menubar model={items} /> 
      <h1>Celulares LEPAGO</h1>
      <Routes>
        <Route path='/usuarios' element={<UsersContainer/>}></Route>
        <Route path='/nuevo-usuario' element={<CreateUser/>}></Route>
        <Route path='/inicio-sesion' element={<LoginUser/>}></Route>
        <Route path='/nuevo-equipo' element={<CreateEquipo/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
