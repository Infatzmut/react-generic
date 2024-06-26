import React, {useContext, useEffect} from 'react';
import Link from 'next/Link';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';
import {useRouter} from 'next/router';
const Header = () => {

    const router = useRouter();
    const AuthContext = useContext(authContext);
    const { usuarioAutenticado, usuario, cerrarSesion } = AuthContext;
    
    // context de la aplicación
    const AppContext = useContext(appContext);
    const { limpiarState } = AppContext;
    useEffect(()=> {
        usuarioAutenticado();
    }, []);

    const redireccionar = () => {
        router.push('/');
        limpiarState();
    }

    return (
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
                <img 
                    onClick={() => redireccionar()}
                    className="w-64 mb-8 md:mb-0 cursor-pointer" src="logo.svg"/>
            <div>
                {
                    usuario ? (
                        <div className="flex items-center">
                        <p className="mr-2"> Hola {usuario.nombre}</p>
                        <button 
                            type="button"
                            onClick={()=> cerrarSesion()}
                            className="bg-black-500 px-5 py-3 rounded text-white font-bold uppercase">
                            Cerrar sesión
                        </button>
                        </div>
                    ): (
                        <>
                        <Link href="/login">
                            <a className="bg-red-500 px-5 py-3 rounded text-white font-bold uppercase mr-2">Iniciar Sesión</a>
                        </Link>
                        <Link href="/crearcuenta">
                            <a className="bg-black-500 px-5 py-3 rounded text-white font-bold uppercase">Crear cuenta</a>
                        </Link>
                        </>
                    )
                }
                
            </div>
        </header>        
    );
}

export default Header;