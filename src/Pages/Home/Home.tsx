import CustomerReviews from "./Components/CustomerReviews";
import Hero from "./Components/Hero";
import BrowseByStyle from "./Components/BrowseByStyle";
import NewArrival from "./Components/NewArrival";

const Home = () => {
  return (
    <>
      <Hero />
      <NewArrival title='New Arrival' />
      <NewArrival title='Top Selling'/>
      <BrowseByStyle />
      <CustomerReviews />
    </>
  );
};

export default Home;
