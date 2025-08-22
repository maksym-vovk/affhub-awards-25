import './Loader.scss'
import { TailSpin } from "react-loader-spinner";

function Loader({ count }) {
    return (
        <div className={`loader ${!count ? 'fade-out' : ''}`}>
            <TailSpin
                key="three-circles-rotating"
                height="100%"
                width="100%"
                color="white"
                ariaLabel="three-circles-rotating"
                wrapperStyle={{}}
                wrapperClass="loader__wrapper"
            />
        </div>

    )
}

export default Loader
