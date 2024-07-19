import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [error, setError] = useState(''); // Estado de error
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('fname', firstname);
        formData.append('lname', lastname);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('gender', gender);

        try {
            const api=import.meta.env.VITE_APP_URL;
            const response = await axios.post(`${api}/user/newuser`, formData);

            // Limpiar el formulario y el estado de error
            setFirstname('');
            setLastname('');
            setEmail('');
            setPassword('');
            setGender('');
            setError('');

            // Redirigir al carrito y actualizar la página
            navigate('/cart');
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data.msg === 'User already exists') {
                setError('El usuario ya existe. Por favor, utiliza un correo electrónico diferente.');
            } else {
                console.error('Error:', error);
                setError('Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.');
            }
        }
    };

    return (
        <div className="login text-left my-20 mx-auto max-w-xl bg-darkgreen p-10 rounded-md">
            <h1 className="text-4xl font-bold text-white mb-6">Registro</h1>
            {error && <div className="mb-4 text-red-500">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="first-name" className="text-white">Nombre</label>
                        <input
                            type="text"
                            name="firstname"
                            id="first-name"
                            placeholder="Ingresa tu nombre"
                            className="p-1 ml-5 border-2 border-green-600 rounded-md w-full"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="last-name" className="text-white">Apellido</label>
                        <input
                            type="text"
                            name="lastname"
                            id="last-name"
                            placeholder="Ingresa tu apellido"
                            className="p-1 ml-5 border-2 border-green-600 rounded-md w-full"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mt-5">
                    <label htmlFor="email" className="text-white">Correo Electrónico</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Ingresa tu correo electrónico"
                        className="p-1 ml-5 border-2 border-green-600 rounded-md w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mt-5">
                    <label htmlFor="password" className="text-white">Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="p-1 ml-5 border-2 border-green-600 rounded-md w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mt-5">
                    <label htmlFor="gender" className="text-white">Género</label>
                    <div>
                        <input
                            type="radio"
                            value="male"
                            name="gender"
                            id="male"
                            className="ml-5"
                            checked={gender === 'male'}
                            onChange={() => setGender('male')}
                        />
                        <label htmlFor="male" className="text-white ml-2">Masculino</label>
                        <input
                            type="radio"
                            value="female"
                            name="gender"
                            id="female"
                            className="ml-5"
                            checked={gender === 'female'}
                            onChange={() => setGender('female')}
                        />
                        <label htmlFor="female" className="text-white ml-2">Femenino</label>
                    </div>
                </div>
                <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded mt-8 w-full">Registrarse</button>
            </form>
        </div>
    );
}

export default SignUp;
