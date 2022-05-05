import React from 'react';
import { Helmet } from 'react-helmet';
import { ContenedorBotones, ContenedorHeader, Header, Titulo } from './elementos/Header';
import Boton from './elementos/Boton';
import BotonCerrarSesion from './elementos/BotonCerrarSesion';
import FomularioGasto from './componentes/FormularioGasto';
import BarraTotalGastado from './componentes/BarraTotalGasado';

const App = () => {
  return (
    <>
      <Helmet>
        <title>Agregar Gasto</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Agregar Gasto</Titulo>
          <ContenedorBotones>
            <Boton to="/categorias">Categorias</Boton>
            <Boton to="/lista">Lista de Gastos</Boton>
            <BotonCerrarSesion />
          </ContenedorBotones>
        </ContenedorHeader>
      </Header>

      <FomularioGasto />
      <BarraTotalGastado />
    </>
  );
}
 
export default App;