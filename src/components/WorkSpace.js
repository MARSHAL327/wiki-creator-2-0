import Section from "./Section";

export default function WorkSpace({sections}) {
    return (
        <div className={"white-block code-space"}>
            {Object.keys(sections).map((sectionName, i) => {
                return <Section
                    section={sections[sectionName]}
                    key={i}/>
            })}
        </div>
    )
}