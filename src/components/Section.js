import SectionItem from "./SectionItem";
import {useContext} from "react";
import Context from "../context";

export default function Section({section}) {
    const {addSectionItem} = useContext(Context)

    return (
        <div>
            <h1 style={section.styles}>{section.name}</h1>
            <div>
                {section.createdFields.map((fields, i) => {
                    return <SectionItem section={section} fields={fields} key={fields.id}/>
                })}
                <button className="btn-dotted btn-dotted_default" onClick={addSectionItem.bind(this, section)}>Добавить</button>
            </div>
        </div>
    )
}