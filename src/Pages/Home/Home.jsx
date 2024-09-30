import CustomerReviews from "./Components/CustomerReviews";
import Hero from "./Components/Hero";
import BrowseByStyle from "./Components/BrowseByStyle";

const Home = () => {
  return (
    <div>
      <Hero />
      <BrowseByStyle />
      <CustomerReviews />
    </div>
  );
};

export default Home;
