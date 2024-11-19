import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = () => {

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        {" "}
        <Outlet />{" "}
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
