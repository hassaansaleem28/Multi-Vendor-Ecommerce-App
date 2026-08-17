import ShopInfo from "../components/SellerComps/ShopInfo";
import ShopProfileData from "../components/SellerComps/ShopProfileData";
import styles from "../styles/styles";

function ShopHomePage() {
  return (
    <div className="min-h-screen bg-ink-50">
      <div className={`${styles.section} py-10`}>
        <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <ShopInfo isOwner={true} />
          </aside>
          <ShopProfileData isOwner={true} />
        </div>
      </div>
    </div>
  );
}

export default ShopHomePage;
