import React, { useContext } from "react";
import { CartContext } from '../../cart/CartContext';

function Cards(props){
    const { onAddToCart } = useContext(CartContext);

    return(
        <>
            <div className="card hover:cursor-pointer">
                <div className="img m-auto flex justify-center items-center text-center rounded-full overflow-hidden w-56">
                    <img src={props.img} alt={props.title} className="max-w-full h-auto rounded-full"/> {/* Add rounded-full to the image */}
                </div>
                <div className="title flex justify-center items-center text-center">
                    <h1>{props.title}</h1>
                </div>
            </div>
        </>
    )
}

export default Cards;
