import "./NominationsAccordion.scss"
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel
} from "react-accessible-accordion";
import Nomination from "../Nomination/Nomination.jsx";

function NominationsAccordion({list}) {
    return (
        <Accordion allowMultipleExpanded={true} allowZeroExpanded={true}>
            {
                list.map((nomination) => (
                    <AccordionItem
                        uuid={nomination.tag}
                        data-accordion-uuid={nomination.tag}
                        key={nomination.tag}
                    >
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <h3 className="accordion__title title">{nomination.title}</h3>
                                <span className="accordion__icon"></span>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <Nomination
                                key={nomination.tag}
                                nomination={nomination}
                            />
                        </AccordionItemPanel>
                    </AccordionItem>
                ))
            }
        </Accordion>
    )
}

export default NominationsAccordion
