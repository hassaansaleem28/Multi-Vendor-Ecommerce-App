import { Link } from "react-router-dom";
import styles from "../../styles/styles";

function Hero() {
  return (
    <div
      className={`relative min-h-[70vh] min-800-h w-full bg-no-repeat ${styles.normalFlex}`}
      style={{
        backgroundImage:
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
    >
      <div className={`${styles.section} w-[90%] width-60-800px`}>
        <h1
          className={`text-[35px] leading-[1.2] text-px text-[#3d3a3a] font-[600] capitalize`}
        >
          Best Collection for <br /> home Decoration
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
          voluptates dolorem tenetur nulla quidem reprehenderit provident
          sapiente ipsa, voluptas minima? Perferendis magni obcaecati temporibus
          iusto eligendi minima explicabo voluptatem maxime!
        </p>
        <Link to="/products" className="inline-block">
          <div className={`${styles.button} rounded-xl mt-5`}>
            <span className="text-[#fff] font-[Poppins] font-bold text-[18px]">
              Shop Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
