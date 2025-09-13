import ShopInfo from "../components/SellerComps/ShopInfo";
import ShopProfileData from "../components/SellerComps/ShopProfileData";
import styles from "../styles/styles";

function ShopHomePage() {
  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
      <div className="w-full flex-800px py-10 justify-between">
        <div className="width-800px-25 bg-[#fff] rounded-[4px] shadow-sm overflow-scroll-800 height-800px-90 position-800px top-10 left-0 z-10">
          <ShopInfo isOwner={true} />
        </div>
        <div className="width-800px-75per mt-5 marigin-800px-unset rounded-[4px]">
          <ShopProfileData isOwner={true} />
        </div>
      </div>
    </div>
  );
}

export default ShopHomePage;
