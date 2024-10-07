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
import { Link, useParams } from "react-router-dom";
import MySpinner from "../../_components/MainLayout/MySpinner";
import axios from "axios";
import { basUrl } from "../../_functions/getData";
import { MyContext } from "../../_context/conexts";
import { useToast } from "@chakra-ui/react";
import ProductImgs from "./components/ProductImgs";
import ContainerUp from "../../_components/ContainerUp";
import NewArrival from "../Home/Components/NewArrival";
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
    name: "One Life Graphic T-shirt",
    rating: 4.5,
    price: 260,
    originalPrice: 300,
    discount: 40,
    description:
      "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
    colors: ["olive", "green", "navy"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    images: [
      "https://s3-alpha-sig.figma.com/img/21d6/bcec/533545a2b1e10e90b8059bc1bc97eab5?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bklxkI0GvT5C15nSvHBJU8jIh3k2NBAyL8ZP~FrK5ewUN1epvjQFf7Yl3~qdSh9g8oxA29UM-YDgTL3~-Pi9zV~i-8JihWr7c7kDjNX5tyYkoDTviJXuy7oyA-X-pSLq9LY1-ble8niEmVTIA4fn6ZjU87fIrxI5EDufuh6G54lr6y5xImjMC94JoqZTu9lqFSZTAp2909xf79a-AqEfj0hs0tbXLZYu2vsQZO1pF~hCm~yt~OcVaxuGFI4bhoWLhZ0PZBQ7ukSneafxwRRiFu4prz89jKXj4YJUT4j20lDhKjG0m8pfib8sHIzPl7~kVfgOsju6v0xl1u546QFPPA__",
      "https://s3-alpha-sig.figma.com/img/52ce/3b46/9d8d7ff6e33f95a574450e07218fc909?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mqPVkYL9uvAQMeCUPNMh~RNFjOi~1~Z~YCJi9MVkNyL~HjKqorCyL--3WAYJe29S1H5ztIDZzaWAPEJLxK8RSp2VjjolsJuXB5pv6SPYB21YCcH90v0HtEHTwN24R-UC8DxhoNC-CMGgSJHLKl~chzU7vxWjJWId7egt5xNz3zjKIfJCH6PUHpHaUbnJ6TvYjDKN-4KVLUNVl-w12h4xlT4cwXsaKEMRCwFQNJF7uiqpji7KTC9JN6vVL4Xr7UZDZKfpih7lHhdodPZeSUj8i3~gVG~oeb7odMsltjtYEu6uwNo8Hnowkqb-RiOZHp-j0-gc8QJqrxOKbI2oOMAOMQ__",
      "https://s3-alpha-sig.figma.com/img/51c4/5a78/b417beff6f8fa6310534f3755fd23c5a?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ni7SachtpO8MQVNuo9-htoIbnKtn6~k~g3WZOXkbBZ5f0lG-WnZ6v4G8Xh-GTiB0ti3ejFV7F9WDotOsvfMu4E8bF2z~J4bV0AIGBl17IE89lKBVOx~dzUaqqqXDglYi7JhDHonidMfUc~ICX2uUMNXhwiKUniK2fwFs6trhPooRBYzR3NEwf131HVIMImc4iS3CFVZI6249Lan3ELapUecrK~fzJ1ozl157hPXviKS2cdwuITz3UuVdZ1bbg1K0IwtGxIokAlmAZ5JJwXTsTQ~gMlxHza4EdOmgIJv98KJXMao41K1MOw1aV1n-v~Ba-5dGLh85kN3FeVkrwwauPQ__",
    ],
    details: {
      material: "100% Cotton",
      fit: "Regular fit",
      care: "Machine wash cold, tumble dry low",
      origin: "Imported",
    },
    faqs: [
      {
        question: "How does the sizing run?",
        answer:
          "Our t-shirts are true to size. For a looser fit, we recommend sizing up.",
      },
      {
        question: "Is the material see-through?",
        answer:
          "No, the fabric is thick enough to ensure opacity while still being breathable.",
      },
      {
        question: "How should I care for this t-shirt?",
        answer:
          "For best results, machine wash cold and tumble dry on low heat. Avoid using bleach.",
      },
    ],
  };

  const relatedProducts = [
    {
      name: "Polo with Contrast Trims",
      rating: 4.0,
      price: 212,
      originalPrice: 242,
      discount: 20,
      image:
        "https://s3-alpha-sig.figma.com/img/15e6/8c10/3095df99e905b164718348af952a0f64?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pBmaKP9Ny~Ra8uwKLLovuvy2h1waQk4JCO2mp6jN74jdra5ILWmpL2tFgm4aRHw1i3nHmeSkBoPuOcsLxbIvU86-xLBPN6xs8bE-C8rO4f~yRcyCmRw4i1VavAR0FxVGj0o9fd5JH6t93EKLqNCrJALfxUKJUVS61Fw6Vf76ha1f9R3BSUo29J1IfIR9TKDK3hYBhz99iGXu-1Tqif9E1UpDBAmlcgDSyYDIa-2E0JPG-RWDAswLgJ4dtG0MwgUtf-jEQu9m4xurVlnCeRZxkL9my4SjU5sceIkLR3G9Q~sOn-72nl2R0OfY40iYMJTi7sToa40PUCFqjSXiroxYOA__",
      link: "/product/polo-contrast",
    },
    {
      name: "Gradient Graphic T-shirt",
      rating: 3.5,
      price: 145,
      image:
        "https://s3-alpha-sig.figma.com/img/f04a/017d/b094f9a20c2328f54a31b153619784f3?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=i611VRFWx1Og0qDdkN8hZlSbMv82Y6wl7oFU~MjFLFZpqg17qBWfuh2XyG87bqkJaKM8hPQ14i4JATKtCk5g6Mvo8pu1OqVw~XOuSDSOSKlpDbn4bg9cYSEAYs9iA-PAoJga4pFMQ3XmkL9vtDIiL~zFZiUIRwLHNSWwVVtnGrJlA38cw7EpgwR9jLmyoVWyM7nQQYcC-Bigr4cEEv51KIT3l6JS4kk-kJd~UEy~wD4JlcEhkQsK9OcfoHy8bCKdVP9HxLb-Qkyw3dQkD6ZAo6-WnQaYVHmcyUqnDBH8tStQdAK0R~cC1dDCVGLopAooo2Q7~QNYot4geQvSlBLbdw__",
      link: "/product/gradient-tshirt",
    },
    {
      name: "Polo with Tipping Details",
      rating: 4.5,
      price: 180,
      image:
        "https://s3-alpha-sig.figma.com/img/aecd/8196/485b30fd30b3226e09bb8f8e494c260b?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ga1eGI5u6aryrDyLcqV-JIIv8AkDIkDRKZKt2TmUMtgPOymmqbMDDskfOBwVfSSrzFTWpuQGOrwaaY1V3riZ50NhNtZmoqHUTdX6d-C5CBuzaJLJPO7od4H9aBrDblkRk7e5NP5wFMK0PMf-K9UF7c~5OEPV8Vc55pGeZLoyuVablt~UeXmN35etv~mB4mFTaoLWy7k4~4YpN2TU7HVMAJSrJRc89eQVDis0xcOboFb~eqdLsMdAtyGCkarS3LnAP~RHBDCsiCceHCdZe2E8nJt9YPqZUNibhg76ReMRhtlCrnU8hXDLk2Pz8rtd509pUV-zzLTlNSXH~57AgBuvpA__",
      link: "/product/polo-tipping",
    },
    {
      name: "Black Striped T-shirt",
      rating: 5.0,
      price: 120,
      originalPrice: 150,
      discount: 30,
      image:
        "https://s3-alpha-sig.figma.com/img/6115/920b/12942762aefb7c7ac954e78b76284504?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TueIhiej-appdWasjWao4XTLXQ9fcTJ-t6jmweQvCLp1pNJ27iF00az6gGxxMmithfVhl59FqQTXkiBGwdKgcHPQ2MDYsLFB-CQMIcNi4eRarHroBlb0RyFmTWSyCxVtfb3COpNh1mbK5qdhmJY5al2ZqlWDgS7F6A1DS6a0T9aIFM994kwfe6LS-UCsbMSJEpsg0sOM7o~KvOy6lcbm1m~WFAgb-g9pschLlDrxr37TiWPDpVhQVGELj-zdwqLnlyKqdBvzRrad~iP3aeoYlwqb03VUeFe9rH56PAwCFvVq~fM~IonEuJS7Y3b59hu-SY48Y9wYmTeTEEBsycB1cQ__",
      link: "/product/striped-tshirt",
    },
  ];

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const storedReviews = localStorage.getItem("productReviews");
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    } else {
      const initialReviews = [
        {
          id: 1,
          name: "Samantha D.",
          rating: 5,
          date: "August 14, 2023",
          content:
            "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt!",
        },
        {
          id: 2,
          name: "Alex M.",
          rating: 4,
          date: "August 15, 2023",
          content:
            "This t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me!",
        },
        {
          id: 3,
          name: "Ethan R.",
          rating: 4,
          date: "August 16, 2023",
          content:
            "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet highly pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt!",
        },
        {
          id: 4,
          name: "Olivia P.",
          rating: 4,
          date: "August 17, 2023",
          content:
            "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but is also great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out!",
        },
        {
          id: 5,
          name: "Liam K.",
          rating: 4,
          date: "August 18, 2023",
          content:
            "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion!",
        },
        {
          id: 6,
          name: "Ava H.",
          rating: 5,
          date: "August 19, 2023",
          content:
            "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter!",
        },
      ];
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
          <ProductImgs imgs={data.data.images} />
          <div className="w-full lg:w-1/2 px-4">
            <h2 className="text-2xl lg:text-3xl font-bold mb-2">
              {data.data.name}
            </h2>
            <div className="mb-4">
              <StarRating rating={product.rating} />
            </div>
            <div className="mb-4">
              <span className="text-2xl font-bold">${data.data.price - (data.data.discount * data.data.price /100  )}</span>
              <span className="text-gray-500 line-through ml-2">
                ${data.data.price}
              </span>
              <span className="text-red-500 ml-2">-{data.data.discount}%</span>
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
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product, index) => (
              <Link to={`/product/`}
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <a href={product.link} className="block h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </a>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <StarRating rating={product.rating} />
                  <div className="mt-2">
                    <span className="font-bold text-lg">${product.price}</span>
                    {product.originalPrice && (
                      <>
                        <span className="text-gray-500 line-through ml-2">
                          ${product.originalPrice}
                        </span>
                        <span className="text-red-500 ml-2">
                          -{product.discount}%
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div> */}
          <NewArrival />
        </div>
      </main>
    </ContainerUp>
  );
};

export default ProductPage;
