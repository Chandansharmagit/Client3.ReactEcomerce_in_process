import React, { useState } from "react";

function PriceFilter({ products, setFilteredProducts }) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleFilter = () => {
    const filtered = products.filter((product) => {
      const price = parseFloat(product.price);
      return (
        (minPrice === "" || price >= parseFloat(minPrice)) &&
        (maxPrice === "" || price <= parseFloat(maxPrice))
      );
    });
    setFilteredProducts(filtered);
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <button onClick={handleFilter}>Apply Filter</button>
    </div>
  );
}

export default PriceFilter;
