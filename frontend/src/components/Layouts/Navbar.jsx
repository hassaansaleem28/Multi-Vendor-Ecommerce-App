import { Link } from "react-router-dom";
import { navItems } from "../../static/data";

function Navbar({ active }) {
  return (
    <div className={`block flex-with-items-center`}>
      {navItems.map((item, index) => (
        <div className="flex" key={index}>
          <Link
            to={item.url}
            className={`${
              active === index + 1
                ? "text-[#17dd1f]"
                : "text-black text-color-for-800px"
            } pb-[30px] padding-nav-800px marigin-top-800px font-[500] px-6 cursor-pointer `}
          >
            {item.title}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Navbar;
