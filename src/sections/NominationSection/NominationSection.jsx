import './NominationSection.scss'
import {useTranslation} from "react-i18next";
import NominationsAccordion from "../../components/NominationsAccordion/NominationsAccordion.jsx";
import {useEffect, useState} from "react";
import {useLoader} from "../../context/LoaderProvider.jsx";
import {voteApi} from "../../api/vote.js";
import {useQuery} from "@tanstack/react-query";
import {useModal} from "../../context/ModalProvider.jsx";
import {useAuth} from "../../context/AuthProvider.jsx";

function NominationSection() {
    const { t } = useTranslation();
    const { authToken, handleLogout } = useAuth()
    const { showLoader, hideLoader } = useLoader()
    const { openModal, closeModalWithDelay } = useModal()
    const defaultData = t('nominations', { returnObjects: true });
    const { list } = defaultData;
    const [nominations, setNominations] = useState(list);

    function updateNominationState(nominationState, statisticsData, userVotes) {
        // Safety check: if statisticsData is undefined, null, or empty, return original state
        if (!statisticsData || !Array.isArray(statisticsData) || statisticsData.length === 0) {
            return nominationState;
        }

        return nominationState.map(nomination => {
            return {
                ...nomination,
                categories: nomination.categories.map(category => {
                    // Find matching statistic for this nomination and category
                    const matchingStat = statisticsData.find(stat =>
                        stat.nomination === nomination.tag &&
                        stat.niche === category.tag
                    );

                    if (!matchingStat) {
                        // No statistics found for this category, return as is
                        return category;
                    }

                    // Update companies with matching percentages and voted status
                    const updatedCompanies = category.companies.map(company => {
                        // Find matching result for this company
                        const matchingResult = matchingStat.results?.find(result =>
                            result.company === company.tag
                        );

                        // Find matching user vote for this nomination/category
                        const userVote = userVotes?.find(vote =>
                            vote.nomination === nomination.tag &&
                            vote.niche === category.tag
                        );

                        // Check if this company was voted by the user
                        const isVoted = userVote?.vote === company.tag;

                        // Create updated company with voted status
                        const updatedCompany = {
                            ...company,
                            voted: isVoted
                        };

                        // Update percentage if found in results
                        if (matchingResult) {
                            updatedCompany.percent = matchingResult.percentage;
                        }

                        return updatedCompany;
                    });

                    // Sort companies by percent in descending order (highest first)
                    const sortedCompanies = updatedCompanies.sort((a, b) => b.percent - a.percent);

                    return {
                        ...category,
                        companies: sortedCompanies
                    };
                })
            };
        });
    }

    const statisticsQuery = useQuery({
        queryKey: ['statistics'],
        queryFn: () => voteApi.getStatistic(t),
        staleTime: 1000 * 60,       // 1 minute cache
        refetchOnMount: false,      // don't refetch if data is cached
    })

    const usersVotesQuery = useQuery({
        queryKey: ['usersVotes'],
        queryFn: () => voteApi.getUsersVotes(authToken, t),
        staleTime: 1000 * 60,       // 1 minute cache
        refetchOnMount: false,      // don't refetch if data is cached
        enabled: !!authToken, // only run if authToken is truthy
    });

    useEffect(() => {
        statisticsQuery.isPending ? showLoader() : hideLoader()
    }, [statisticsQuery.isPending]);

    useEffect(() => {
        if (authToken) {
            usersVotesQuery.isPending ? showLoader() : hideLoader()
        }
    }, [usersVotesQuery.isPending]);

    useEffect(() => {
        if (statisticsQuery.isError && statisticsQuery.error) {
            openModal('message', statisticsQuery.error.errorMessage)
            closeModalWithDelay()
        }
    }, [statisticsQuery.isError, statisticsQuery.error]);

    useEffect(() => {
        if (usersVotesQuery.isError && usersVotesQuery.error) {
            openModal('message', usersVotesQuery.error.errorMessage)
            handleLogout()
            closeModalWithDelay()
        }
    }, [usersVotesQuery.isError, usersVotesQuery.error]);

    useEffect(() => {
        const newDefaultData = t('nominations', { returnObjects: true });
        const { list } = newDefaultData;

        if (statisticsQuery.data || usersVotesQuery.data) {
            const updatedList = updateNominationState(list, statisticsQuery.data, usersVotesQuery.data);
            setNominations(updatedList);
        } else {
            setNominations(list);
        }
    }, [t, statisticsQuery.data, usersVotesQuery.data]);


    return (
        <section className="nominations block" id="nominations">
            <div className="nominations__wrapper container">
                <h2 className="nominations__title">
                    {t('nominations.title')}
                </h2>
                <NominationsAccordion list={nominations}/>
            </div>
        </section>
    )
}

export default NominationSection
