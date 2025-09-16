import { useEffect, useState } from "react";
import ProductCard from "../UserComps/ProductCard";
import { Link, useParams } from "react-router-dom";
import styles from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux-toolkit/actions/productActions";
import Ratings from "../UserComps/Ratings";
import { getAllEventsShop } from "../../redux-toolkit/actions/eventActions";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ShopProfileData({ isOwner }) {
  const [active, setActive] = useState(1);
  const { product } = useSelector(state => state.product);
  const dispatch = useDispatch();
  const { events } = useSelector(state => state.events);
  const { seller } = useSelector(state => state.seller);
  const { id } = useParams();

  const allReviews = product && product.map(product => product.reviews).flat();

  useEffect(
    function () {
      dispatch(getAllProductsShop(id));
      dispatch(getAllEventsShop(seller._id));
    },
    [dispatch]
  );
  return (
    <div className="w-full">
      <div className="flex-800px w-full items-center justify-between">
        <div className="w-full flex mb-15">
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 1 ? " text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Shop Products
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(2)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 2 ? " text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Running Events
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(3)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 3 ? " text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Shop Reviews
            </h5>
          </div>
        </div>
        <div>
          {isOwner && (
            <div>
              <Link to={"/dashboard"}>
                <div
                  className={`${styles.button} ml-20 mt-[-15px] font-[600] !rounded-[8px]`}
                >
                  <span className="text-[#fff]">Dashboard</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
      <br />
      {active === 1 && (
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
          {product &&
            product.map((product, index) => (
              <ProductCard key={index} product={product} isShop={true} />
            ))}
        </div>
      )}
      {active === 2 && (
        <div className="w-full">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
            {events &&
              events.map((product, index) => (
                <ProductCard
                  key={index}
                  product={product}
                  isShop={true}
                  isEvent={true}
                />
              ))}
          </div>
        </div>
      )}
      {active === 3 && (
        <div className="w-full">
          {allReviews &&
            allReviews?.map((data, i) => (
              <div className="w-full flex my-4">
                <img
                  src={`${data.user.avatar.url}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full object-cover"
                  key={i}
                />
                <div className="pl-2">
                  <div className="w-full flex items-center">
                    <h1 className="font-[600] pr-2">{data.user.fullName}</h1>
                    <Ratings rating={data.rating} />
                    <p className="text-[#000000a7] text-[14px]">
                      {"10 days ago"}
                    </p>
                  </div>
                  <p className="font-[400] text-[#000000a7]">{data?.comment}</p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default ShopProfileData;
