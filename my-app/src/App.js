import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./Components/home";
import Nav from "./navbar/nav";
import Register from "./Components/register";
import Login from "./Components/login";
import Header from "./navbar/header";
import ReactImageMagnify from "react-image-magnify";
import Checoutaddress from "./Components/shiping/checoutaddress";
import ProductDetails from "./Components/product_details/details";
import ProductDetailsPage from "./Components/productDetails/productdetails";
import Cart from "./Components/cart/cart";
import { CartProvider } from "./Components/contextapi/contex";
import Contactpage from "./Components/contactPage/Contactpages";
import Products from "./Components/newproduct/products";
import Sendingemail from "./Components/forgotpasswordlink/sendingemail";
import Sendingpassword from "./Components/createnewpassord/createnewpassword";
import Socketmassage from "./Components/socket/socketmassage";
import Userprofile from "./Components/userprofile/userprofile";

import axios from "axios";
import Box from "./Components/flexbox/box";
import Sender from "./Components/sendingmassge/sendingmassage";
import Receiver from "./Components/sendingmassge/recievemassage";
import OrderConfirmation from "./Components/orderconfirmation/confirmation";
import Userproducts from "./userdashboard/userproducts";
import Userorderproduts from "./userorderproducts/userorder";
import Sofa from "./products/sofas";
function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(0);

  // Fetching the JSON file from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://chandansharmagit.github.io/api/newproducts.json"
        );
        console.log("Data fetched successfully:", response.data);
        setProducts(response.data); // Safeguard in case 'products' field is missing
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once on mount

  const addToCart = (product) => {
    setCart([...cart, product]);
    setCount(count + 1);
  };

  const fetchProduct = (productId) => {
    if (!products) {
      console.error("Error: Products array is undefined");
      return null;
    }
    const foundProduct = products.find((products) => products.id === productId);
    if (!foundProduct) {
      console.error(`Error: Product with ID ${productId} not found`);
    }
    return foundProduct;
  };

  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <Header />
          <Nav coubunt={count} />

          <Routes>
            <Route
              path="/"
              element={<Home products={products} addToCart={addToCart} />}
            />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/d" element={<ProductDetails />} />
            <Route
              path="/Createpassword/:id/:token"
              element={<Sendingpassword />}
            />
            <Route
              path="/products/:productId"
              element={
                <ProductDetailsPage
                  fetchProduct={fetchProduct}
                  products={products}
                />
              }
            />
            <Route path="/magnify" element={<ReactImageMagnify />} />
            <Route path="/cart" element={<Cart cart={cart} />} />
            <Route path="/contact" element={<Contactpage />} />
            <Route path="/send-email" element={<Sendingemail />} />
            <Route
              path="/products"
              element={<Products products={products} />}
            />
            <Route path="/socket" element={<Socketmassage />} />
            <Route path="/Userprofile" element={<Userprofile />} />
            <Route path="/box" element={<Box />} />
            <Route path="/sender" element={<Sender />} />
            <Route path="/rec" element={<Receiver />} />
            <Route path="/confirm" element={<OrderConfirmation />} />
            <Route path="/userproducts" element={<Userproducts />} />
            <Route path="/userorderproducts" element={<Userorderproduts />} />
            <Route path="/sofas" element={<Sofa products={products}/>} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
