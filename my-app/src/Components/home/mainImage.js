import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./grid.css";

export default function ProductListingPage({ products, addToCart }) {

  const [slicedProducts, setSlicedProducts] = React.useState([]); // State for first 8 products

  React.useEffect(() => {
    if (products) {
      const firstEightProducts = products.slice(0, 8); // Slice the first 8 products
      setSlicedProducts(firstEightProducts);
    }
  }, [products]); // Update slicedProducts when product changes



  return (
    <div>
      <div className="foot">
        <div className="all">
          <div className="container line">
            <h1 className="hq">Products</h1>
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

    </div>
  );
}



