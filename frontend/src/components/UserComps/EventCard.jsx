import styles from "../../styles/styles";
import CountDown from "./CountDown";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function EventCard({ active, data }) {
  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
      <div className="w-full lg:w-[50%] m-auto">
        <img src={`${API_BASE_URL}/${data && data.images[1]}`} alt="Image" />
      </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>{name}</h2>
        <p>{data?.description}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              ${data?.originalPrice}
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-[Roboto]">
              ${data?.discountPrice}
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            120 Sold
            {/* {data?.sold_out} Sold */}
          </span>
        </div>
        <CountDown data={data} />
      </div>
    </div>
  );
}

export default EventCard;
