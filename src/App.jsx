import './styles/global.scss';

import {useEffect} from "react";
import {useLoader} from "./context/LoaderProvider.jsx";

import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import Header from "./components/Header/Header.jsx";
import NominationSection from "./sections/NominationSection/NominationSection.jsx";
import HeroSection from "./sections/HeroSection/HeroSection.jsx";
import OverviewSection from "./sections/OverviewSection/OverviewSection.jsx";
import AnnouncementSection from "./sections/AnnouncementSection/AnnouncementSection.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ModalRoot from "./components/ModalRoot/ModalRoot.jsx";
import FaqModal from "./components/FaqModal/FaqModal.jsx";
import Loader from "./components/Loader/Loader.jsx";

function App() {
    const [loading, setLoadingWithDelay] = useLoader();

    useEffect(() => {
        const handleLoad = () => setLoadingWithDelay(false);
        if (document.readyState === "complete") {
            setLoadingWithDelay(false);
            return;
        }

        window.addEventListener("load", handleLoad);
        return () => window.removeEventListener("load", handleLoad);
    }, []);


    return (
        <>
            <Header/>
            <LandingPage>
                <HeroSection/>
                <OverviewSection/>
                <NominationSection/>
                <AnnouncementSection/>
            </LandingPage>
            <Footer/>

            <ModalRoot/>
            <FaqModal/>
            {loading && <Loader/>}
        </>
    );
}

export default App;