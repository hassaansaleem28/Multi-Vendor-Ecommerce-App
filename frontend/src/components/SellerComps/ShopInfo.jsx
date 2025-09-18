import styles from "../../styles/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../UserComps/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux-toolkit/actions/productActions";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ShopInfo({ isOwner }) {
  const [data, setData] = useState({});
  const { product } = useSelector(state => state.product);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const totalReviewsLength =
    product && product.reduce((acc, prod) => acc + prod.reviews.length, 0);
  const totalRatings =
    product &&
    product.reduce(
      (acc, prod) =>
        acc + prod.reviews.reduce((sum, rev) => sum + rev.rating, 0),
      0
    );
  const avgRating = totalRatings / totalReviewsLength || 0;

  const { id } = useParams();

  useEffect(
    function () {
      async function getData() {
        try {
          setIsLoading(true);
          dispatch(getAllProductsShop(id));
          const res = await axios.get(
            `${API_BASE_URL}/api/v2/seller/get-shop-info/${id}`
          );
          setData(res.data.shop);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
          setIsLoading(false);
        }
      }
      getData();
    },
    [dispatch]
  );

  async function logoutHandler() {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${API_BASE_URL}/api/v2/seller/logout-seller`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        window.location.href = "/shop-create";
      } else {
        console.error("Logout failed:", res.data.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="w-full py-5">
            <div className="w-full flex items-center justify-center">
              <img
                src={`${data?.avatar?.url}`}
                alt="Iamge"
                className="w-[150px] h-[150px] object-cover rounded-full"
              />
            </div>
            <h3 className="text-center py-2 text-[20px]">{data?.name}</h3>
            <p className="text-[16px] text-[#000000a6] p-[10px] items-center">
              {data?.description}
            </p>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Address</h5>
            <h4 className="text-[#000000a6]">{data?.address}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Phone Number</h5>
            <h4 className="text-[#000000a6]">{data?.phoneNumber}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Total Products</h5>
            <h4 className="text-[#000000a6]">{product && product.length}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Shop Ratings</h5>
            <h4 className="text-[#000000a6]">{avgRating}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Joined on</h5>
            <h4 className="text-[#000000a6]">
              {data?.createdAt?.slice(0, 10)}
            </h4>
          </div>
          {isOwner && (
            <div className="py-3 px-4">
              <Link to={"/dashboard-settings"}>
                <div
                  className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
                >
                  <span className="text-white">Edit Shop</span>
                </div>
              </Link>
              <div
                className={`${styles.button} !w-full !h-[42px] !rounded-[5px] cursor-pointer`}
                onClick={logoutHandler}
              >
                <span className="text-white cursor-pointer">Log out</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ShopInfo;
