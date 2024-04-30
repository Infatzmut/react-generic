import React, {useReducer} from 'react';
import {
    SUBIR_ARCHIVO,
SUBIR_ARCHIVO_EXITO,
SUBIR_ARCHIVO_ERROR,
CREAR_ENLACE_EXITO,
CREAR_ENLACE_ERROR,
AGREGAR_PASSWORD,
LIMPIAR_ALERTA,
} from '../../types';
import appReducer from './appReducer';
import appContext from './appContext';
import clienteAxios from '../../config/axios';

const AppState = ({children}) => {

    const initialState = {
        mensaje_archivo : '',
        nombre: '',
        nombre_original: '',
        cargando: null,
        descargas: 1,
        password: '',
        autor: null,
        url: ''
    }

    // crear dispatch y state
    const [state, dispatch] = useReducer(appReducer, initialState);

    // Muestra una alerta
    const mostrarAlerta = msg => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: msg
        });
        setTimeout(()=> {
            dispatch({
                type: LIMPIAR_ALERTA,
            })
        })
    }

    // Sube los archivos al servidor
    const subirArchivo = async (formData, nombreArchivo) => {
        dispatch({
            type: SUBIR_ARCHIVO
        });
        try {
            const respuesta = await clienteAxios.post('/api/archivos', formData);
            dispatch({
                type: SUBIR_ARCHIVO_EXITO,
                payload: {
                    nombre: respuesta.data.archivo,
                    nombre_original: nombreArchivo
                }
            })
        }catch(error) {
            dispatch({
                type: SUBIR_ARCHIVO_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    // Crea un enlace una vez que se subio un archivo 
    const crearEnlace = async () => {
        const data = {
            nombre: state.nombre,
            nombre_original: state.nombre_original,
            descargas: state.descargas,
            password: state.password,
            autor: state.autor
        }

        try {  
            const resultado = await clienteAxios.post('/api/enlaces', data)
            dispatch({
                type: CREAR_ENLACE_EXITO,
                payload: resultado.data.msg
            })
        }catch (error) {
            console.log(error.response.data);
        }
    }

    const limpiarState = () => {
        dispatch({
            type:LIMPIAR_STATE
        })
    }

    const agregarPassword = (password) => {
        dispatch({
            type: AGREGAR_PASSWORD,
            payload: password
        })
    }

    const agregarDescargas = descargas => {
        dispatch({
            type: AGREGAR_DESCARGAS,
            payload: descargas
        })
    }
    
    return (
        <appContext.Provider
            value={{
                mensaje_archivo: state.mensaje_archivo,
                nombre: state.nombre,
                nombre_original: state.nombre_original,
                cargando: state.cargando,
                descargas: state.descargas,
                password: state.password,
                autor: state.autor,
                url: state.url,
                mostrarAlerta,
                subirArchivo,
                limpiarState,
                agregarPassword
            }}
        >
            {{children}}
        </appContext.Provider>
    )
}

export default AppState;

