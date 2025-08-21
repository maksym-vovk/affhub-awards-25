import "./FormError.scss"

function FormError({ title, text }) {
    return (
        <>
            <h2 className="popup__title">{title}</h2>
            <p className="popup__message">{text}</p>
        </>
    )
}

export default FormError
