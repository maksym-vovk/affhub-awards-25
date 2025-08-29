import './Button.scss'

function Button({ className, type, scrollId, onClick, children }) {
    const isPrimary = className.includes('button--primary')

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
            {isPrimary ? <span>{children}</span> : children}
        </button>
    )
}

export default Button
