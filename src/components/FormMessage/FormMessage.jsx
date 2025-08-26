import "./FormMessage.scss"

function FormMessage({ title, text }) {
    return (
        <>
            <h2 className="popup__title">{title}</h2>
            <p className="popup__message">{text}</p>
        </>
    )
}

export default FormMessage
