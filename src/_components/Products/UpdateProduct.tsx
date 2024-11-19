import { useState } from "react";

import { Button, Modal } from "antd";

import { Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { ProductInfo } from "../../d";
import useMsg from "../../_hooks/useMsg";
import { baseUrl } from "../../_functions/getData";
import MySpinner from "../MySpinner";
import Selections from "../Selections";
import { allCategories ,  allDress,
  allSubCateg,
  allColors,
  allSizes,} from "../../_constants/AddProductsData";
import MultiSelections from "../MultiSelections";


const UpdateProduct = ({
  product,
  refetch,
  token = "vendorToken",
}: {
  product: ProductInfo;
  refetch: Function;
  token: string;
}) => {
  console.log("🚀 ~ product:", product)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [isSubmit, setIsSubmit] = useState(false);

  let { msg } = useMsg();
  const [show, setShow] = useState(product.show);

  const [name, setName] = useState(product.name);
  const [details, setdetails] = useState(product.details);
  const [price, setPrice] = useState(product.price);
  const [discount, setDiscount] = useState<string | number>(product.discount);
  const [category, setCategory] = useState(product.category);
  const [sub_category, setSub_category] = useState(product.sub_category);
  const [dress, setDress] = useState(product.dress);
  const [colors, setColors] = useState<string[]>(product.colors);
  const [sizes, setSizes] = useState<string[]>(product.sizes);
  const [images, setImages] = useState([
    product.images[0],
    product.images[1],
    product.images[2],
  ]);

  const update = async () => {
    let h = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(token)}`,
      },
    };
    let d = {
      name: name,
      price: price,
      details: details,
      images: images,
      discount: discount,
      category: category,
      sub_category: sub_category,
      colors: colors,
      sizes: sizes,
      dress: dress,
      show: show,
    };

    setIsSubmit(true);
    const url =
      token == "vendorToken"
        ? `products/${product._id}`
        : `admin/products/${product._id}`;
    let res = await axios.patch(`${baseUrl}/api/${url}`, d, h);
    setIsSubmit(false);
    if (res.data.code == 400) {
      msg(res.data.msg, "error");
    } else {
      msg(res.data.msg);
    }
    console.log(res);
    refetch();
  };

  const handlePriceChange = (event: string) => {
    // Handle potential non-numeric input
    const parsedPrice = parseFloat(event);
    setPrice(isNaN(parsedPrice) ? price : parsedPrice); // Update only if valid number
  };

  // Update `colors` and `sizes` state arrays using spread syntax

  const handleColorChange = (
    value: string[]
  ) => {

    const newColors = [
      ...colors, 
      ...value.filter(color => !colors.includes(color))
    ];
    setColors(newColors);
  };

  const handleSizeChange = (value: string[] ) => {

    const newSizes = [
      ...sizes, 
      ...value.filter(size => !sizes.includes(size))
    ];
    setSizes(newSizes);
  };

  const handleImageChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newImages = [...images];
    newImages[index] = event.target.value;
    setImages(newImages);
  };


  

  return (
    <div>
      <>
        <Button className="mt-4" type="primary" onClick={showModal}>
          Update
        </Button>
        <Modal width={'70%'}
        footer={[
          <Button
            className={`${isSubmit ?`bg-green-200/45`: `bg-green-500 text-white`}`}
            disabled={isSubmit}
            onClick={update}
          >
            update
            {isSubmit && <MySpinner s="sm" />}
          </Button>
        ]}
          title="Basic Modal"
          open={isModalOpen}
          onCancel={handleCancel}
        >
          <div className="grid lg:grid-cols-3 grid-cols-2 gap-5">
            <div>
              <Text mb="2px">Name</Text>
              <Input
                mb={3}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <Text mb="2px">Price</Text>
              <Input
                mb={3}
                type="number"
                value={price}
                onChange={(e) => handlePriceChange(e.target.value)}
              />
            </div>

            <div>
              <Text mb="2px">Discount</Text>
              <Input
                mb={3}
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-5 grid-cols-3 relative">
            <div>
              <Text mb="2px">Category</Text>
              <Selections
                firstValue={category}
                values={allCategories}
                assignValue={(e: string) => setCategory(e)}
              />
            </div>
            <div>
              <Text mb="2px">Dress style</Text>
              <Selections
                firstValue={dress}
                values={allDress}
                assignValue={(e: string) => setDress(e)}
              />
            </div>

            <div>
              <Text mb="2px">Sub category</Text>
              <Selections
                firstValue={sub_category}
                values={allSubCateg}
                assignValue={(e: string) => setSub_category(e)}
              />
            </div>

            <div>
              <Text mb="2px">Colors</Text>
              <MultiSelections
                values={allColors}
                assignValue={(v: string[]) => handleColorChange(v)}
              />
            </div>

            <div>
              <Text mb="2px">Sizes</Text>
              <MultiSelections
                values={allSizes}
                assignValue={(v: string[]) => handleSizeChange(v)}
              />
            </div>
          </div>
          <Text mt={3} mb="2px">Images</Text>
              <Text>Base Image</Text>
              <div className="flex flex-col gap-5">
                <Input
                  type="text"
                  value={images[0]}
                  onChange={(e) => handleImageChange(0, e)}
                />
                <Input
                  type="text"
                  value={images[1]}
                  onChange={(e) => handleImageChange(1, e)}
                />
                <Input
                  type="text"
                  value={images[2]}
                  onChange={(e) => handleImageChange(2, e)}
                />
              </div>
                 <Text mt={3} mb="2px">Details</Text>
              <Input
                mb={3}
                type="text"
                value={details}
                onChange={(e) => setdetails(e.target.value)}
              />
              
              {token == "adminToken" && (
                <Button
                  onClick={() =>
                    show == false ? setShow(true) : setShow(false)
                  }
                >
                  {show ? "Hide" : "Show"}
                </Button>
              )}
        </Modal>
      </>
    </div>
  );
};

export default UpdateProduct;
