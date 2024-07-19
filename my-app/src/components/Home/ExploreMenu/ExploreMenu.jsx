import React, { useContext } from 'react';
import Content from './list.js';
import Cards from './cards';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { CartContext } from '../../cart/CartContext.jsx';
import { Link } from 'react-router-dom';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div className={className} style={{ ...style, display: "block", background: "#9ac300", borderRadius: "50%" }} onClick={onClick} />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div className={className} style={{ ...style, display: "block", background: "#9ac300", borderRadius: "50%" }} onClick={onClick} />
    );
}

function ExploreMenu() {
    const { addToCart } = useContext(CartContext);

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true, // Enable autoplay
        autoplaySpeed: 2000, // Set autoplay speed to 2 seconds
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
    return (
        <div className='text-center'>
            <h1 className='pb-3 border-b-8 border-green-900 inline-block text-5xl font-bold mt-20 font-[roboto]'>Explore Menu</h1>
            <Slider {...settings} className='w-full md:w-[80%] m-auto gap-10 mt-20'>

                    {Content.map(status => (
                        <Link to='/menu'><Cards
                            key={status.id}
                            img={status.img}
                            title={status.title}
                            onAddToCart={() => addToCart({ id: status.id, img: status.img, title: status.title, price: status.price, count: 1 })}
                        /></Link>
                    ))}
            </Slider>
        </div>
    );
}

export default ExploreMenu;
