import {useEffect, useState, useRef, useLayoutEffect} from 'react';
import { GrLanguage } from "react-icons/gr";
import './LangSwitcher.scss'
import useClickOutside from "../../hooks/useClickOutside.jsx";

function LangSwitcher({ i18n }) {
    const [open, setOpen] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState(() => {
        return localStorage.getItem('language') || 'en'
    });

    const langSwitcherBlock = useRef(null);
    useClickOutside(langSwitcherBlock, open, () => setOpen(false));

    const languages = [
        { key: "uk", label: "UA" },
        { key: "en", label: "EN" }
    ];

    useEffect(() => {
        localStorage.setItem('language', currentLanguage);
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage])

    const handleSelect = (lang) => {
        setCurrentLanguage(lang)
        setOpen(false);
    };

    return (
        <div className="lang-switcher" ref={langSwitcherBlock}>
            <GrLanguage
                className='lang-switcher__button'
                onClick={() => setOpen((prev) => !prev)}
                aria-haspopup="listbox"
                aria-expanded={open}
            />
            {open && (
                <ul className="lang-switcher__dropdown" role="listbox">
                    {languages.map(lang => (
                        <li key={lang.key}>
                            <button
                                className={`lang-switcher__option${lang.key === currentLanguage ? ' active' : ''}`}
                                onClick={() => handleSelect(lang.key)}
                                role="option"
                                aria-selected={lang.key === currentLanguage}
                            >
                                {lang.label}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default LangSwitcher
