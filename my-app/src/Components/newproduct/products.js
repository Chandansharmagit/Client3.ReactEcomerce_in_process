import React, { useState, useEffect } from "react";
import "./newproduct.css";
import AnotherMain from "../home/anotherMain";
import Accordian from "../accordian";
import Moreproducts from "../moreproducts/moreproducts";
function Products({ products }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [hide, setHide] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [hidden, sethidden] = useState("hide products");

  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map((item) => parseFloat(item.price));
      setMinPrice(Math.min(...prices).toFixed(2));
      setMaxPrice(Math.max(...prices).toFixed(2));
    } else {
      setMinPrice(0);
      setMaxPrice(maxPrice);
    }
  }, [products]);

  useEffect(() => {
    const filtered = products.filter((item) => {
      const price = parseFloat(item.price);
      const matchesPrice =
        price >= parseFloat(minPrice) && price <= parseFloat(maxPrice);
      const matchesSearchQuery = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesPrice && matchesSearchQuery;
    });
    setFilteredProducts(filtered);
  }, [minPrice, maxPrice, searchQuery, products]);

  const handleMinChange = (e) => {
    const value = Math.min(parseFloat(e.target.value), maxPrice - 1);
    setMinPrice(value.toFixed(2));
  };

  const handleMaxChange = (e) => {
    const value = Math.max(parseFloat(e.target.value), minPrice + 1);
    setMaxPrice(value.toFixed(2));
  };

  const handleChangeFilters = () => {
    setHide(!hide);
    sethidden(hide ? "show products" : "hide products");
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="new_products_details">
        <Moreproducts products={products} />
        <div className="features">
          <h1>All products - 1203</h1>
          <span className="show-details">
            <button onClick={handleChangeFilters}>{hidden}</button>
          </span>
          <span className="show-detailss">
           search products :  <input 
              type="text"
              placeholder="Search products"
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-products"
             
            />
          </span>

          <h5 className="allproducts">
            Sort by - features{" "}
            <span>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-secondary dropdown-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  price high to low
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                  <button className="dropdown-item" type="button">
                    price low to high
                  </button>
                  <button className="dropdown-item" type="button">
                    New arrivals
                  </button>
                  <button className="dropdown-item" type="button">
                    Names
                  </button>
                </div>
              </div>
            </span>
          </h5>
        </div>

        <div className="row">
          <div className={`side ${hide ? "show" : "hide"}`}>
            <h2 className="name">Select your price</h2>
            <br />
            <br />
            <div className="price-range-container">
              <div className="price-range-input">
                <label className="labels-for-price">
                  ${minPrice} - ${maxPrice}
                </label>
                <div className="range-slider">
                  <input
                    type="range"
                    min={0}
                    max={maxPrice}
                    value={minPrice}
                    onChange={handleMinChange}
                  />
                  <input
                    type="range"
                    min={0}
                    max={maxPrice}
                    value={maxPrice}
                    onChange={handleMaxChange}
                  />
                </div>
              </div>
            </div>
            <br />
            <br />

            <h3>Categories</h3>
            <p>Select products based on Categories</p>
            <div className="products_categories">
              <li className="list">BEDS</li>
              <li className="list">SECTIONAL SOFAS</li>
              <li className="list">SOFAS</li>
              <li className="list">CUSHION & COVERS</li>
              <li className="list">GARDEN FURNITURE</li>
              <li className="list">OUTDOOR ITEMS</li>
              <li className="list">BALCONY FURNITURE</li>
              <li className="list">KING KOIL MATTRESS</li>
              <li className="list">SLEEPWELL MATTRESS</li>
              <li className="list">TABLES</li>
              <li className="list">DINING FURNITURE</li>
              <li className="list">KITCHEN FURNITURE</li>
              <li className="list">LIVING STORAGE</li>
              <li className="list">DECORATIVE ITEMS</li>
              <li className="list">MATTRESS</li>
            </div>
            <br />
            <h5>Brands</h5>
            <div className="products_categories">
              <li>BEDS</li>
              <li>SECTIONAL SOFAS</li>
            </div>
            <br />

            <h5>Heavy Discounts</h5>
            <div className="products_categories">
              <li>10% and Above</li>
              <li>20% and Above</li>
              <li>30% and Above</li>
            </div>
            <br />
          </div>
          <div className="main">
            <h2>Newly launched products</h2>
            <h5>Title description, Dec 7, 2017</h5>
            <div className="fakeimg">
              <AnotherMain products={filteredProducts} />
            </div>
          </div>
        </div>
      </div>
      <Accordian />
    </>
  );
}

export default Products;
