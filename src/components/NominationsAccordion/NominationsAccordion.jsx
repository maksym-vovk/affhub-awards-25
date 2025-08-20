import "./NominationsAccordion.scss"
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel
} from "react-accessible-accordion";
import Nomination from "../Nomination/Nomination.jsx";
// import {useEffect, useState} from "react";

function NominationsAccordion({list}) {
    // const [headerHeight, setHeaderHeight] = useState(0);
    // const [prevScrollY, setPrevScrollY] = useState(0);

    // useEffect(() => {
    //     const header = document.querySelector('.header');
    //     if (!header) return;
    //
    //     const updateHeaderHeight = () => {
    //         setHeaderHeight(header.offsetHeight);
    //     };
    //
    //     updateHeaderHeight();
    //
    //     window.addEventListener('resize', updateHeaderHeight);
    //     return () => {
    //         window.removeEventListener('resize', updateHeaderHeight);
    //     };
    // }, [])

    // const handleChange = (uuids) => {
    //     if (uuids.length > 0) {
    //         if (prevScrollY && prevScrollY < window.scrollY) {
    //             window.scrollTo({
    //                 top: prevScrollY,
    //                 behavior: "smooth",
    //             })
    //         }
    //
    //         const el = document.querySelector(`[data-accordion-uuid="${uuids[0]}"]`);
    //
    //         if (!el) return;
    //
    //         window.scrollTo({
    //             top: el.offsetTop - headerHeight,
    //             behavior: "smooth",
    //         })
    //
    //         setPrevScrollY(el.offsetTop - headerHeight);
    //     }
    // };

    return (
        <Accordion allowMultipleExpanded={true} allowZeroExpanded={true}>
        {/*<Accordion allowZeroExpanded={true} onChange={handleChange}>*/}
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
