import axios from "axios";
import React, { useEffect, useState } from "react";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/Items");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const createOrder = async () => {
    try {
      const productIds = orderProducts.map((obj) => obj.itemId);
      const data = {
        items: productIds.map((id) => ({ itemId: id, quantity: 1 })), 
      };

      const response = await axios.post(
        "http://localhost:8081/api/orders",
        data
      );
      if (response.status === 201) {
        setOrderProducts([]);
        setTotal(0);
        setTax(0);
      } else {
        // Show error message
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setTax((total / 100) * 15);
  }, [total]);

  return (
    <div className="container-fluid">
      <h1>Point of Sale - Checkout</h1>
      <div className="row">
        <div className="col-md-6">
          <h2>Products</h2>
          {products.map((product) => (
            <div key={product.id} className="product-box px-2 py-2">
              {product.name} - ${product.price}
              <button
                className="btn btn-sm btn-primary"
                onClick={() => {
                  setOrderProducts([...orderProducts, product]);
                  setTotal((prevTotal) => prevTotal + product.price);
                }}
              >
                Add to Order
              </button>
            </div>
          ))}
        </div>
        <div className="col-md-6">
          <h2>Order</h2>
          <table className="table table-stripped">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {orderProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.itemId}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                </tr>
              ))}
            </tbody>
            <thead>
              <tr>
                <th colSpan={2}>Total</th>
                <th>${total}</th>
              </tr>
              <tr>
                <th colSpan={2}>Tax</th>
                <th>${tax}</th>
              </tr>
            </thead>
          </table>
          <button className="btn btn-secondary" onClick={createOrder}>
            Complete Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
