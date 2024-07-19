import React from 'react';

function About() {
    return (
        <div className='container mx-auto px-4 py-8'>
            <div className='max-w-3xl mx-auto'>
                <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8'>Sobre Nosotros</h1>
                <div className='mb-8'>
                    <h2 className='text-2xl font-bold mb-4'>Nuestra Historia</h2>
                    <p className='mb-4'>En [Nombre del Restaurante], creemos en el poder de la comida deliciosa para unir a las personas. Nuestro viaje comenzó en el corazón de España con una pasión por los sabores auténticos y un compromiso con un servicio excepcional. Con el paso de los años, hemos construido una reputación por ofrecer platos que hacen agua la boca y capturan la esencia de la cocina española.</p>
                    <p className='mb-4'>Desde tapas tradicionales hasta creaciones innovadoras, cada plato se elabora con cuidado utilizando los mejores ingredientes de productores locales. Nuestra dedicación a la calidad se extiende más allá de la cocina; nos esforzamos por crear experiencias gastronómicas memorables que reflejen la calidez y la hospitalidad de España.</p>
                </div>
                <div className='mb-8'>
                    <h2 className='text-2xl font-bold mb-4'>Nuestra Misión</h2>
                    <p className='mb-4'>Nuestra misión es simple: deleitar a nuestros clientes con sabores irresistibles, un servicio impecable y un ambiente acogedor. Estamos comprometidos a preservar la rica herencia culinaria de España mientras abrazamos la creatividad y la innovación en nuestras ofertas de menú. Ya sea que tengas antojo de paella clásica o estés explorando nuestras especialidades de temporada, te invitamos a saborear el gusto de España con nosotros.</p>
                </div>
                <div>
                    <h2 className='text-2xl font-bold mb-4'>Conoce al Equipo</h2>
                    <p className='mb-4'>Detrás de cada comida deliciosa hay un equipo dedicado de expertos culinarios, profesionales de la hospitalidad y entusiastas apasionados de la comida. Nuestro equipo en [Nombre del Restaurante] está unido por un amor compartido por la cocina española y un compromiso con la excelencia. Desde nuestros talentosos chefs que dan vida a sabores audaces hasta nuestros amables camareros que aseguran que cada experiencia gastronómica sea inolvidable, conoce a las caras detrás de nuestras puertas de cocina.</p>
                </div>
            </div>
        </div>
    );
}

export default About;
