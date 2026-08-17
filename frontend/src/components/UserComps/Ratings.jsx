import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

const STAR_COLOR = "#f59e0b"; // accent-500
const EMPTY_COLOR = "#bfc8da"; // ink-300

function Ratings({ rating, size = 20 }) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <AiFillStar key={i} size={size} color={STAR_COLOR} className="mr-0.5" />
      );
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <BsStarHalf
          key={i}
          size={size * 0.85}
          color={STAR_COLOR}
          className="mr-0.5"
        />
      );
    } else {
      stars.push(
        <AiOutlineStar
          key={i}
          size={size}
          color={EMPTY_COLOR}
          className="mr-0.5"
        />
      );
    }
  }

  return <div className="flex items-center">{stars}</div>;
}

export default Ratings;
