import authContext from './authContext';
import React, {useReducer} from 'react';
import authReducer from './authReducer';
import { 
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LIMPIAR_ALERTA,
    LOGIN_ERROR,
    LOGIN_EXITOSO,
    USUARIO_AUTENTICADO
} from '../../types';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

const AuthState = ({children}) => {

    // Definir un state inicial
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token'): '',
        autenticado: null,
        usuario: null,
        mensaje: null

    }
    // Definir el reducer
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Registrar usuario
    const registrarUsuario =async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data.msg
            });
        } catch(error){
            console.log(error);
            dispatch({
                type: REGISTRO_ERROR,
                payload: error.response.data.msg
            })
        } finally {
            // Limpia la alerta después de 3 segundos
            setTimeout(() => {
                dispatch({
                    type: LIMPIAR_ALERTA
                })
            }, 3000);
        }
    }

    // Autenticar usuario 
    const iniciarSesion = async usuario => {
        try {
            const respuesta = await clienteAxios.post('/api/auth', usuario);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data.token
            })
        }catch (error) {
            console.log(error.response.data.msg);
            dispatch({
                type: LOGIN_ERROR ,
                payload: error.response.data.msg
            })
        } finally {
            // Limpia la alerta después de 3 segundos
            setTimeout(() => {
                dispatch({
                    type: LIMPIAR_ALERTA
                })
            }, 3000);
        }
    }
    // Usuario autenticado
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if(token) {
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            if(respuesta.data.usuario) {
                dispatch({
                    type: USUARIO_AUTENTICADO,
                    payload: respuesta.data.usuario
                })
            }
        } catch (error) {
            console.log(error.response.data.msg);
            dispatch({
                type: LOGIN_ERROR ,
                payload: error.response.data.msg
            })           
        }
    }

    // Cerrar la sesion
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}>
                {children}
        </authContext.Provider>
    )
}

export default AuthState;