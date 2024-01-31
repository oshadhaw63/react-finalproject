
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Item = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {

    const fetchItem = async () => {
      try {
        const response = await fetch(`http://localhost:8080/items/${id}`);
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error('Error fetching item details:', error);
      }
    };

    fetchItem();
  }, [id]);

  return (
    <div>
      <h2>Item Details</h2>
      {item ? (
        <>
          <h3>{item.name}</h3>
          <p>Price: ${item.price}</p>
          <p>Quantity in Stock: {item.quantity}</p>
          <p>Category: {item.itemcategory.name}</p> {}
          <p>Description: {item.description}</p>
     
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Item;
