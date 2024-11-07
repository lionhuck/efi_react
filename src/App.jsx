import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import UsersContainer from './Components/Users/UsersContainer';
import CreateUser from './Components/Users/CreateUsers';
import LoginUser from './Components/Users/LoginUser';
import EquiposContainer from './Components/Equipos/EquiposContainer';
import CreateEquipo from './Components/Equipos/CreateEquipo';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';

function App() {
  const userItems = [
    { label: 'Usuarios', icon: 'pi pi-users', to: '/usuarios' },
    { label: 'Cargar Usuario', icon: 'pi pi-user-plus', to: '/usuarios/nuevo' },
    { label: 'Login', icon: 'pi pi-sign-in', to: '/usuarios/login' },
  ];

  const equipoItems = [
    { label: 'Equipos', icon: 'pi pi-tablet', to: '/equipos' },
    { label: 'Cargar Equipo', icon: 'pi pi-plus', to: '/equipos/nuevo' },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {/* Página de inicio con los botones */}
        <Route path="/" element={<HomePage />} />
        
        {/* Página de Usuarios */}
        <Route path="/usuarios/*" element={<UserPage items={userItems} />} />
        
        {/* Página de Equipos */}
        <Route path="/equipos/*" element={<EquipoPage items={equipoItems} />} />

        {/* Ruta de Página No Encontrada */}
        <Route path="*" element={<h2>Página no encontrada</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

// Página de inicio con dos botones para navegar a Usuarios o Equipos
function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Bienvenido a Celulares LEPAGO</h2>
      <div style={{ marginTop: '20px' }}>
        <Button
          label="Usuarios"
          icon="pi pi-users"
          onClick={() => navigate('/usuarios')}
          style={{ margin: '10px' }}
        />
        <Button
          label="Equipos"
          icon="pi pi-tablet"
          onClick={() => navigate('/equipos')}
          style={{ margin: '10px' }}
        />
      </div>
    </div>
  );
}

// Componente de botón de regreso al home
function HomeButton() {
  const navigate = useNavigate();
  
  return (
    <Button
      label="Celulares LEPAGO"
      className="p-button-text p-button-plain"
      onClick={() => navigate('/')}
      style={{ fontSize: '1.5rem', marginBottom: '20px' }}
    />
  );
}

// Página de opciones de usuarios con su Menubar
function UserPage({ items }) {
  return (
    <>
      <HomeButton />
      <Menubar model={items} />
      <Routes>
        <Route path="/" element={<UsersContainer />} />
        <Route path="nuevo" element={<CreateUser />} />
        <Route path="login" element={<LoginUser />} />
      </Routes>
    </>
  );
}

// Página de opciones de equipos con su Menubar
function EquipoPage({ items }) {
  return (
    <>
      <HomeButton />
      <Menubar model={items} />
      <Routes>
        <Route path="/" element={<EquiposContainer />} />
        <Route path="nuevo" element={<CreateEquipo />} />
      </Routes>
    </>
  );
}

export default App;
