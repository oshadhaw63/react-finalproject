import axios from 'axios';
import { default as React, default as React, useEffect, useState } from 'react';

const StockManagement = () => {
  const [stockItems, setStockItems] = useState([]);
  const [newStockItem, setNewStockItem] = useState({
    itemName: '',
    quantity: 0,
  });

  const fetchStockItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/Stock'); 
      setStockItems(response.data);
    } catch (error) {
      console.error('Error fetching stock items:', error);
    }
  };

  const addStockItem = async () => {
    try {
      const response = await axios.post('http://localhost:8080/Stock', newStockItem); 
      setStockItems([...stockItems, response.data]);
      setNewStockItem({ itemName: '', quantity: 0 });
    } catch (error) {
      console.error('Error adding stock item:', error);
    }
  };

  useEffect(() => {
    fetchStockItems();
  }, []); 

  return (
    <div>
      <h2>Stock Management</h2>

      <div>
        <h3>Add New Stock Item</h3>
        <label>
          Item Name:
          <input
            type="text"
            value={newStockItem.itemName}
            onChange={(e) => setNewStockItem({ ...newStockItem, itemName: e.target.value })}
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            value={newStockItem.quantity}
            onChange={(e) => setNewStockItem({ ...newStockItem, quantity: e.target.value })}
          />
        </label>
        <button onClick={addStockItem}>Add Item</button>
      </div>

      <div>
        <h3>Current Stock</h3>
        <ul>
          {stockItems.map((item) => (
            <li key={item.id}>
              {item.itemName} - {item.quantity} in stock
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StockManagement;
