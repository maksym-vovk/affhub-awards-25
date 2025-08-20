import './NominationSection.scss'
import {useTranslation} from "react-i18next";
import Nomination from "../../components/Nomination/Nomination.jsx";
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel
} from "react-accessible-accordion";
import NominationsAccordion from "../../components/NominationsAccordion/NominationsAccordion.jsx";

function NominationSection() {
    const { t } = useTranslation();
    const data = t('nominations', { returnObjects: true });
    const { list } = data;

    return (
        <section className="nominations block" id="nominations">
            <div className="nominations__wrapper container">
                <h2 className="nominations__title">
                    {t('nominations.title')}
                </h2>
                <NominationsAccordion list={list}/>
            </div>
        </section>
    )
}

export default NominationSection
