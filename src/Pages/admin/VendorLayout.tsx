import { Link, Outlet } from "react-router-dom";
import useFetch from "../../_hooks/useFetch";
import MySpinner from "../../_components/MainLayout/MySpinner";
import { Button } from "@chakra-ui/react";

const VendorLayout = () => {
  const { data, isLoading, isError } = useFetch(
    `users/verify-user`,
    "verify-vendor",
    true,
    "vendorToken"
  );

  if (isLoading) {
    return <MySpinner />;
  }

  console.log(data,'verify vendor');
  

  return (
    <>
      {data.code == 400  ? (
        <div className="flex justify-center mt-20">
          <Button to={`/auth?mode=login`} mx={"auto"} as={Link}>
            You are not autharized, go back to login.
          </Button>
        </div>
      ) : (
        <>
          <nav>Admin nav</nav>
          <Outlet />
        </>
      )}
    </>
  );
};

export default VendorLayout;
