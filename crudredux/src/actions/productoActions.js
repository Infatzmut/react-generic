import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODCUTOS,
    DESCARGA_PRODUCTOS_ERROR,
    DESCARGA_PRODUCTOS_EXITO,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINAR_EXITO,
    PRODUCTO_ELIMINAR_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR,
    COMENZAR_EDICION_PRODUCTO
} from '../types'
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

// Crear nuevos productos
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch(agregarProducto(true));

        try {
            // Insertar en la API
            await clienteAxios.post('/productos', producto)
            //Si todo sale bien, actualizar el state
            dispatch(agregarProductoExito(producto))    
            // Alerta
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            )
        } catch(error) {
            console.log(error);
            // si no sale bien, cambiar el state
            dispatch(agregarProductoError(true))

            // Alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta denuevo'
            })
        }
    }
}

const agregarProducto = estado =>  ({
    type: AGREGAR_PRODUCTO,
    payload: estado
})

// si el producto se guarda en la base de datos
const agregarProductoExito = producto => ({
    type:AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

// Si hubo un error
const agregarProductoError = estado => ({
    type:AGREGAR_PRODUCTO_ERROR,
    payload: estado
})

// Función que descarga los productos de la base de datos
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch(descargarProductos(true));

        try {
            const respuesta = await clienteAxios.get('/productos');
            dispatch(descargaProductosExitosa(respuesta.data))
        }catch(error){
            console.log(error);
            dispatch(descargaProductosError());
        }
    }
}

const descargarProductos = (estado) => ({
    type: COMENZAR_DESCARGA_PRODCUTOS,
    payload: estado
})

const descargaProductosExitosa = (productos) => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})

// Selecciona y elminina el producto
export function borrarProducto (id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id));
        try {
            clienteAxios.delete(`/productos/${id}`);
            dispatch(eliminarProductoExito());
            Swal.fire(
                'Eliminado',
                'EL producto se eliminó satisfactoriamente',
                'success'
            )
        }catch(error) {
            console.log(error);
            dispatch(eliminarProductoError())
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINAR_EXITO
})

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINAR_ERROR
})

// Colocar producto en edición
export function obtenerProductoEditar(producto) {
    return (dispatch) => {
        dispatch(obtenerProductosEditarAction(producto))
    }
}

const obtenerProductosEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

export function editarProductoAction(producto) {
    return async (dispatch) => {
        dispatch(editarProducto());
        try {
            clienteAxios.put(`/productos/${producto.id}`, producto)
            dispatch(editarProductoExito(producto));
        }catch(error) {
            console.log(error);
            dispatch(editarProductoError())
        }
    }
}

const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO
})

const editarProductoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
})

const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
})