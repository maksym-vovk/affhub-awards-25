import './styles/global.scss';

import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import Header from "./components/Header/Header.jsx";
import NominationSection from "./sections/NominationSection/NominationSection.jsx";
import HeroSection from "./sections/HeroSection/HeroSection.jsx";
import OverviewSection from "./sections/OverviewSection/OverviewSection.jsx";
import AnnouncementSection from "./sections/AnnouncementSection/AnnouncementSection.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ModalRoot from "./components/ModalRoot/ModalRoot.jsx";
import FaqModal from "./components/FaqModal/FaqModal.jsx";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
    );
}

export default App;