import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ItemCategory = () => {
const [category, setCategory] = useState(null);
const [products, setProducts] = useState(null);

  const params = useParams();

  const getCategory = () => {
    fetch(`http://localhost:8080/ItemCategory/${params.id}`)
      .then((response) => response.json())
      .then((data) => setCategory(data))
      .catch((error) => console.error("Error fetching category:", error));
  };

  const getProductsByCategory = () => {
    fetch(`http://localhost:8081/categories/${params.id}/products`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  };

  useEffect(() => {
    getCategory();
    getProductsByCategory();
  }, []);

  return (
    <>
      {category && <h1>{category.name}</h1>}

      <ol>
        {products &&
          products.map((product) => (
            <li key={product.id}>
              <Link to={`/products/${product.id}`}>{product.name}</Link>
            </li>
          ))}
      </ol>
    </>
  );
};

export default ItemCategory;
