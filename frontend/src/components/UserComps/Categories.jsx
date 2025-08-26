import styles from "../../styles/styles";
import { useNavigate } from "react-router-dom";
import { ShippingIcon } from "../../static/ShippingIcon";
import { DailySurpriseIcon } from "../../static/DailySurpriseIcon";
import { AffordablePricesIcon } from "../../static/AffordablePricesIcon";
import { SecurePaymentIcon } from "../../static/SecurePaymentIcon";
import { categoriesData } from "../../static/data";

const brandingData = [
  {
    id: 1,
    title: "Free Shipping",
    Description: "From all orders over 100$",
    icon: <ShippingIcon />,
  },
  {
    id: 21,
    title: "Daily Surprise Offers",
    Description: "Save up to 25% off",
    icon: <DailySurpriseIcon />,
  },
  {
    id: 4,
    title: "Affortable Prices",
    Description: "Get Factory direct price",
    icon: <AffordablePricesIcon />,
  },
  {
    id: 5,
    title: "Secure Payments",
    Description: "100% protected payments",
    icon: <SecurePaymentIcon />,
  },
];

function Categories() {
  const navigate = useNavigate();
  return (
    <>
      <div className={`${styles.section} hidden sm:block`}>
        <div
          className={`branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md`}
        >
          {brandingData.map((brand, i) => (
            <div className="flex items-start" key={i}>
              {brand.icon}
              <div className="px-3">
                <h3 className="font-bold text-sm md:text-base">
                  {brand.title}
                </h3>
                <p className="text-xs md:text-sm">{brand.Description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`${styles.section} bg-white p-6 rounded-lg mb-12`}
        id="categories"
      >
        <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
          {categoriesData &&
            categoriesData.map(category => {
              function handleSubmit(category) {
                navigate(`/products?category=${category.title}`);
              }
              return (
                <div
                  className="w-full h-[100px] flex items-center justify-between cursor-pointer overflow-hidden"
                  key={category.id}
                  onClick={() => handleSubmit(category)}
                >
                  <h5 className={`text-[18px] leading-[1.3]`}>
                    {category.title}
                  </h5>
                  <img
                    src={category.image_Url}
                    className="w-[120px] object-cover"
                    alt="Category Image"
                  />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Categories;
