import { Link } from "react-router-dom";
import Rate from "../Rate";
import { ProductItem } from "../../d";

const Product = ({ prod }: { prod: ProductItem }) => {
  return (
    <>
      <Link onClick={()=> document.body.scrollIntoView()} to={`/product/${prod._id}`} className="lg:max-w-[295px]">
        <div className="block h-64 overflow-hidden">
          <img
            src={prod.images[0]}
            alt={prod.name}
            className="w-full h-full lg:object-cover object-contain rounded-3xl"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">{prod.name}</h3>
          <Rate rate={prod.rate} />
          <div className="mt-2">
            <span className="font-bold text-lg">${prod.price}</span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Product;
