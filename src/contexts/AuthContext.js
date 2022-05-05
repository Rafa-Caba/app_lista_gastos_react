import { onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { auth } from './../firebase/firebaseConfig';

// Creamos el Contexto
const AuthContext = React.createContext();

// Hook para acceder al contexto
const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
    const [usuario, cambiarUsuario] = useState();

    // Creamos un state para saber cuando termina de 
    // cargar la comprobacion de onAuthStateChanged
    const [cargando, cambiarCargando] = useState(true);

    // Este es el efecto que ejecutara la comprobacio de sesion una sola vez
    useEffect(() => {
        // Comprobamos si hay usuario
        const cancelarSubscripcion = onAuthStateChanged(auth, (usuario) => {
            cambiarUsuario(usuario);
            cambiarCargando(false);
        });

        return cancelarSubscripcion;
    }, []);

    return (
        <AuthContext.Provider value={{ usuario: usuario }}>
            { !cargando && children }
        </AuthContext.Provider>
    );
}

export { AuthProvider, AuthContext, useAuth };