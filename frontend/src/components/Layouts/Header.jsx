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
import { RxCross1 } from "react-icons/rx";
import { AnimatePresence, motion } from "framer-motion";
import Dropdown from "./Dropdown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import WishList from "../UserComps/WishList";
import Cart from "../UserComps/Cart";
import Logo from "../ui/Logo";
import { dropdownVariants, drawer, backdrop, springy } from "../../lib/motion";

/** Cart / wishlist count bubble that pops whenever the number changes. */
function CountBadge({ count = 0, tone = "accent" }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={count}
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.4, opacity: 0 }}
        transition={springy}
        className={`absolute -right-1.5 -top-1.5 grid h-[18px] min-w-[18px] place-items-center rounded-full px-1 text-[11px] font-bold leading-none ring-2 ring-ink-900 ${
          tone === "accent"
            ? "bg-accent-400 text-ink-900"
            : "bg-brand-500 text-white"
        }`}
      >
        {count}
      </motion.span>
    </AnimatePresence>
  );
}

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

    if (!term.trim()) {
      setSearchData(null);
      return;
    }

    const filteredProducts = allProducts.filter(product =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchData(filteredProducts);
  }

  function clearSearch() {
    setSearchTerm("");
    setSearchData(null);
  }

  useEffect(function () {
    function onScroll() {
      setActive(window.scrollY > 70);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open
  useEffect(
    function () {
      document.body.style.overflow = open ? "hidden" : "";
      return () => {
        document.body.style.overflow = "";
      };
    },
    [open]
  );

  const searchResults = (searchData || []).slice(0, 6);

  return (
    <>
      {/* ================= Top utility bar (desktop) ================= */}
      <div className={`${styles.section}`}>
        <div className="hidden h-800px-50 my-800px-20 flex-800px items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>

          {/* ---- Search ------------------------------------------- */}
          <div className="relative w-[50%]">
            <div className="group relative">
              <AiOutlineSearch
                size={20}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400 transition-colors duration-200 group-focus-within:text-brand-600"
              />
              <input
                type="text"
                placeholder="Search for products, brands and categories…"
                value={searchTerm}
                onChange={handleSearchChange}
                className="h-[46px] w-full rounded-full border border-ink-200 bg-white pl-12 pr-11 text-[14px] text-ink-900 shadow-sm transition-all duration-300 placeholder:text-ink-400 focus:border-brand-400 focus:shadow-card focus:ring-4 focus:ring-brand-500/10"
              />
              <AnimatePresence>
                {searchTerm && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    onClick={clearSearch}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-700"
                  >
                    <RxCross1 size={13} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {searchData !== null && searchTerm.trim() && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute left-0 top-[54px] z-30 w-full overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-panel"
                >
                  {searchResults.length === 0 ? (
                    <div className="px-5 py-8 text-center">
                      <p className="text-[15px] font-semibold text-ink-800">
                        No matches for “{searchTerm}”
                      </p>
                      <p className="mt-1 text-[13px] text-ink-400">
                        Try a different keyword or browse all products.
                      </p>
                    </div>
                  ) : (
                    <>
                      <p className="border-b border-ink-100 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                        {searchData.length} result
                        {searchData.length === 1 ? "" : "s"}
                      </p>
                      <div className="max-h-[340px] overflow-y-auto p-2">
                        {searchResults.map((prod, i) => (
                          <motion.div
                            key={prod._id || i}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.04, duration: 0.25 }}
                          >
                            <Link
                              to={`/product/${prod._id}`}
                              onClick={clearSearch}
                              className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-200 hover:bg-ink-50"
                            >
                              <img
                                src={`${prod?.images[0]?.url}`}
                                alt={prod.name}
                                className="h-11 w-11 shrink-0 rounded-lg border border-ink-100 bg-white object-contain p-1"
                              />
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-[14px] font-medium text-ink-800">
                                  {prod.name}
                                </p>
                                <p className="text-[12px] text-ink-400">
                                  {prod.shop?.name}
                                </p>
                              </div>
                              <span className="shrink-0 font-display text-[14px] font-bold text-ink-900">
                                ${prod.discountPrice}
                              </span>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ---- Seller CTA --------------------------------------- */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <Link
              to={`${isSeller ? "/dashboard" : "/shop-create"}`}
              className="group flex h-[46px] w-[180px] items-center justify-center gap-1 rounded-full bg-ink-900 font-semibold text-white shadow-card transition-all duration-300 hover:bg-ink-800 hover:shadow-card-hover"
            >
              {isSeller ? "Your Shop" : "Become Seller"}
              <IoIosArrowForward className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ================= Primary nav (desktop) ==================== */}
      <div
        className={`hidden flex-800px w-full items-center justify-between bg-ink-900 transition-shadow duration-300 ${
          active
            ? "fixed left-0 top-0 z-40 h-[64px] shadow-panel"
            : "relative h-[70px]"
        }`}
      >
        <div
          className={`${styles.section} relative ${styles.normalFlex} justify-between`}
        >
          {/* Categories */}
          <div className="relative mt-[10px] hidden h-[60px] w-[270px] m1000px-block">
            <button
              onClick={() => setDropdown(!dropdown)}
              className="relative flex h-[52px] w-full cursor-pointer select-none items-center justify-between rounded-t-xl bg-white pl-11 pr-4 text-[15px] font-semibold text-ink-800 transition-colors duration-200 hover:bg-ink-50"
            >
              <BiMenuAltLeft
                size={24}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-600"
              />
              All Categories
              <motion.span
                animate={{ rotate: dropdown ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="text-ink-500"
              >
                <IoIosArrowDown size={18} />
              </motion.span>
            </button>

            <AnimatePresence>
              {dropdown && (
                <Dropdown
                  categoriesData={categoriesData}
                  setDropdown={setDropdown}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Nav items */}
          <div className={`${styles.normalFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-5">
            <motion.button
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              className="relative cursor-pointer text-white/85 transition-colors hover:text-white"
              onClick={() => setOpenWishList(true)}
              aria-label="Open wishlist"
            >
              <AiOutlineHeart size={26} />
              <CountBadge count={(wishlist && wishlist.length) || 0} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              className="relative cursor-pointer text-white/85 transition-colors hover:text-white"
              onClick={() => setOpenCart(true)}
              aria-label="Open cart"
            >
              <AiOutlineShoppingCart size={26} />
              <CountBadge count={(cart && cart.length) || 0} />
            </motion.button>

            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}>
              {isAuthenticated ? (
                <Link to="/profile" aria-label="Your profile">
                  <img
                    src={`${user?.avatar?.url}`}
                    alt="Profile"
                    className="h-[36px] w-[36px] rounded-full object-cover ring-2 ring-white/25 transition-all duration-300 hover:ring-accent-400"
                  />
                </Link>
              ) : (
                <Link
                  to="/login"
                  aria-label="Sign in"
                  className="block text-white/85 transition-colors hover:text-white"
                >
                  <CgProfile size={26} />
                </Link>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Spacer so content doesn't jump when the nav becomes fixed */}
      {active && <div className="hidden flex-800px h-[64px] w-full" />}

      {/* Popups (shared by desktop + mobile) */}
      <AnimatePresence>
        {openCart && <Cart setOpenCart={setOpenCart} />}
      </AnimatePresence>
      <AnimatePresence>
        {openWishList && <WishList setOpenWishList={setOpenWishList} />}
      </AnimatePresence>

      {/* ================= Mobile header ============================ */}
      <div
        className={`mb-nav-hidden-at-800px left-0 top-0 z-50 h-[64px] w-full border-b border-ink-100 bg-white ${
          active ? "fixed z-40 shadow-card" : "relative"
        }`}
      >
        <div className="flex h-full w-full items-center justify-between px-4">
          <button onClick={() => setOpen(true)} aria-label="Open menu">
            <BiMenuAltLeft size={32} className="cursor-pointer text-ink-800" />
          </button>

          <Link to="/">
            <Logo size="sm" />
          </Link>

          <motion.button
            whileTap={{ scale: 0.88 }}
            className="relative cursor-pointer text-ink-800"
            onClick={() => setOpenCart(true)}
            aria-label="Open cart"
          >
            <AiOutlineShoppingCart size={26} />
            <span className="absolute -right-1.5 -top-1.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-brand-600 px-1 text-[11px] font-bold leading-none text-white ring-2 ring-white">
              {(cart && cart.length) || 0}
            </span>
          </motion.button>
        </div>
      </div>
      {active && <div className="mb-nav-hidden-at-800px h-[64px] w-full" />}

      {/* ---- Mobile drawer ------------------------------------------ */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[60] bg-ink-950/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              variants={drawer("left")}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={e => e.stopPropagation()}
              className="flex h-full w-[82%] max-w-[340px] flex-col overflow-y-auto bg-white shadow-panel"
            >
              {/* drawer head */}
              <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
                <Logo size="sm" />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-9 w-9 place-items-center rounded-full text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900"
                >
                  <RxCross1 size={17} />
                </button>
              </div>

              {/* drawer search */}
              <div className="px-5 pt-5">
                <div className="relative">
                  <AiOutlineSearch
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400"
                  />
                  <input
                    type="search"
                    placeholder="Search products…"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="h-[44px] w-full rounded-xl border border-ink-200 bg-ink-50 pl-10 pr-3 text-[14px] transition-all duration-200 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                  />
                </div>

                <AnimatePresence>
                  {searchData !== null && searchTerm.trim() && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 overflow-hidden rounded-xl border border-ink-100"
                    >
                      {searchResults.length === 0 ? (
                        <p className="px-3 py-4 text-center text-[13px] text-ink-400">
                          No products found.
                        </p>
                      ) : (
                        searchResults.map((prod, i) => (
                          <Link
                            to={`/product/${prod._id}`}
                            key={prod._id || i}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 border-b border-ink-100 px-3 py-2.5 last:border-0 hover:bg-ink-50"
                          >
                            <img
                              src={prod?.images[0]?.url}
                              alt={prod.name}
                              className="h-9 w-9 rounded-md object-contain"
                            />
                            <span className="truncate text-[13px] text-ink-700">
                              {prod.name}
                            </span>
                          </Link>
                        ))
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* drawer nav */}
              <div className="mt-5 flex-1 px-2">
                <Navbar active={activeHeading} mobile />
              </div>

              {/* drawer footer */}
              <div className="space-y-4 border-t border-ink-100 p-5">
                <button
                  onClick={() => {
                    setOpenWishList(true);
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium text-ink-700 transition-colors hover:bg-ink-50"
                >
                  <span className="relative">
                    <AiOutlineHeart size={22} />
                    <span className="absolute -right-2 -top-1.5 grid h-[16px] min-w-[16px] place-items-center rounded-full bg-danger-500 px-1 text-[10px] font-bold text-white">
                      {(wishlist && wishlist.length) || 0}
                    </span>
                  </span>
                  Wishlist
                </button>

                <Link
                  to={isSeller ? "/dashboard" : "/shop-create"}
                  onClick={() => setOpen(false)}
                  className="flex h-[46px] w-full items-center justify-center gap-1 rounded-xl bg-ink-900 font-semibold text-white transition-colors hover:bg-ink-800"
                >
                  {isSeller ? "Your Shop" : "Become Seller"}
                  <IoIosArrowForward />
                </Link>

                {!isAuthenticated ? (
                  <div className="flex gap-3">
                    <Link
                      to="/login"
                      onClick={() => setOpen(false)}
                      className="flex h-[44px] flex-1 items-center justify-center rounded-xl border border-ink-200 font-semibold text-ink-700 transition-colors hover:bg-ink-50"
                    >
                      Login
                    </Link>
                    <Link
                      to="/sign-up"
                      onClick={() => setOpen(false)}
                      className="flex h-[44px] flex-1 items-center justify-center rounded-xl bg-brand-600 font-semibold text-white transition-colors hover:bg-brand-700"
                    >
                      Sign up
                    </Link>
                  </div>
                ) : (
                  <Link
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-xl border border-ink-100 p-3 transition-colors hover:bg-ink-50"
                  >
                    <img
                      src={`${user?.avatar?.url}`}
                      alt="Profile"
                      className="h-11 w-11 rounded-full object-cover ring-2 ring-brand-100"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-semibold text-ink-900">
                        {user?.fullName}
                      </p>
                      <p className="text-[12px] text-ink-400">View profile</p>
                    </div>
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
