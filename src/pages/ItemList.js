import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/Items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
   
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      <h2>Item List</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link to={`/items/${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/items/add">Add Item</Link>
    </div>
  );
};

export default ItemList;
