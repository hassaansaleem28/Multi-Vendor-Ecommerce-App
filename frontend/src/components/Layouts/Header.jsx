import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import { categoriesData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BiMenuAltLeft } from "react-icons/bi";
import Dropdown from "./Dropdown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import WishList from "../UserComps/WishList";
import { RxCross1 } from "react-icons/rx";
import Cart from "../UserComps/Cart";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Header({ activeHeading }) {
  const { isAuthenticated, user } = useSelector(state => state.user);
  const { isSeller } = useSelector(state => state.seller);
  const { cart } = useSelector(state => state.cart);
  const { wishlist } = useSelector(state => state.wishlist);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishList, setOpenWishList] = useState(false);
  const { allProducts } = useSelector(state => state.product);

  function handleSearchChange(e) {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts = allProducts.filter(product =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchData(filteredProducts);
  }
  useEffect(function () {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 70) setActive(true);
      else setActive(false);
    });
  }, []);

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden h-800px-50 my-800px-20 flex-800px items-center justify-between">
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt="Logo"
              />
            </Link>
          </div>
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full h-[40px] px-2 border-[2px] border-[#3597db] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData.map((prod, i) => {
                  const d = prod.name;
                  const Product = d.replace(/\s+/g, "-");
                  return (
                    <Link to={`/product/${Product}`} key={i}>
                      <div className="w-full flex items-start py-3">
                        <img
                          src={`${API_BASE_URL}/${prod.images[0]}`}
                          className="w-[40px] h-[40px] mr-[10px]"
                        />
                        <h1>{prod.name}</h1>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
          <div className={`${styles.button} rounded-xl`}>
            <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
              <h1 className="text-[#fff] flex font-bold items-center ">
                {isSeller ? "Your Shop" : "Become Seller"}
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transiton hidden flex-800px items-center justify-between w-full h-[70px] bg-[#3321c8]`}
      >
        <div
          className={`${styles.section} relative ${styles.normalFlex} justify-between`}
        >
          {/* Categories */}
          <div>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden m1000px-block">
              <div
                onClick={() => setDropdown(!dropdown)}
                className="flex items-center justify-center"
              >
                <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
                <button
                  className={`h-full w-full flex justify-between items-center pl-10 bg-white font-sans py-[1rem] cursor-pointer text-lg font-500 select-none rounded-t-md font-medium`}
                >
                  All Categories
                </button>
                <IoIosArrowDown
                  size={20}
                  className="absolute right-2 top-4 cursor-pointer"
                />
              </div>
              {dropdown ? (
                <Dropdown
                  categoriesData={categoriesData}
                  setDropdown={setDropdown}
                />
              ) : null}
            </div>
          </div>
          {/* NavItems */}
          <div className={`${styles.normalFlex}`}>
            <Navbar active={activeHeading} />
          </div>
          <div className="flex">
            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishList(true)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>
            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  className="cursor-pointer"
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>
            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={`${user?.avatar?.url}`}
                      alt="Image "
                      className="w-[35px] rounded-full h-[35px]"
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>
            {/* Cart popup */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
            {/* Wishlist popup */}
            {openWishList ? (
              <WishList setOpenWishList={setOpenWishList} />
            ) : null}
          </div>
        </div>
      </div>
      {/* Mobile header */}
      <div
        className={`w-full h-[70px] mb-nav-hidden-at-800px bg-[#fff] z-50 top-0 left-0 shadow-sm ${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4 cursor-pointer"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt="Logo"
                className="mt-3"
              />
            </Link>
          </div>
          <div>
            <div
              className="relative mr-[20px] cursor-pointer"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} className="cursor-pointer" />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
          </div>
          {/* Cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
          {/* Wishlist popup */}
          {openWishList ? <WishList setOpenWishList={setOpenWishList} /> : null}
        </div>
        {/* Header sidebar */}
        {open && (
          <div className="fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0 ">
            <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div
                    className="relative mr-[15px] cursor-pointer"
                    onClick={() => setOpenWishList(true) || setOpen(false)}
                  >
                    <AiOutlineHeart
                      size={30}
                      className="mt-5 ml-3 cursor-pointer"
                    />
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                      {wishlist && wishlist.length}
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={30}
                  className="ml-4 mt-5 cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="my-8 w-[92%] m-auto h-[40px] relative">
                <input
                  type="search"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full h-[40px] px-2 border-[2px] border-[#3597db] rounded-md"
                />
                {searchData && (
                  <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                    {searchData.map((prod, i) => {
                      return (
                        <Link to={`/product/${prod._id}`} key={i}>
                          <div className="flex items-center cursor-pointer">
                            <img
                              src={prod.image_Url[0].url}
                              className="w-[50px] mr-2"
                            />
                            <h5>{prod.name}</h5>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
              <Navbar active={activeHeading} />
              <div className={`${styles.button} ml-4 !rounded-xl text-[20px]`}>
                <Link to="/shop-create">
                  <h1 className="text-[#fff] flex font-bold items-center cursor-pointer">
                    {isSeller ? "Your Shop" : "Become Seller"}
                    <IoIosArrowForward className="ml-1 cursor-pointer" />
                  </h1>
                </Link>
              </div>
              <br />
              <br />
              <br />
              <div className="flex w-full justify-center">
                {!isAuthenticated ? (
                  <>
                    <Link
                      to={"/login"}
                      className="cursor-pointer text-[18px] pr-[10px] text-[#000000b7]"
                    >
                      Login /
                    </Link>
                    <Link
                      to={"/sign-up"}
                      className="text-[18px] pr-[10px] text-[#000000b7]"
                    >
                      Sign up
                    </Link>
                  </>
                ) : (
                  <div>
                    <Link to={"/profile"}>
                      <img
                        src={`${API_BASE_URL}/${user.avatar.url}`}
                        alt="Image "
                        className="w-[60px] rounded-full h-[60px] border-[3px] border-[#14febc] cursor-pointer"
                      />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Header;
