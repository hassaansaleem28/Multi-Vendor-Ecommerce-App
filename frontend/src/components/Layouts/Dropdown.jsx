import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

function Dropdown({ categoriesData, setDropdown }) {
  const navigate = useNavigate();

  function handleCategoryClick(category) {
    navigate(`/products?category=${category.title}`);
    setDropdown(false);
    window.location.reload();
  }
  return (
    <div className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm">
      {categoriesData &&
        categoriesData.map((category, i) => {
          return (
            <div
              key={i}
              className={`${styles.normalFlex}`}
              onClick={() => handleCategoryClick(category)}
            >
              <img
                src={category.image_Url}
                style={{
                  width: "25px",
                  height: "25px",
                  objectFit: "contain",
                  marginLeft: "10px",
                  userSelect: "none",
                }}
                alt="Category Image"
              />
              <h3 className="m-3 cursor-pointer select-none">
                {category.title}
              </h3>
            </div>
          );
        })}
    </div>
  );
}

export default Dropdown;
