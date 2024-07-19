import React, { useState, useEffect } from 'react';
import { CiLocationOn } from "react-icons/ci";
import { TfiMenuAlt } from "react-icons/tfi";
import { Link } from 'react-router-dom';

function SideBar({ isVisible }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Verificar si existe el token en el almacenamiento local
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        // Eliminar el token del almacenamiento local
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        // Actualizar la página
        window.location.reload();
    };

    return (
        <div className={`SideBar pt-10 w-50% overflow-scroll lg:overflow-hidden sm:w-40% md:w-40% lg:w-20% bg-white top-0 h-full fixed z-10 ${isVisible ? '' : 'hidden'}`}>
            <div className="btn ml-10 pb-5">
                {isLoggedIn ? (
                    <button 
                        className='py-3 px-6 bg-green-900 text-white text-xl rounded-xl hover:cursor-pointer hover:bg-darkgreen' 
                        onClick={handleLogout}
                    >
                        Cerrar sesión
                    </button>
                ) : (
                    <Link to='/login'>
                        <button className='py-3 px-6 bg-green-900 text-white text-xl rounded-xl hover:cursor-pointer hover:bg-darkgreen'>
                            Iniciar sesión
                        </button>
                    </Link>
                )}
            </div>
            <div className="customer border-y-2 border-black py-10 px-5">
                <ul className='list-none'>
                    <Link to="https://www.google.com/maps/place/40%C2%B029'12.6%22N+3%C2%B021'01.3%22W/@40.4868355,-3.3529413,17z/data=!3m1!4b1!4m4!3m3!8m2!3d40.4868355!4d-3.3503664?entry=ttu">
                    <li className='mt-5 lg:text-2xl md:text-md font-medium flex hover:cursor-pointer hover:text-darkgreen'>
                        <CiLocationOn className='lg:text-3xl md:text-md mr-5'/> 
                        Ubicación de la tienda
                    </li></Link>
                    <Link to="/menu">
                        <li className='mt-5 lg:text-2xl md:text-md font-medium flex hover:cursor-pointer hover:text-darkgreen'>
                            <TfiMenuAlt className='lg:text-3xl md:text-md mr-5'/> 
                            Explorar menú
                        </li>
                    </Link>
                </ul>
            </div>
            <div className="about-us py-10 px-5">
                <ul className='list-none'>
                    <Link to='/about'>
                        <li className='mt-5 text-xl font-medium hover:cursor-pointer hover:text-darkgreen inline-block'>
                            Sobre nosotros
                        </li>
                    </Link><br />
                    <Link to='/feedback'>
                        <li className='mt-5 text-xl font-medium hover:cursor-pointer hover:text-darkgreen inline-block'>
                            Comentarios
                        </li>
                    </Link><br />
                    <Link to='/terms'>
                        <li className='mt-5 text-xl font-medium hover:cursor-pointer hover:text-darkgreen inline-block'>
                            Términos y condiciones
                        </li>
                    </Link><br />
                    <Link to='/privacy'>
                        <li className='mt-5 text-xl font-medium hover:cursor-pointer hover:text-darkgreen inline-block'>
                            Política de privacidad
                        </li>
                    </Link><br />
                    <Link to='/contact'>
                        <li className='mt-5 text-xl font-medium hover:cursor-pointer hover:text-darkgreen inline-block'>
                            Contáctenos
                        </li>
                    </Link><br />
                </ul>
            </div>
        </div>
    );
}

export default SideBar;
