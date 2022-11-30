import {
  light,
  regular,
  thin,
} from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardDisplay = ({ title }) => {
  return (
    <div className="relative" style={{ width: "20rem" }}>
      <span
        className={`heading-2 absolute text-honeydew ${
          title.length < 30 ? "bottom-44" : "bottom-40"
        } left-5`}
      >
        {title}
      </span>
      <FontAwesomeIcon
        icon={regular("credit-card")}
        size="10x"
        className="h-72 text-brunswick-green"
      />
    </div>
  );
};

export default CardDisplay;
