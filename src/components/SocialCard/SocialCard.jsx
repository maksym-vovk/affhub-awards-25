import "./SocialCard.scss"

function SocialCard({ logo, name, link }) {
    return (
        <a href={link} className="social-card" target="_blank">
            <div className="social-card__logo">
                <img src={logo} alt={`${name} logo`} className="social-card__img"/>
            </div>
            <span className="social-card__name" >
                {name}
            </span>
        </a>
    )
}

export default SocialCard
