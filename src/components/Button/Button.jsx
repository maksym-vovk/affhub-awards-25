import './Button.scss'

function Button({as='button', href='#', target='_blank', className, type, scrollId, onClick, children }) {
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

    if (as === 'a') {
        return (
            <a
                className={className}
                href={href}
                target={target}
                onClick={handleClick}
            >
                {isPrimary ? <span>{children}</span> : children}
            </a>
        )
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
