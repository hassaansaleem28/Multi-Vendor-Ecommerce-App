import styles from "../../styles/styles";
import ShopProfileData from "./ShopProfileData";
import ShopInfo from "./ShopInfo";
import Header from "../Layouts/Header";
import Footer from "../UserComps/Footer";

function ShopPreviewPage() {
  return (
    <div className="flex min-h-screen flex-col bg-ink-50">
      <Header />

      <main className={`${styles.section} flex-1 py-10`}>
        <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <ShopInfo isOwner={false} />
          </aside>
          <ShopProfileData isOwner={false} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ShopPreviewPage;
