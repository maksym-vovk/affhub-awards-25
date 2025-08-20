import "./Nomination.scss"
import {useState} from "react";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel
} from "react-accessible-accordion";

import Categories from "../Categories/Categories.jsx";
import CompanyCard from "../CompanyCard/CompanyCard.jsx";
import CompaniesGrid from "../CompaniesGrid/CompaniesGrid.jsx";


function Nomination({ nomination }) {
    const [categoryTag, setCategoryTag] = useState(nomination.categories[0].tag);
    const companies = nomination.categories.filter(category => category.tag === categoryTag)[0].companies;

    return (
        <div className='nomination' data-nomination={nomination.tag}>
            <Categories
                categories={ nomination.categories }
                setCategoryTag={setCategoryTag}
                categoryTag={categoryTag}
            />
            <CompaniesGrid>
                {companies.map(company => <CompanyCard key={company.tag} company={company} />)}
            </CompaniesGrid>
        </div>
    )
}

export default Nomination
