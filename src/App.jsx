import './styles/global.scss';
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import Header from "./components/Header/Header.jsx";
import NominationSection from "./sections/NominationSection/NominationSection.jsx";
import HeroSection from "./sections/HeroSection/HeroSection.jsx";
import OverviewSection from "./sections/OverviewSection/OverviewSection.jsx";
import AnnouncementSection from "./sections/AnnouncementSection/AnnouncementSection.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ContextProviders from "./context/ContextProviders.jsx";

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
        </ContextProviders>
    );
}

export default App;