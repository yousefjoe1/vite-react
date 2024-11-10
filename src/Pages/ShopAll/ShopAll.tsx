import Product from "../../_components/Cards/Product";
import ContainerUp from "../../_components/ContainerUp";
import MySpinner from "../../_components/MainLayout/MySpinner";
import useFetch from "../../_hooks/useFetch";
import { ProductItem } from "../../d";

const ShopAll = () => {
  const { data, isLoading, isError, isRefetching } = useFetch(
    `products`,
    "all-products",
    true,
    ""
  );
  return (
    <ContainerUp className="container mx-auto lg:px-0 px-4 pt-5">
      <h3 className="text-center font-bold lg:text-2xl">All Products</h3>

      {isLoading ? (
        <MySpinner />
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-20">
            {data?.data?.map((product: ProductItem) => (
              <Product prod={product} key={product._id} />
            ))}
          </div>
        </>
      )}
    </ContainerUp>
  );
};

export default ShopAll;
