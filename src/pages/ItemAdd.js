import axios from 'axios';
import React, { useState } from 'react';

const ItemAdd = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/Items', formData);
      onSubmit(response.data);

      setFormData({
        name: '',
        price: '',
        quantity: '',
      });
    } catch (error) {
      console.error('Error adding item:', error);
    
    }
  };

  return (
    <div>
      <h2>Add Item</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Item Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Price:
          <input type="number" name="price" value={formData.price} onChange={handleChange} />
        </label>
        <label>
          Quantity:
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
        </label>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};



export default ItemAdd;
