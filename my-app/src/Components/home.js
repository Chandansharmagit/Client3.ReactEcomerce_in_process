import React, { useEffect, useState } from "react";
import "../css/home.css";
import Accordian from "./accordian";
import Uttam from "./uttam";
import MainImage from "./home/mainImage";
import Almuni from "./alumini/almuni";
import Sliderproducts from "./sliderproducts/slproducts";
import ImageGallery from "./gallary/ImageGallary";
import Box from "./flexbox/box";
import Moreproducts from "./moreproducts/moreproducts";

export default function Home({ products }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (products) {
      const matchesSearchQuery = products.filter((item) => {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setFilteredProducts(matchesSearchQuery);
      console.log('Filtered Products:', matchesSearchQuery); // Log filtered products
    }
  }, [searchTerm, products]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    console.log(searchTerm);
  };

  return (
    <div>
      <Uttam />

      <div className="collection_feature">
        <h3 className="collections-name">
          RECOMMENDED <span>FOR YOU</span>
        </h3>

        <div className="search-for-products">
          <input
            className="form-control mr-sm-2"
            type="search"
            value={searchTerm}
            placeholder="Search for products"
            aria-label="Search"
            id="search-pp"
            onChange={handleSearchChange}
          />

          {products ? (
            <Sliderproducts products={products} />
          ) : (
            <p>Loading recommended products...</p>
          )}
        </div>

        <h3 className="collections-name">
          SHOP <span>NOW</span>
        </h3>

        <Box className="boxes" />

        {products ? (
          <Moreproducts products={products} />
        ) : (
          <p>Loading more products...</p>
        )}

        <p className="take-look">
          Take a look at the newest additions to our modern furniture collection
        </p>
      </div>
      <hr />

      <div className="container-pregination"></div>

      <div className="collection_feature">
        <h3 className="collections-name">
          FEATURED <span>PRODUCTS</span>
        </h3>
      </div>
      <hr />
      {products ? (
        <>
          <MainImage products={products} />
          <Almuni />
        </>
      ) : (
        <p>Loading featured products...</p>
      )}

      <Accordian />
    </div>
  );
}
