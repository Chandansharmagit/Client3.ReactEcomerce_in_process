import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../contextapi/contex";
import "./ProductDetailsPage.css";

import ReactImageMagnify from "react-image-magnify";
import Accordian from "../accordian";
import { toast } from "react-toastify";

import Socketmassage from "../socket/socketmassage";

import Moreproducts from "../moreproducts/moreproducts";
export default function ProductDetailsPage({ fetchProduct, products }) {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [reviews, setReviews] = useState([]);
  const [count, setCount] = useState(1);

  const { addToCart } = useCart();

  useEffect(() => {
    const id = parseInt(productId, 10);
    const fetchedProduct = fetchProduct(id);
    setProduct(fetchedProduct);
  }, [productId, fetchProduct]);

  if (!product) {
    return <p>Loading product details...</p>;
  } else if (!product.id) {
    return <p>Product not found!</p>;
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: count });
    toast.success("Added to cart successfully.", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const handleBuyNow = () => {
    // Buy now logic here
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      rating: e.target.rating.value,
      comment: e.target.comment.value,
    };
    setReviews([...reviews, newReview]);
  };

  return (
    <>
      <div className="product-details">
        {/* //making the proucts details  */}

        <div className="positions">
          <hr />
          <p className="position_sticky">
            {product.name +
              " / product id    " +
              productId +
              " / price / Rs." +
              product.price}
          </p>
          <hr />
        </div>

        <div className="col-pregination-products">
          <div className="row-pregination-products">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: product.img,
                  width: 800,
                },
                largeImage: {
                  src: product.img,
                  width: 1200,
                  height: 1800,
                },
                lensStyle: { backgroundColor: "rgba(0,0,0,.6)" },
              }}
            />
          </div>
          <div className="row-pregination-products">
            <div className="product-details">
              <div className="product-info">
                <h1 className="descritpion-name">{product.name}</h1>
                <div className="rating">
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                </div>
                <h1 className="descritpion-pregination">
                  Description :{product.desc}
                </h1>
                <hr />
                <h1 className="stock">Stock available : {product.stock}</h1>
                <hr />
                <span className="pricess">price : Rs {product.price}</span>
                <hr />

                <div className="increment_decrement">
                  <p>quantity :</p>{" "}
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    id="incrementings"
                    onClick={() => {
                      if (count === 1) {
                        setCount(1);
                      } else {
                        setCount(count - 1);
                      }
                    }}
                  >
                    -
                  </button>
                  {count}
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    id="incrementings"
                    onClick={() => {
                      setCount(count + 1);
                    }}
                  >
                    +
                  </button>
                </div>
                <hr />

                <div className="button_container">
                  <div className="buttons">
                    <button
                      onClick={handleAddToCart}
                      className="add-to-cart"
                      id="news1"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={handleBuyNow}
                      className="add-to-cart"
                      id="news"
                    >
                      Buy Now
                    </button>
                    <button onClick={handleBuyNow} className="add-to-cart">
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="product-details-tab">
        <div className="product-details-tabs">
          <button
            className={activeTab === "description" ? "active" : ""}
            onClick={() => handleTabClick("description")}
          >
            Description
          </button>
          <button
            className={activeTab === "specifications" ? "active" : ""}
            onClick={() => handleTabClick("specifications")}
          >
            Specifications
          </button>
          <button
            className={activeTab === "reviews" ? "active" : ""}
            onClick={() => handleTabClick("reviews")}
          >
            Reviews
          </button>
        </div>
        <hr/>
        <div className="product-details-content">
          {activeTab === "description" && (
            <div className="tab-content">
              <h2>Description</h2>
              <p className="desc">{product.name}</p>
              <h3 className="descr">{product.desc}</h3>
            </div>
          )}
          {activeTab === "specifications" && (
            <div className="tab-content" key={product.id}>
              <h2>Specifications</h2>
              <p>Size: {product.size}</p>
              <p>Material: {product.material}</p>
              <p>Color: {product.color}</p>
              <p>height: {product.height}</p>
              <p>depth: {product.depth}</p>
              <p>Color: {product.color}</p>
              <p>material: {product.material}</p>
              <p>warranty: {product.warranty}</p>
            </div>
          )}
          {activeTab === "reviews" && (
            <div className="tab-content">
              <h2>Reviews</h2>
              <form onSubmit={handleReviewSubmit}>
                <div>
                  <label htmlFor="rating">Rating:</label>
                  <select name="rating" id="rating" required>
                    <option value="1">1 Star</option>
                    <option value="2">2 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="comment">Comment:</label>
                  <textarea name="comment" id="comment" required></textarea>
                </div>
                <button type="submit" className="submits">
                  Submit Review
                </button>
              </form>
              <div className="reviews-list">
                {reviews.map((review, index) => (
                  <div key={index} className="review">
                    <div className="review-rating">
                      {Array(review.rating)
                        .fill("⭐")
                        .map((star, i) => (
                          <span key={i}>{star}</span>
                        ))}
                    </div>
                    <p>{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <br />
      <br />
      <Socketmassage />
      <br />
      <br />
      <br />
      <br />

      <h3 className="chandan_related">Related Products</h3>

      <Moreproducts products={products} />

      <Accordian />
    </>
  );
}
