import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const ItemEdit = ({ onUpdate }) => {
  const { itemId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
  });

  const history = useHistory();

  useEffect(() => {
    
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/Items/${itemId}`);
        const itemDetails = response.data;
        setFormData(itemDetails);
      } catch (error) {
        console.error('Error fetching item details:', error);
      }
    };

    fetchItemDetails();
  }, [itemId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/Items/${itemId}`, formData);
      onUpdate(); 
      history.push('/items'); 
    } catch (error) {
      console.error('Error updating item:', error);
      
    }
  };

  return (
    <div>
      <h2>Edit Item</h2>
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
        <button type="submit">Update Item</button>
      </form>
    </div>
  );
};

export default ItemEdit;
