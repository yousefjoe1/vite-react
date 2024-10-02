import CustomerReviews from "./Components/CustomerReviews";
import Hero from "./Components/Hero";
import BrowseByStyle from "./Components/BrowseByStyle";
import NewArrival from "./Components/NewArrival";

const Home = () => {
  return (
    <div>
      <Hero />
      <NewArrival />
      <BrowseByStyle />
      <CustomerReviews />
    </div>
  );
};

export default Home;
