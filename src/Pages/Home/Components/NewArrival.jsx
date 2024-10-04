import React from "react";
import useFetch from "../../../_hooks/useFetch";
import MySpinner from "../../../_components/MainLayout/MySpinner";
import Product from "../../../_components/Cards/Product";
import { Button } from "@chakra-ui/react";

const NewArrival = () => {
  const { data, isLoading, isError } = useFetch(`products?count=4`);

  return (
    <div className="p-4 md:p-8 container mx-auto">

      <h3 className="font-bold text-center text-4xl mb-5">NEW ARRIVALS</h3>
      {isLoading ? (
        <MySpinner />
      ) : (
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-5">
          {data?.data?.map((prod) => (
            <Product prod={prod} key={prod._id} />
          ))}
        </div>
      )}

      <div className="flex justify-center mt-10">
        <Button
          mx={"auto"}
          colorScheme="#0000001A"
          w={215}
          rounded={"3xl"}
          variant="outline"
        >
          View more
        </Button>
      </div>
    </div>
  );
};

export default NewArrival;
