import React from 'react';
import logo from './imgs/logo.png';
import playstore from './imgs/download-1.png';
import appstore from './imgs/download-2.png';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

function Footer() {
    return (
        <div className="footer bg-green-900 text-white p-10">
            <div className="top flex flex-col lg:flex-row justify-center items-center lg:items-start">
                <div className="logo mb-5 lg:mb-0">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="social flex justify-center lg:justify-start">
                    <h1 className='text-4xl ml-3 lg:ml-8 hover:cursor-pointer hover:text-greenyellow'><FaFacebook /></h1>
                    <h1 className='text-4xl ml-3 lg:ml-8 hover:cursor-pointer hover:text-greenyellow'><FaTwitter /></h1>
                    <h1 className='text-4xl ml-3 lg:ml-8 hover:cursor-pointer hover:text-greenyellow'><IoLogoWhatsapp /></h1>
                </div>
            </div>
            <div className="bottom flex flex-col lg:flex-row justify-between mt-10 lg:px-20 md:px-10">
                <div className="about mb-5 lg:mb-0">
                    <ul className="list-none">
                        <li><Link to='/about' className='text-2xl font-bold hover:cursor-pointer hover:text-greenyellow'>Sobre nosotras</Link></li>
                        <li><Link to='/privacy' className='text-xl hover:cursor-pointer hover:text-greenyellow'>política de privacidad</Link></li>
                        <li><Link to='/feedback' className='text-xl hover:cursor-pointer hover:text-greenyellow'>
                        Comentario</Link></li>
                    </ul>
                </div>
                <div className="contact mb-5 lg:mb-0">
                    <ul className="list-none">
                        <li><Link to="/contact" className='text-2xl font-bold hover:cursor-pointer hover:text-greenyellow'>Contacta con nosotras</Link></li>
                        <li><a href="https://www.google.com/maps/place/40%C2%B029'12.6%22N+3%C2%B021'01.3%22W/@40.4868355,-3.3529413,17z/data=!3m1!4b1!4m4!3m3!8m2!3d40.4868355!4d-3.3503664?entry=ttu"
                            className='text-xl hover:cursor-pointer hover:text-greenyellow'>
Localizadora de tiendas</a></li>
                        <li><Link to='/terms' className='text-xl hover:cursor-pointer hover:text-greenyellow'>
                        Términos y condiciones</Link></li>
                    </ul>
                </div>
                <div className="app flex justify-center lg:justify-end">
                    <img src={playstore} alt="Play Store" className='h-10 mb-5 lg:mb-0 lg:mr-5 hover:cursor-pointer' />
                    <img src={appstore} alt="App Store" className='h-10 hover:cursor-pointer' />
                </div>
            </div>
        </div>
    );
}

export default Footer;
