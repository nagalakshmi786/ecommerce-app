// components/Modal.js
import React from 'react';

const Modal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>Category: {product.category}</p>
        <p>Price: ${product.price}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
