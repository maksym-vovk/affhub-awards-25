import './Loader.scss'
import { ThreeCircles } from "react-loader-spinner";
import {useLoader} from "../../context/LoaderProvider.jsx";

function Loader() {
    const [loading] = useLoader();

    if (!loading) return null;

    return (
        <div className="loader" style={{
            opacity: loading ? 1 : 0,
            transition: 'opacity 300ms ease-in-out',
            pointerEvents: loading ? 'auto' : 'none'
        }}
        >
            <ThreeCircles
                key="three-circles-rotating"
                height="100%"
                width="100%"
                innerCircleColor="#fff6c8"
                outerCircleColor="#7d4d22"
                middleCircleColor="white"
                ariaLabel="three-circles-rotating"
                wrapperStyle={{}}
                wrapperClass="loader__wrapper"
            />
        </div>

    )
}

export default Loader
