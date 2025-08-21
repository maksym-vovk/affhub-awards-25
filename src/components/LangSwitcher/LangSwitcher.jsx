import {useEffect, useState, useRef} from 'react';
import { GrLanguage } from "react-icons/gr";
import './LangSwitcher.scss'

function LangSwitcher({ i18n }) {
    const [open, setOpen] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState(() => {
        return localStorage.getItem('language') || 'en'
    });
    const ref = useRef(null);

    const languages = [
        { key: "uk", label: "UA" },
        { key: "en", label: "EN" }
    ];

    useEffect(() => {
        localStorage.setItem('language', currentLanguage);
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage])

    useEffect(() => {
        if (!open) return;
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    const handleSelect = (lang) => {
        setCurrentLanguage(lang)
        setOpen(false);
    };

    return (
        <div className="lang-switcher" ref={ref}>
            <GrLanguage
                className='lang-switcher__button'
                onClick={() => setOpen((prev) => !prev)}
                aria-haspopup="listbox"
                aria-expanded={open}
            />
            {/*<button*/}
            {/*    className="lang-switcher__selected"*/}
            {/*    onClick={() => setOpen((prev) => !prev)}*/}
            {/*    aria-haspopup="listbox"*/}
            {/*    aria-expanded={open}*/}
            {/*>*/}
            {/*    {languages.find(l => l.key === currentLanguage)?.label || currentLanguage}*/}
            {/*    <span className="lang-switcher__arrow" />*/}
            {/*</button>*/}
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
