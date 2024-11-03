import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

import { useRegisterSW } from 'virtual:pwa-register/react'
const MainLayout = () => {
const {
  offlineReady: [offlineReady, setOfflineReady],
  needRefresh: [needRefresh, setNeedRefresh],
  updateServiceWorker,
} = useRegisterSW({
  onRegistered(r) {
    console.log('SW Registered:', r)
  },
  onRegisterError(error) {
    console.log('SW registration error', error)
  },
})

const close = () => {
  setOfflineReady(false)
  setNeedRefresh(false)
}
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
