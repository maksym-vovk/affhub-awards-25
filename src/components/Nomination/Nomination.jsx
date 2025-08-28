import "./Nomination.scss"
import {useState} from "react";
import Categories from "../Categories/Categories.jsx";
import CompanyCard from "../CompanyCard/CompanyCard.jsx";
import CompaniesGrid from "../CompaniesGrid/CompaniesGrid.jsx";

function Nomination({ nomination }) {
    const [categoryTag, setCategoryTag] = useState(nomination.categories[0].tag);
    const companies = nomination.categories.find(category => category.tag === categoryTag)?.companies;
    const isDisabled = !!companies.find(company => company.voted);

    return (
        <div className='nomination' data-nomination={nomination.tag}>
            <Categories
                categories={ nomination.categories }
                setCategoryTag={setCategoryTag}
                categoryTag={categoryTag}
            />
            <div className="nomination__companies">
                <CompaniesGrid disabled={isDisabled}>
                    {companies.map(company => (
                        <CompanyCard
                            key={`${nomination.tag}-${categoryTag}-${company.tag}`}
                            nominationTag={nomination.tag}
                            categoryTag={categoryTag}
                            company={company}
                        />
                    ))}
                </CompaniesGrid>
            </div>

        </div>
    )
}

export default Nomination
