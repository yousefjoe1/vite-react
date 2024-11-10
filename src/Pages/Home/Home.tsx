import CustomerReviews from "./Components/CustomerReviews";
import Hero from "./Components/Hero";
import BrowseByStyle from "./Components/BrowseByStyle";
import ProductsSection from "./Components/ProductsSection";

const Home = () => {
  return (
    <>
      <Hero />
      <ProductsSection title='New Arrival' link="new-arrival" api="products?extraQuery=new-arrivals&count=4"/>
      <ProductsSection title='Top Selling' link="top-selling" api="products?count=4"/>
      <BrowseByStyle />
      <CustomerReviews />
    </>
  );
};

export default Home;
