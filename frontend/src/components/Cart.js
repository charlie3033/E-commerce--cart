import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import * as api from '../api';
import CheckoutModal from './CheckoutModal';
import '../styles/cart.css'

export default function Cart() {
  const { cart, fetchCart } = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);

  const handleRemove = async (id) => {
    await api.removeFromCart(id);
    fetchCart();
  };

  if (cart.loading) return <div>Loading cart...</div>;

  return (
    <div className='cart-container'>
      <h3 className='cart-title'>Shopping Cart</h3>
      {cart.items.length === 0 && <div className='cart-empty'>Your cart is empty</div>}
      {cart.items.map(it => (
        <div key={it.id} className='cart-item'>
          <div>
            <div className='cart-item-name'>{it.name}</div>
            <div className='cart-item-info'>Qty: {it.qty} × ₹{Number(it.price).toFixed(2)}</div>
          </div>
          <div className='cart-price-section'>
            <strong className='cart-item-total'>₹{(it.qty * it.price).toFixed(2)}</strong>
            <button className='cart-remove-btn' onClick={() => handleRemove(it.id)}>Remove</button>
          </div>
        </div>
      ))}
      <div className='cart-total-row'>
        <strong className='cart-total-text'>
          Total: ₹{Number(cart.total).toFixed(2)}
        </strong>
        <button className='cart-checkout-btn' 
          disabled={cart.items.length===0} 
          onClick={() => setShowCheckout(true)}>
          Checkout
        </button>
      </div>

      {showCheckout && <CheckoutModal onClose={() => { setShowCheckout(false); fetchCart(); }} items={cart.items} />}
    </div>
  );
}
