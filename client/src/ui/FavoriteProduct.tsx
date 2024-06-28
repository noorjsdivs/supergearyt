import { MdClose } from "react-icons/md";
import { ProductProps } from "../../type";
import { store } from "../lib/store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AddToCartBtn from "./AddToCartBtn";
import FormattedPrice from "./FormattedPrice";

const FavoriteProduct = ({ product }: { product: ProductProps }) => {
  const { removeFromFavorite } = store();
  const navigate = useNavigate();
  return (
    <div className="flex py-6">
      <div className="min-w-0 flex-1 lg:flex lg:flex-col">
        <div className="lg:flex-1">
          <div className="sm:flex">
            <div>
              <h4 className="font-medium text-gray-900">{product?.name}</h4>
              <p className="mt-2 hidden text-sm text-gray-500 sm:block">
                {product?.description}
              </p>
              <p className="text-sm mt-1">
                Brand: <span className="font-medium">{product?.brand}</span>
              </p>
              <p className="text-sm mt-1">
                Category:{" "}
                <span className="font-medium">{product?.category}</span>
              </p>
            </div>
            <span
              onClick={() => {
                removeFromFavorite(product?._id);
                toast.success("Removed from favorite successfully!");
              }}
              className="text-lg text-gray-600 hover:text-red-600 duration-200 cursor-pointer inline-block mt-4 sm:mt-0"
            >
              <MdClose />
            </span>
          </div>
          <div className="flex text-sm items-center gap-6 font-medium py-4">
            <AddToCartBtn product={product} className="w-32" />
          </div>
        </div>
        <p>
          You are saving{" "}
          <span className="text-sm font-semibold text-green-500">
            <FormattedPrice
              amount={product?.regularPrice - product?.discountedPrice}
            />
          </span>{" "}
          upon purchase
        </p>
      </div>
      <div
        onClick={() => navigate(`/product/${product?._id}`)}
        className="ml-4 flex-shrink-0 h-20 w-20 sm:w-40 sm:h-40 sm:order-first sm:m-0 sm:mr-6 border border-gray-200 rounded-md hover:border-skyText duration-200 cursor-pointer group overflow-hidden"
      >
        <img
          src={product?.images[0]}
          alt="productImage"
          className="h-full w-full rounded-lg object-cover object-center group-hover:scale-110 duration-200"
        />
      </div>
    </div>
  );
};

export default FavoriteProduct;
