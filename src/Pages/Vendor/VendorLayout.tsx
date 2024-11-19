import { Link, Outlet } from "react-router-dom";
import useFetch from "../../_hooks/useFetch";
import { Button } from "@chakra-ui/react";
import { Message } from "primereact/message";
import MySpinner from "../../_components/MySpinner";

const VendorLayout = () => {
  const { data, isLoading, isError } = useFetch(
    `vendors/verify-vendor`,
    "verify-vendor",
    true,
    "vendorToken"
  );
  console.log("🚀 ~ VendorLayout ~ data:", data)

  

  if (isLoading) {
    return <MySpinner />;
  }

  if (isError) {
    return <Message severity="error" text="Error Message" />;
  }

  return (
    <>
      {data?.code == 400 || data?.status == 404 ? (
        <div className="flex justify-center mt-20">
          <Button to={`/auth?mode=login`} mx={"auto"} as={Link}>
            You are not autharized, go back to login.
          </Button>
        </div>
      ) : (
        <div className="container mx-auto py-4">
          <nav>Vendor nav</nav>
          <Outlet />
        </div>
      )}
    </>
  );
};

export default VendorLayout;
