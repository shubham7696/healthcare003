import { Spinner } from "react-bootstrap";
import "../../assets/styles/AppStyles.css";
import Loader from "./LoaderComp";

const BlurBgLoader = () => {
  return (
    <div>
      <div className="blur-bg-loader">
        <Loader/>
      </div>
    </div>
  );
};

export default BlurBgLoader;
