import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import Item from './pages/Item';
import ItemAdd from './pages/ItemAdd';
import ItemCategory from './pages/ItemCategory';
import ItemEdit from './pages/ItemEdit';
import ItemList from './pages/ItemList';
import ShoppingCart from './pages/ShoppingCart';
import StockManagement from './pages/StockManagement';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/checkout" component={Checkout} />
    
        <Route path="/home" component={Home} />
        <Route path="/items" component={ItemList} />
        <Route path="/items/:id" component={Item} />
        <Route path="/items/add" component={ItemAdd} />
        <Route path="/items/:itemId/edit" component={ItemEdit} />
        <Route path="/categories" component={ItemCategory} />
        <Route path="/stock" component={StockManagement} />
        <Route path="/cart" component={ShoppingCart} />
    
        </Routes>
    </BrowserRouter>
  );
}

export default App;
