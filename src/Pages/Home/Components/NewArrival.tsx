import useFetch from "../../../_hooks/useFetch";
import Product from "../../../_components/Cards/Product";
import { Button } from "@chakra-ui/react";
import MySpinner from "../../../_components/MainLayout/MySpinner";
import { ProductItem } from "../../../d";

const NewArrival = ({ title }:{title: string}) => {
  const { data, isLoading, isError } = useFetch(
    `products?count=4`,
    "p-by-count",true
  );

  return (
    <section className="p-4 md:p-8 container mx-auto">
      <h3 className="font-bold text-center text-4xl mb-5">{title}</h3>

      {
        isLoading ? <MySpinner />:
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.data?.map((product:ProductItem) => (
            <Product prod={product} key={product._id} />
          ))}
        </div>
      }

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
    </section>
  );
};

export default NewArrival;
