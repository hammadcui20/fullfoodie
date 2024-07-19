import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import sendPaymentDetails from './stripecontextprovider.jsx';
import { useNavigate } from 'react-router-dom';

function Payment({ amount, onPaymentSuccess }) {
  const [product, setProduct] = useState({
    name: "Producto de Ejemplo",
    price: amount,
    type: "debit_card",
    card: {
      number: '',
      exp_month: '',
      exp_year: '',
      cvc: ''
    }
  });
  const stripeKey = import.meta.env.VITE_APP_KEY;
  const [bankInfo, setBankInfo] = useState({
    accountHolderName: '',
    accountNumber: '',
    bankName: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isBankChecked, setIsBankChecked] = useState(false);
  const history = useNavigate();

  const handleStripePayment = async (token) => {
    try {
      const response = await sendPaymentDetails(token, product);
      if (response.status === 'success') {
        onPaymentSuccess();
        history('/orderplace');
      } else {
        setErrorMessage('El pago falló. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error en el pago:', error);
      setErrorMessage('El pago falló. Por favor, inténtalo de nuevo.');
    }
  };

  const handleBankPayment = async () => {
    try {
      const response = await sendPaymentDetails({ ...bankInfo, type: 'bank_account' }, product);
      if (response.status === 'success') {
        onPaymentSuccess();
        history('/orderplace');
      } else {
        setErrorMessage('El pago falló. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error en el pago por transferencia bancaria:', error);
      setErrorMessage('El pago falló. Por favor, inténtalo de nuevo.');
    }
  };

  const handleCashOnDelivery = async () => {
    history('/orderplace');
  };

  const handleBankToggle = () => {
    setIsBankChecked(!isBankChecked);
  };

  return (
    <div className="payment-container p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Selecciona Método de Pago</h2>
      <div className="flex flex-col gap-4">
        <StripeCheckout
          stripeKey={stripeKey}
          token={handleStripePayment}
          name='Pago con Tarjeta de Crédito/Débito'
          amount={amount * 100}
        >
          <button className='w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600'>Pagar con Tarjeta</button>
        </StripeCheckout>
        <div>
          <button className={`w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600`} onClick={handleBankToggle}>
            <span className="text-lg">Pagar con Transferencia Bancaria</span>
          </button>
          {isBankChecked && (
            <>
              <h3 className="font-bold mb-2">Pago por Transferencia Bancaria</h3>
              <input type="text" placeholder="Nombre del Titular de la Cuenta" value={bankInfo.accountHolderName} onChange={(e) => setBankInfo({ ...bankInfo, accountHolderName: e.target.value })} />
              <input type="text" placeholder="Número de Cuenta" value={bankInfo.accountNumber} onChange={(e) => setBankInfo({ ...bankInfo, accountNumber: e.target.value })} />
              <input type="text" placeholder="Nombre del Banco" value={bankInfo.bankName} onChange={(e) => setBankInfo({ ...bankInfo, bankName: e.target.value })} />
              <button className='w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600' onClick={handleBankPayment}>Confirmar Pago</button>
            </>
          )}
        </div>
        <button className='w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600' onClick={handleCashOnDelivery}>Pago Contra Entrega</button>
      </div>
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </div>
  );
}

export default Payment;
