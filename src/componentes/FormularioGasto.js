import React, { useEffect, useState } from 'react';
import Boton from '../elementos/Boton';
import { ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton } from './../elementos/ElementosDeFormulario';
import { ReactComponent as IconoPlus } from './../imagenes/plus.svg';
import SelectCategorias from './SelectCategorias';
import DatePicker from './DatePicker';
import agregarGasto from '../firebase/agregarGasto';
import getUnixTime from 'date-fns/getUnixTime';
import fromUnixTime from 'date-fns/fromUnixTime';
import { useAuth } from './../contexts/AuthContext';
import Alerta from './../elementos/Alerta';
import { useNavigate } from 'react-router-dom';
import editarGasto from './../firebase/editarGasto';

const FomularioGasto = ({ gasto }) => {
    const [descripcion, cambiarDescripcion] = useState('');
    const [inputCantidad, cambiarInputCantidad] = useState('');
    const [categoria, cambiarCategoria] = useState('hogar');
    const [fecha, cambiarFecha] = useState(new Date());
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState({});
    const navigate = useNavigate();

    const { usuario } = useAuth();

    useEffect(() => {
        // Comprobamos si hay algun gasto
        // De ser asi establecemos todo el state con los valores del gasto
        if (gasto) {
            // Comprobamos que el gasto sea del usuario actual
            // Para eso comprobamos el uid del usuario con el guardado en el gasto
            if (gasto.data().uidUsuario === usuario.uid) {
                cambiarCategoria(gasto.data().categoria);
                cambiarFecha(fromUnixTime(gasto.data().fecha));
                cambiarDescripcion(gasto.data().descripcion);
                cambiarInputCantidad(gasto.data().cantidad);
            } else {
                navigate('/lista');
            }
        }
    }, [gasto, usuario, navigate]);

    const handleChange = (e) => {
        if (e.target.name === 'descripcion') {
            cambiarDescripcion(e.target.value);
        } else if (e.target.name === 'cantidad') {
            cambiarInputCantidad(e.target.value.replace(/[^0-9.]/g, ''));
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();  
        let cantidad = parseFloat(inputCantidad).toFixed(2);

        // Comprobamos que haya una descripcion y valor
        if (descripcion !== '' && inputCantidad !== '') {

            // Comprobamos que haya una cantidad
            if (cantidad) {
                if (gasto) {
                    try {
                        editarGasto({
                            id: gasto.id,
                            categoria, 
                            descripcion, 
                            cantidad, 
                            fecha: getUnixTime(fecha)
                        });

                        navigate('/lista');
                    } catch (e) {
                        console.log(e);
                    }                     
                } else {
                    try {
                        agregarGasto({ 
                            categoria, 
                            descripcion, 
                            cantidad, 
                            fecha: getUnixTime(fecha),
                            uidUsuario: usuario.uid
                        });
        
                        cambiarCategoria('hogar');
                        cambiarDescripcion('');
                        cambiarInputCantidad('');
                        cambiarFecha(new Date());
        
                        cambiarEstadoAlerta(true);
                        cambiarAlerta({ tipo: 'exito', mensaje: 'Gasto fue agregado correctamente.' });
                    } catch (e) {
                        cambiarEstadoAlerta(true);
                        cambiarAlerta({ tipo: 'error', mensaje: 'Hubo un problema al intentar guardar el Gasto' });
                    }
                }
            } else {
                cambiarEstadoAlerta(true);
                cambiarAlerta({ tipo: 'error', mensaje: 'El valor que ingresaste no es correcto.' });
            }

        } else {
            cambiarEstadoAlerta(true);
            cambiarAlerta({ tipo: 'error', mensaje: 'Por favor rellena todos los campos.' });
        }

    }

    return (
        <Formulario onSubmit={handleSubmit}>
            <ContenedorFiltros>
                <SelectCategorias 
                    categoria={categoria}
                    cambiarCategoria={cambiarCategoria}
                />
                
                <DatePicker 
                    fecha={fecha}
                    cambiarFecha={cambiarFecha}
                />
            </ContenedorFiltros>

            <div>
                <Input 
                    type="text"
                    name="descripcion"
                    placeholder="Descripcion"
                    value={descripcion}
                    onChange={handleChange}
                />
                <InputGrande 
                    type="text"
                    name="cantidad"
                    placeholder="$0.00"
                    value={inputCantidad}
                    onChange={handleChange}
                />
            </div>
            <ContenedorBoton>
                <Boton as="button" primario conIcono type="submit">
                    {gasto ? 'Editar Gasto' : 'Agregar Gasto'} <IconoPlus />
                </Boton>
            </ContenedorBoton>
            <Alerta 
                tipo={alerta.tipo}
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                cambiarEstadoAlerta={cambiarEstadoAlerta}
            />
        </Formulario>
    );
}
 
export default FomularioGasto;

