import './Categories.scss'

function Categories({ categories, categoryTag, setCategoryTag }) {
    return (
        <div className={`categories ${categories.length <= 1 ? 'hidden' : ''}`}>
            <div className="categories__list">
                <div className="categories__tabs">
                    {
                        categories.map(category => (
                            <button
                                key={category.tag}
                                data-category={category.tag}
                                className={`categories__button ${category.tag === categoryTag ? 'active' : ''}`}
                                onClick={() => setCategoryTag(category.tag)}
                            >
                                {category.name}
                            </button>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Categories
