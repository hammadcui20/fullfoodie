import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Order({ onCompleteOrder, onDeleteOrder }) {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3); // Change this value to adjust items per page

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const api=import.meta.env.VITE_APP_URL;
                const response = await axios.get(`${api}/orders/getorder`);
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    // Logic to paginate orders
    const indexOfLastOrder = currentPage * itemsPerPage;
    const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const handleCompleteOrder = async (orderId) => {
        try {
            const api=import.meta.env.VITE_APP_URL;
            await axios.patch(`${api}/orders/updateorder`, { orderstatus: 'Completed', orderId });
            setOrders(prevOrders => prevOrders.map(order => order._id === orderId ? { ...order, orderstatus: 'Completed' } : order));
        } catch (error) {
            console.error('Error completing order:', error);
        }
    };

    const handleDeleteOrder = async (orderId) => {
        try {
            console.log(orderId);
          
            const api=import.meta.env.VITE_APP_URL;
            await axios.delete(`${api}/orders/deleteorder`, { data: { orderId } });
            setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Pedidos</h2>
            <div className="mb-4">
                <ul>
                    {currentOrders.map((order) => (
                        <li key={order._id} className="mb-4">
                            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                                <div>
                                    <p className="text-lg font-semibold">{order.menu_item_id}</p>
                                    <p className="text-gray-700">Precio: ${order.price}</p>
                                    <p className="text-gray-700">Estado: {order.orderstatus}</p>
                                    <p className="text-gray-700">Dirección: {order.address}</p>
                                    <p className="text-gray-700">Número de Teléfono: {order.phoneNumber}</p>
                                </div>
                                <div>
                                    <button onClick={() => handleCompleteOrder(order._id)} className="bg-green-500 text-white py-1 px-3 rounded-lg mr-2">Completar</button>
                                    <button onClick={() => handleDeleteOrder(order._id)} className="bg-red-500 text-white py-1 px-3 rounded-lg">Eliminar</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Pagination controls */}
            <div className="flex justify-center">
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="bg-blue-500 text-white py-1 px-3 rounded-lg mr-2">Anterior</button>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastOrder >= orders.length} className="bg-blue-500 text-white py-1 px-3 rounded-lg">Siguiente</button>
            </div>
        </div>
    );
}

export default Order;
