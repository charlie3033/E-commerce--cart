import React, { useEffect, useState, useContext } from 'react';
import * as api from '../api';
import { CartContext } from '../context/CartContext';
import "../styles/products.css";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const { fetchCart } = useContext(CartContext);

  useEffect(() => { api.getProducts().then(setProducts).catch(console.error); }, []);

  const handleAdd = async (id) => {
    await api.addToCart(id, 1);
    fetchCart();
  };

  return (
    <div className='product-grid'>
      {products.map(p => (
        <div key={p._id} className='product-card'>
          <div className='product-img-container'>
            <img src={`${p.image}`} alt={p.name} className='product-img'/>
          </div>
          <h4>{p.name}</h4>
          <p className="product-description">{p.description}</p>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span className='product-price'>₹{Number(p.price).toFixed(2)}</span>
            <button onClick={() => handleAdd(p._id)}>Add to cart</button>
          </div>
        </div>
      ))}
    </div>
  );
}
