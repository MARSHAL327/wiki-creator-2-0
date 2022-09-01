import {useContext, useState} from "react";
import Context from "../context";

export default function AddSection({sections}) {
    const [dropDownVisible, setDropDownVisible] = useState(false)
    const {toggleSectionVisible} = useContext(Context)
    let classes = ['add-section__dropdown']

    function toggleDropDownVisible(){
        setDropDownVisible(dropDownVisible => !dropDownVisible)
    }

    if( dropDownVisible )
        classes.push('active')

    return (
        <div className={"add-section"}>
            <div className="btn-dotted btn-dotted_default btn-dotted_default_hovered"
                 onClick={toggleDropDownVisible}>
                {
                    dropDownVisible ? 'Отменить' : 'Добавить раздел'
                }

            </div>

            <div className={classes.join(' ') }>
                {
                    Object.keys(sections).map(sectionName => {
                        if (sections[sectionName].sectionIsVisible) return false

                        return (
                            <div
                                key={sectionName}
                                className={"add-section__dropdown__item"}
                                onClick={() => {
                                    setDropDownVisible(false)
                                    toggleSectionVisible(sectionName)
                                }}
                            >
                                {sectionName}
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}