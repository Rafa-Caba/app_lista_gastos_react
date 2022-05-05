import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import WebFont from 'webfontloader';
import Contenedor from './elementos/Contenedor';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IniciarSesion from './componentes/InicioSesion';
import RegistroUsuarios from './componentes/RegistroUsuarios';
import GastosPorCategoria from './componentes/GastosPorCategoria';
import ListaDeGastos from './componentes/ListaDeGastos';
import EditarGasto from './componentes/EditarGasto';
import { Helmet } from 'react-helmet';
import favicon from './imagenes/logo.png'
import Fondo from './elementos/Fondo'
import { AuthProvider } from './contexts/AuthContext';
import RutaPrivada from './componentes/RutaPrivada';
import { TotalGastadoProvider } from './contexts/TotalGastadoEnElMesContext';

WebFont.load({
  google: {
    families: ['Work Sans:400,500,700', 'sans-serif']
  }
});


const Index = () => {
  return (
    <>
      <Helmet>
        <link rel="icon" href={favicon} type="image/x-icon" />
      </Helmet>
      <AuthProvider>
        <TotalGastadoProvider>
          <BrowserRouter>
            <Contenedor>
              <Routes>
                <Route path="/iniciar-sesion" element={<IniciarSesion />} />
                <Route path="/crear-cuenta" element={<RegistroUsuarios />} />
                
                <Route path="/categorias" element={
                  <RutaPrivada >
                    <GastosPorCategoria />
                  </RutaPrivada>
                }/>

                <Route path="/lista" element={
                  <RutaPrivada>
                    <ListaDeGastos />
                  </RutaPrivada>
                }/>

                <Route path="/editar/:id" element={
                  <RutaPrivada>
                    <EditarGasto />
                  </RutaPrivada>
                }/>

                <Route path="/" element={
                  <RutaPrivada>
                    <App />
                  </RutaPrivada>
                }/>
              </Routes>
            </Contenedor>
          </BrowserRouter>
        </TotalGastadoProvider>
      </AuthProvider>
      <Fondo />
    </>
  );
}

ReactDOM.render(<Index />, document.getElementById('root'));