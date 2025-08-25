import './NominationSection.scss'
import {useTranslation} from "react-i18next";
import NominationsAccordion from "../../components/NominationsAccordion/NominationsAccordion.jsx";
import {useEffect, useLayoutEffect, useState} from "react";
import {useLoader} from "../../context/LoaderProvider.jsx";

function NominationSection() {
    const { t } = useTranslation();
    const { showLoader, hideLoader } = useLoader()

    const defaultData = t('nominations', { returnObjects: true });
    const { list } = defaultData;
    const [nominations, setNominations] = useState(list);

    function updateList(statistics) {
        if (!statistics) return;

        setNominations(prevList =>
            prevList.map(nomination => {
                const statNomination = statistics.find(s => s.nomination === nomination.tag);
                if (!statNomination) return nomination;

                return {
                    ...nomination,
                    categories: nomination.categories.map(category => {
                        const statCategory = statNomination.niche === category.tag ? statNomination : null;
                        if (!statCategory) return category;

                        // update companies with percent + sort them
                        const updatedCompanies = category.companies
                            .map(company => {
                                const statResult = statCategory.results.find(r => r.company === company.tag);
                                return statResult
                                    ? { ...company, percent: statResult.percentage }
                                    : company;
                            })
                            .sort((a, b) => (b.percent || 0) - (a.percent || 0));

                        return { ...category, companies: updatedCompanies };
                    })
                };
            })
        );
    }

    function fetchUsers() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(JSON.stringify([
                    {
                        "nomination": "best-partner",
                        "niche": "gambling",
                        "results": [
                            {
                                "company": "datifylink",
                                "percentage": 100.0
                            }
                        ]
                    }
                ]));
            }, 3000)
        })
    }

    useEffect(() => {
        showLoader()

        const fetchData = async () => {
            const users = await fetchUsers();
            const stats = JSON.parse(users); // no await needed

            updateList(stats)
            hideLoader()
        };

        fetchData();
    }, [])

    return (
        <section className="nominations block" id="nominations">
            <div className="nominations__wrapper container">
                <h2 className="nominations__title">
                    {t('nominations.title')}
                </h2>
                <NominationsAccordion list={nominations} />
            </div>
        </section>
    )
}

export default NominationSection
