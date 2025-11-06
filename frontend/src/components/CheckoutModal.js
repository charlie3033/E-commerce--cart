import React, { useState } from 'react';
import * as api from '../api';
import '../styles/checkout.css';

export default function CheckoutModal({ onClose, items }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { cartItems: items.map(i => ({ productId: i.productId, qty: i.qty })), name, email };
      const res = await api.checkout(payload);
      setReceipt(res.receipt);
    } catch (err) {
      console.error(err);
      alert('Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  if (receipt) {
    return (
      <div className="modal-backdrop">
        <div className="modal-box">
          <h3 className="modal-title">Order Successful</h3>
          <div className="receipt-line">Receipt ID: {receipt.id}</div>
          <div className="receipt-line">
            Total: ₹{Number(receipt.total).toFixed(2)}</div>
          <div className="receipt-line">
            Time: {new Date(receipt.timestamp).toLocaleString()}</div>
          <button className="close-btn" onClick={() => onClose()}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h2  className="modal-title">Checkout</h2>
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div>
            <label class="input-title">Full Name</label><br/>
            <input className="form-input" value={name} onChange={e=>setName(e.target.value)} required/>
          </div>
          <div>
            <label class="input-title">Email</label><br/>
            <input className="form-input" value={email} onChange={e=>setEmail(e.target.value)} required type="email"/>
          </div>
          <div className="button-row">
            <button className="submit-btn" type="submit" disabled={loading}>Place order</button>
            <button type="button" className="cancel-btn" onClick={onClose} style={{ marginLeft: 8 }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

