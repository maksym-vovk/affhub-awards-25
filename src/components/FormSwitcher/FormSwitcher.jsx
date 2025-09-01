import './FormSwitcher.scss'
import Button from "../Button/Button.jsx";

function FormSwitcher({type, options, onSwitch}) {
    if (options.length !== 2) throw new Error('FormSwitcher: options must have 2 elements');

    return (
        <div className="auth-switcher">
            {options.map(option => (
                <Button
                    key={option.type}
                    className={`auth-switcher__btn ${type === option.type ? 'active' : ''}`}
                    onClick={() => onSwitch(option.type)}
                >
                    {option.text}
                </Button>
            ))}
        </div>
    )
}

export default FormSwitcher
