import React, { useState } from "react";
import { Link } from "react-router-dom";
import Accordian from "../Components/accordian";

export default function Sofa({ products, addToCart }) {
  const [slicedProducts, setSlicedProducts] = React.useState([]); // State for first 8 products
  const [searchQuery, setSearchQuery] = useState("");
  const [hidden, sethidden] = useState("hide products");
  const [hide, setHide] = useState(true);
  React.useEffect(() => {
    if (products) {
      const firstEightProducts = products.slice( 16); // Slice the first 8 products
      setSlicedProducts(firstEightProducts);
    }
  }, [products]); // Update slicedProducts when product changes

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleChangeFilters = () => {
    setHide(!hide);
    sethidden(hide ? "show products" : "hide products");
  };

  return (
    <div>
      <div className="foot">
        <div className="all">
          <div className="container line">
            <h1 className="hq">Products</h1>
          </div>
          <hr />
          <div className="features">
            <h1>All products - 1203</h1>
            <span className="show-details">
              <button onClick={handleChangeFilters}>{hidden}</button>
            </span>
            <span className="show-detailss">
              search products :{" "}
              <input
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
          <hr />
          <div className="grid-container">
            {slicedProducts.length > 0 ? (
              slicedProducts.map((product) => (
                <div className="card" key={product.id}>
                  <h6>
                    <span className="badge badge-secondary">New arrived</span>
                  </h6>
                  <div className="img-container">
                    <Link to={`/products/${product.id}`}>
                      <img src={product.img} alt="" className="image" />
                    </Link>
                  </div>
                  <h1 className="product-name">{product.name}</h1>
                  <p className="pricing">Rs.{product.price}</p>

                  <Link to={`/products/${product.id}`}>
                    <button className="addtocart" onClick={addToCart}>
                      View Product
                    </button>
                  </Link>
                </div>
              ))
            ) : (
              <div>Loading products...</div>
            )}
          </div>
        </div>
      </div>
      <Accordian />
    </div>
  );
}
