import React, { useState, useEffect, useContext } from "react";
import {
  FiX,
  FiMinus,
  FiPlus,
  FiShoppingCart,
  FiStar,
  FiMoreHorizontal,
  FiFilter,
} from "react-icons/fi";
import useFetch from "../../_hooks/useFetch";
import { useParams } from "react-router-dom";
import MySpinner from "../../_components/MainLayout/MySpinner";
import axios from "axios";
import { basUrl } from "../../_functions/getData";
import { MyContext } from "../../_context/conexts";
import { useToast } from "@chakra-ui/react";
import ProductImgs from "./components/ProductImgs";
import ContainerUp from "../../_components/ContainerUp";
import NewArrival from "../Home/Components/NewArrival";
import Rate from "../../_components/Rate";
import { initialReviews } from "./productDetailsData";
import { faqs, sizes } from "../CategoriesPage/categoriesData";
const ProductPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useFetch(`products/${id}`,`product-${id}`);
  const { contextValue, setContextValue } = useContext(MyContext);

  const [showBanner, setShowBanner] = useState(true);
  const [selectedColor, setSelectedColor] = useState("olive");
  const [selectedSize, setSelectedSize] = useState("Large");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("rating-reviews");
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    content: "",
  });

  const product = {
    colors: ["olive", "green", "navy"],
    sizes: sizes,
    faqs:faqs ,
  };

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const storedReviews = localStorage.getItem("productReviews");
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    } else {

      setReviews(initialReviews);
      localStorage.setItem("productReviews", JSON.stringify(initialReviews));
    }
  }, []);

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            className={`w-5 h-5 ${
              i < Math.floor(rating)
                ? "text-yellow-400 fill-current"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-gray-600">{rating}/5</span>
      </div>
    );
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleLoadMoreReviews = () => {
    setShowAllReviews(!showAllReviews);
  };

  const handleWriteReview = () => {
    setShowReviewForm(true);
  };

  const handleLatestFilter = () => {
    console.log("Latest filter clicked");
  };

  const handleFilterClick = () => {
    console.log("Filter clicked");
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const newReviewObject = {
      id: reviews.length + 1,
      ...newReview,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
    const updatedReviews = [newReviewObject, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem("productReviews", JSON.stringify(updatedReviews));
    setNewReview({ name: "", rating: 5, content: "" });
    setShowReviewForm(false);
  };

  const handleCloseReviewForm = () => {
    setShowReviewForm(false);
  };

  const [isSubmit, setisSubmit] = useState(false)
  let msg = useToast()

  const addTocart = async (pr) => {
    let tk = localStorage.getItem('userToken')

    if(!tk){
      msg({title: `You have to login `,status: 'warning',duration: 3000})
      return
    }

    let h =  {
      headers: {
        Authorization: `Bearer ${tk}`
      }
    }
    let {name,_id,discount,price,images} = data.data
    let d = {
      product: {name,_id,img:images[0],discount,color:selectedColor,size:selectedSize,price},
      count: quantity
    }

    setisSubmit(true)
    try {
      let res = await axios.post(`${basUrl}/api/cart/add-to-cart`,d,h)
      if(res.data.in_cart){
        msg({title: res.data.msg,status: 'info',duration: 3000})
        setisSubmit(false)
        return
      }else{
        msg({title: res.data.msg,status: 'success',duration: 3000})
        setisSubmit(false)
        setContextValue(!contextValue)
  
      }
      
    } catch (er) {
      console.log(er);
      setisSubmit(false)
      
    }
    
  }


  return (
    <ContainerUp className="min-h-screen bg-gray-100">
      {showBanner && (
        <div className="bg-black text-white p-2 flex justify-between items-center text-xs sm:text-sm">
          <div className="flex-grow text-center">
            Sign up and get 20% off to your first order.{" "}
            <span className="underline cursor-pointer">Sign Up Now</span>
          </div>
          <FiX
            className="cursor-pointer"
            onClick={() => setShowBanner(false)}
          />
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
        <div className="text-sm breadcrumbs mb-4">
          <a href="/" className="hover:underline">
            Home
          </a>{" "}
          &gt;
          <a href="/shop" className="hover:underline">
            Shop
          </a>{" "}
          &gt;
          <a href="/shop/men" className="hover:underline">
            Men
          </a>{" "}
          &gt;
          <a href="/shop/men/t-shirts" className="hover:underline">
            T-shirts
          </a>
        </div>
        {isError || isLoading ? (
          <MySpinner />
        ) : (

        <div className="flex flex-col lg:flex-row -mx-4">
          {data?.data?.images.length > 0 &&
          <ProductImgs imgs={data?.data?.images} />
          }
          <div className="w-full lg:w-1/2 px-4">
            <h2 className="text-2xl lg:text-3xl font-bold mb-2">
              {data?.data?.name}
            </h2>
            <div className="mb-4">
              <Rate rate={data?.data?.rate} />
            </div>
            <div className="mb-4">
              <span className="text-2xl font-bold">${data?.data?.price - (data?.data?.discount * data?.data?.price /100  )}</span>
              <span className="text-gray-500 line-through ml-2">
                ${data?.data?.price}
              </span>
              <span className="text-red-500 ml-2">-{data?.data?.discount}%</span>
            </div>
            <div className="mb-8 pb-8 border-b border-gray-200">
              <p>{product.description}</p>
            </div>
            <div className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="font-semibold mb-4">Select Colors</h3>
              <div className="flex space-x-4">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`w-10 h-10 rounded-full ${
                      color === selectedColor ? "ring-2 ring-black" : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>
            <div className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="font-semibold mb-4">Choose Size</h3>
              <div className="flex flex-wrap gap-4">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-6 py-3 rounded-full ${
                      size === selectedSize
                        ? "bg-black text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center border rounded-full">
                <button
                  className="px-4 py-2"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <FiMinus />
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  className="px-4 py-2"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <FiPlus />
                </button>
              </div>
              <button disabled={isSubmit == true ? true: false} onClick={ addTocart} className="flex-grow bg-black text-white px-8 py-3 rounded-full flex items-center justify-center">
                {isSubmit ? <MySpinner s="lg" />: <><FiShoppingCart className="mr-2" /> Add to Cart</> }
                
              </button>
            </div>
          </div>
        </div>
        )}

        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav
              className="-mb-px flex justify-center space-x-8"
              aria-label="Tabs"
            >
              {["Product Details", "Rating & Reviews", "FAQs"].map((tab) => (
                <button
                  key={tab}
                  onClick={() =>
                    handleTabClick(tab.toLowerCase().replace(/ & /g, "-"))
                  }
                  className={`${
                    activeTab === tab.toLowerCase().replace(/ & /g, "-")
                      ? "border-black text-black"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm sm:text-base text-center w-1/3`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {activeTab === "product-details" && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Product Details</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Material: {product.details.material}</li>
                <li>Fit: {product.details.fit}</li>
                <li>Care Instructions: {product.details.care}</li>
                <li>Origin: {product.details.origin}</li>
              </ul>
            </div>
          )}

          {activeTab === "rating-reviews" && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  All Reviews ({reviews.length})
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={handleLatestFilter}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 transition duration-300"
                  >
                    Latest
                  </button>
                  <button
                    onClick={handleWriteReview}
                    className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition duration-300"
                  >
                    Write a Review
                  </button>
                  <button
                    onClick={handleFilterClick}
                    className="bg-gray-200 text-gray-800 px-3 py-2 rounded-full hover:bg-gray-300 transition duration-300"
                  >
                    <FiFilter />
                  </button>
                </div>
              </div>
              {showReviewForm && (
                <div className="mb-8 bg-white p-6 rounded-lg shadow">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Write a Review</h3>
                    <button
                      onClick={handleCloseReviewForm}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FiX size={24} />
                    </button>
                  </div>
                  <form onSubmit={handleReviewSubmit}>
                    <div className="mb-4">
                      <label htmlFor="name" className="block mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={newReview.name}
                        onChange={(e) =>
                          setNewReview({ ...newReview, name: e.target.value })
                        }
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="rating" className="block mb-2">
                        Rating
                      </label>
                      <select
                        id="rating"
                        value={newReview.rating}
                        onChange={(e) =>
                          setNewReview({
                            ...newReview,
                            rating: parseInt(e.target.value),
                          })
                        }
                        className="w-full p-2 border rounded"
                      >
                        {[1, 2, 3, 4, 5].map((r) => (
                          <option key={r} value={r}>
                            {r} stars
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="content" className="block mb-2">
                        Review
                      </label>
                      <textarea
                        id="content"
                        value={newReview.content}
                        onChange={(e) =>
                          setNewReview({
                            ...newReview,
                            content: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded"
                        rows="4"
                        required
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition duration-300"
                    >
                      Save Review
                    </button>
                  </form>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {reviews
                  .slice(0, showAllReviews ? reviews.length : 2)
                  .map((review) => (
                    <div
                      key={review.id}
                      className="bg-white p-6 rounded-lg shadow border border-gray-200"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <StarRating rating={review.rating} />
                          <p className="font-semibold mt-2">{review.name}</p>
                        </div>
                        <div className="flex items-center">
                          <p className="text-sm text-gray-500 mr-2">
                            {review.date}
                          </p>
                          <FiMoreHorizontal className="text-gray-500 cursor-pointer" />
                        </div>
                      </div>
                      <p className="text-gray-600">{review.content}</p>
                    </div>
                  ))}
              </div>
              {reviews.length > 2 && (
                <div className="text-center mt-8">
                  <button
                    onClick={handleLoadMoreReviews}
                    className="bg-gray-200 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-300 transition duration-300"
                  >
                    {showAllReviews ? "Show Less Reviews" : "Load More Reviews"}
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "faqs" && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {product.faqs.map((faq, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold mb-2">{faq.question}</h4>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">
            You might also like
          </h2>
          <NewArrival />
        </div>
      </main>
    </ContainerUp>
  );
};

export default ProductPage;
