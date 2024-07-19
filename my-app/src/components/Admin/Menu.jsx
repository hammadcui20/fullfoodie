import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import addToCart from './menu';

function Menu() {
  const [cards, setCards] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "categories":
        setSelectedCategory(value);
        break;
      case "file":
        setFile(e.target.files[0]);
        break;
      default:
        break;
    }
  };

  const addCard = () => {
    if (name && description && price && selectedCategory && file) {
      const reader = new FileReader();
      reader.onload = () => {
        const path = reader.result;
        setCards([...cards, { name, description, price, categories: selectedCategory, file, path }]);
        setName('');
        setDescription('');
        setPrice('');
        setSelectedCategory('');
        setFile(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteCard = (index) => {
    const updatedCards = [...cards];
    updatedCards.splice(index, 1);
    setCards(updatedCards);
  };

  return (
    <div className="p-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Menú</h2>
      <div className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nombre"
            value={name}
            onChange={handleInputChange}
            className="border rounded p-2 mb-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Descripción"
            value={description}
            onChange={handleInputChange}
            className="border rounded p-2 mb-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Precio
          </label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Precio"
            value={price}
            onChange={handleInputChange}
            className="border rounded p-2 mb-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categories">
            Categorías
          </label>
          <select
            id="categories"
            name="categories"
            value={selectedCategory}
            onChange={handleInputChange}
            className="border rounded p-2 mb-2 w-full"
          >
            <option value="">Seleccionar categoría</option>
            <option value="Everydayvalue">Valor diario</option>
            <option value="promotions">Promociones</option>
            <option value="signatures boxes">Cajas exclusivas</option>
            <option value="snacks & beverages">Aperitivos y bebidas</option>
            <option value="sharing">Para compartir</option>
            <option value="Midnight">Medianoche</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
            Archivo
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleInputChange}
            className="border rounded p-2 mb-2 w-full"
          />
        </div>
        <button
          onClick={addCard}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Agregar tarjeta
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <div key={index} className="border rounded shadow-lg p-4 relative">
            <img src={card.path} alt={card.name} className="h-48 w-full object-cover rounded mb-4" />
            <h3 className="text-xl font-bold mb-2">{card.name}</h3>
            <p className="mb-2">{card.description}</p>
            <p className="mb-4 font-bold">${card.price}</p>
            <button onClick={() => deleteCard(index)} className="bg-red-500 text-white p-2 rounded absolute top-0 right-0 m-2">Eliminar</button>
            {/* Assuming addToCart is defined elsewhere */}
            <button onClick={() => addToCart(card)} className="bg-green-500 text-white p-2 rounded absolute bottom-0 right-0 m-2">+ Añadir al carrito</button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Menu;
