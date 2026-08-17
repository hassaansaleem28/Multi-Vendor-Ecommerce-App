import { useState } from "react";
import Header from "../components/Layouts/Header";
import ProfileSidebar from "../components/UserComps/ProfileSidebar";
import styles from "../styles/styles";
import ProfileContent from "../components/UserComps/ProfileContent";
import Footer from "../components/UserComps/Footer";
import PageHero from "../components/ui/PageHero";

const TITLES = {
  1: "Your profile",
  2: "Your orders",
  3: "Refunds",
  4: "Inbox",
  5: "Track order",
  6: "Change password",
  7: "Saved addresses",
};

function ProfilePage() {
  const [active, setActive] = useState(1);

  return (
    <div className="flex min-h-screen flex-col bg-ink-50">
      <Header />

      <PageHero
        eyebrow="Account"
        title={TITLES[active] || "Your profile"}
        subtitle="Manage your details, orders and addresses in one place."
        crumbs={[{ label: "Home", to: "/" }, { label: "Profile" }]}
      />

      <main className={`${styles.section} flex flex-1 gap-6 py-10`}>
        <aside className="w-[74px] shrink-0 min-w-800px-335 self-start lg:sticky lg:top-24">
          <ProfileSidebar active={active} setActive={setActive} />
        </aside>

        <div className="min-w-0 flex-1">
          <ProfileContent active={active} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ProfilePage;
