import { useState } from "react";
import styles from "../styles/styles";
import { Link } from "react-router-dom";

function ProductDetailsInfo({ data }) {
  const [active, setActive] = useState(1);
  return (
    <div className="bg-[#f5f6fb] px-3 padding-at-800px py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={`text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer textAt-800px`}
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={`text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer textAt-800px`}
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={`text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer textAt-800px`}
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus esse et cupiditate libero consequuntur eum perferendis
            rem ipsam. Quam sapiente doloribus illo sunt voluptatibus ad sint
            neque, maxime architecto consequuntur. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Voluptatibus esse et cupiditate libero
            consequuntur eum perferendis rem ipsam. Quam sapiente doloribus illo
            sunt voluptatibus ad sint neque, maxime architecto consequuntur.
          </p>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi
            est natus numquam error ad! Voluptatibus id atque nostrum, quam
            inventore eligendi modi aliquam delectus quos a ratione quod
            adipisci eos?Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Aut ducimus vel autem pariatur, accusantium, rem nostrum non
            commodi assumenda temporibus vero iusto molestias labore laboriosam
            a debitis at eligendi perferendis!
          </p>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi
            est natus numquam error ad! Voluptatibus id atque nostrum, quam
            inventore eligendi modi aliquam delectus quos a ratione quod
            adipisci eos?Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Aut ducimus vel autem pariatur, accusantium, rem nostrum non
            commodi assumenda temporibus vero iusto molestias labore laboriosam
            a debitis at eligendi perferendis!
          </p>
        </>
      ) : null}
      {active === 2 ? (
        <div className="w-full justify-center min-h-[40vh] flex items-center">
          <p>No Reviews yet!</p>
        </div>
      ) : null}
      {active === 3 && (
        <div className="w-full block flex-800px p-5">
          <div className="w-full width-800px-50">
            <div className="flex items-center">
              <img
                src={data.shop.shop_avatar.url}
                alt="Image"
                className="w-[50px] h-[50px] rounded-full"
              />
              <div className="pl-3">
                <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                <h5 className="pb-2 text-[15px]">
                  ({data.shop.ratings}) Ratings
                </h5>
              </div>
            </div>
            <p className="pt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In unde
              iste, odit voluptatem at ullam error amet laborum exercitationem
              eius quisquam, explicabo, maxime eligendi numquam doloremque ipsum
              odio officiis aliquam?
            </p>
          </div>
          <div className="w-full width-800px-50 mt-5 marigin-top-800px flex-800px flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on : <span className="font-[500]">20 August,2025</span>
              </h5>{" "}
              <h5 className="font-[600] pt-3">
                Total Products : <span className="font-[500]">121,122</span>
              </h5>{" "}
              <h5 className="font-[600] pt-3">
                Total Reviews : <span className="font-[500]">781</span>
              </h5>
              <Link to={"/"}>
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-white font-bold">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailsInfo;
