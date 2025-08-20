import './styles/global.scss';
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import Header from "./components/Header/Header.jsx";
import NominationSection from "./sections/NominationSection/NominationSection.jsx";
import HeroSection from "./sections/HeroSection/HeroSection.jsx";
import OverviewSection from "./sections/OverviewSection/OverviewSection.jsx";
import AnnouncementSection from "./sections/AnnouncementSection/AnnouncementSection.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ContextProviders from "./context/ContextProviders.jsx";
import ModalRoot from "./components/ModalRoot/ModalRoot.jsx";
import FaqModal from "./components/FaqModal/FaqModal.jsx";

function App() {
    return (
        <ContextProviders>
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
        </ContextProviders>
    );
}

export default App;