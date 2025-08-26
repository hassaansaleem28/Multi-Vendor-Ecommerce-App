import { useState } from "react";
import Header from "../components/Layouts/Header";
import ProfileSidebar from "../components/UserComps/ProfileSidebar";
import styles from "../styles/styles";
import ProfileContent from "../components/UserComps/ProfileContent";

function ProfilePage() {
  const [active, setActive] = useState(1);
  return (
    <div>
      <Header />
      <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
        <div className="w-[50px] min-w-800px-335 marigin-top-800px sticky mt-[18%]">
          <ProfileSidebar active={active} setActive={setActive} />
        </div>
        <ProfileContent active={active} />
      </div>
    </div>
  );
}

export default ProfilePage;
