export default function AddSection({sections}) {
    return (
        <div className={"add-section"}>
            <div className="btn-dotted btn-dotted_default btn-dotted_default_hovered">
                Добавить раздел
            </div>
            <div className="add-section__dropdown">
                {
                    Object.keys(sections).map(sectionName => {
                        if (sections[sectionName].createdFields.length > 0) return false

                        return (
                            <div className={"add-section__dropdown__item"}>
                                {sectionName}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}