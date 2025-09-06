import { useState } from "react";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import Ratings from "./Ratings";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ProductDetailsInfo({ data, product, totalReviewsLength, avgRating }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#f5f6fb] px-3 padding-at-800px py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={`text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer textAt-800px`}
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={`text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer textAt-800px`}
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={`text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer textAt-800px`}
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            {data.description}
          </p>
        </>
      ) : null}
      {active === 2 ? (
        <div
          className="w-full min-h-[40vh] flex py-3 flex-col overflow-y-hidden
         items-center"
        >
          {data?.reviews?.map((review, i) => (
            <div className="w-full flex my-2" key={i}>
              <img
                src={`${API_BASE_URL}/${review?.user?.avatar?.url}`}
                alt=""
                className="w-[50px] h-[50px] rounded-full"
              />
              <div className="pl-2 ">
                <div className="w-full flex items-center">
                  <h1 className="font-[500] mr-3">{review?.user?.fullName}</h1>
                  <Ratings rating={data?.ratings} />
                </div>
                <p>{review?.comment}</p>
              </div>
            </div>
          ))}
          <div className="w-full flex justify-center">
            {data && data?.reviews?.length === 0 && <h5>No reviews yet!</h5>}
          </div>
        </div>
      ) : null}
      {active === 3 && (
        <div className="w-full block flex-800px p-5">
          <div className="w-full width-800px-50">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => navigate(`/shop/preview/${data.shop._id}`)}
            >
              <img
                src={`${API_BASE_URL}/${data.shop.avatar.url}`}
                alt="Image"
                className="w-[50px] h-[50px] rounded-full"
              />
              <div className="pl-3">
                <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                <h5 className="pb-2 text-[15px]">({avgRating}/5) Ratings</h5>
              </div>
            </div>
            <p className="pt-2">{data.shop.description}</p>
          </div>
          <div className="w-full width-800px-50 mt-5 marigin-top-800px flex-800px flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on :{" "}
                <span className="font-[500]">
                  {data?.shop?.createdAt?.slice(0, 10)}
                </span>
              </h5>{" "}
              <h5 className="font-[600] pt-3">
                Total Products :{" "}
                <span className="font-[500]">{product.length}</span>
              </h5>{" "}
              <h5 className="font-[600] pt-3">
                Total Reviews :{" "}
                <span className="font-[500]">{totalReviewsLength}</span>
              </h5>
              <Link to={"/"}>
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-white font-bold">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailsInfo;
