import './Button.scss'

function Button({ className, type, scrollId, onClick, children }) {
    const handleScroll = () => {
        const section = document.getElementById(scrollId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleClick = () => {
        if (scrollId) handleScroll()
        if (onClick) onClick()
    }

    return (
        <button
            className={className}
            onClick={handleClick}
            type={type || 'button'}
        >
            {children}
        </button>
    )
}

export default Button
