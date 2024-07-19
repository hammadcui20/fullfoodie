import React, { useState } from 'react';
import Menu from './Menu';
import Deals from './Deals';
import Order from './Order';
import LoginAdmin from './LoginAdmin';

function Admin() {
  const [activeSection, setActiveSection] = useState('Menu');
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('adminToken') !== null);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
  };

  const [orders, setOrders] = useState([
    {
      id: 1,
      address: '123 Calle Principal',
      phoneNumber: '555-1234',
      items: ['Pizza', 'Hamburguesa'],
      completed: false
    },
    {
      id: 2,
      address: '456 Calle Olmo',
      phoneNumber: '555-5678',
      items: ['Ensalada', 'Papas Fritas'],
      completed: false
    }
  ]);

  const renderSection = () => {
    switch (activeSection) {
      case 'Menu':
        return <Menu />
      case 'Deals':
        return <Deals />
      case 'Order':
        return <Order orders={orders} onCompleteOrder={handleCompleteOrder} onDeleteOrder={handleDeleteOrder} />;
      default:
        return null;
    }
  };

  const handleCompleteOrder = (orderId) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, completed: true } : order
    );
    setOrders(updatedOrders);
  };

  const handleDeleteOrder = (orderId) => {
    const updatedOrders = orders.filter(order => order.id !== orderId);
    setOrders(updatedOrders);
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="flex h-screen bg-gray-100">
          <div className="w-1/4 bg-white shadow-lg">
            <ul className="space-y-4 p-6">
              <li 
                className={`cursor-pointer p-2 rounded ${activeSection === 'Menu' ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'}`} 
                onClick={() => setActiveSection('Menu')}
              >
                Menú
              </li>
              <li 
                className={`cursor-pointer p-2 rounded ${activeSection === 'Deals' ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'}`} 
                onClick={() => setActiveSection('Deals')}
              >
                Ofertas
              </li>
              <li 
                className={`cursor-pointer p-2 rounded ${activeSection === 'Order' ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'}`} 
                onClick={() => setActiveSection('Order')}
              >
                Pedidos
              </li>
              <li 
                className="cursor-pointer p-2 rounded bg-red-500 text-white"
                onClick={handleLogout}
              >
                Cerrar sesión
              </li>
            </ul>
          </div>

          <div className="w-3/4 p-6">
            {renderSection()}
          </div>
        </div>
       ): (
        <LoginAdmin onLogin={handleLogin} />
      )
}</>
  );
}

export default Admin;
