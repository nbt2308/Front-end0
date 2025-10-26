import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "./Loading.scss"
const LoadingSpinner = () => {
    return (
        <div className="loading-container">
            <AiOutlineLoading3Quarters className="loading-icon" />
        </div>
        )


}
export default LoadingSpinner