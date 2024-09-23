import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        {" "}
        <Outlet />{" "}
      </div>
      <footer>Footer</footer>
    </>
  );
};

export default MainLayout;
