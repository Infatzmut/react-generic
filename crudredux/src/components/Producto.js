import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
// Redux
import {useDispatch} from 'react-redux';
import { borrarProducto, obtenerProductoEditar } from "../actions/productoActions";



const Producto = ({producto}) => {
    const {nombre, precio, id} = producto
    const dispatch = useDispatch();
    // habilitar history para redireccion
    const history = useHistory();
    // confirmar si desea elminiarlo
    const confirmarEliminarProducto = id => {
        // preguntar al usuario
        Swal.fire({
            title: 'Estas seguro?',
            text: 'No serás capaz de revertir esto',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it'
        }).then(result =>  {
            if(result.value) {
                dispatch(borrarProducto(id))
                
            }   
        })
    }

    // funcion que redirige de forma programada
    const redireccionarEdicion = producto => {
        dispatch(obtenerProductoEditar(producto));
        history.push(`/productos/editar/${producto.id}`);
    }
    return (
            <tr>
                <td>{nombre}</td>
                <td><span className="font-weight-bold">$ {precio}</span></td>
                <td className="acciones">
                    <button 
                        onClick={()=> redireccionarEdicion(producto)} 
                        className="btn btn-primary mr-2" >
                        Editar
                    </button>
                    <button 
                        type="button"
                        className="btn btn-danger"
                        onClick={()=> confirmarEliminarProducto(id)}>
                            Eliminar
                    </button>
                </td>
            </tr>
        );
}

export default Producto;