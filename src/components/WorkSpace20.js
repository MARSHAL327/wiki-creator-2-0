import {useContext} from "react";
import Context from "../context";
import AddSection from "./AddSection";

export default function WorkSpace20({sections}) {
    const {addSectionItem, removeSectionItem, changeSectionItem, getVisibleSectionCount, toggleSectionVisible} = useContext(Context)
    const styles = {
        blockStyles: {
            whiteSpace: "pre-line",
            margin: "16px 0"
        }
    }
    let visibleSectionCount = getVisibleSectionCount()

    function getFieldHtml(field) {
        // eslint-disable-next-line default-case
        switch (field.type) {
            case "text":
            case "password":
            case "select":
                return (
                    <div style={styles.blockStyles} className={"content-editable"}>
                        {
                            (field.showFieldName && field.value.trim()) &&
                            <span style={{fontWeight: "bold"}}>{field.name}:&nbsp;</span>
                        }
                        <div
                            contentEditable
                            suppressContentEditableWarning={true}
                            onInput={(event) => {
                                changeSectionItem(event, field)
                            }}
                            placeholder={field.name}
                        >
                            {field.value}
                        </div>
                    </div>
                )
            case "h2":
                return (
                    <h2 contentEditable
                        suppressContentEditableWarning={true}
                        onInput={(event) => {
                            changeSectionItem(event, field)
                        }}
                        style={{backgroundColor: "#0E1025", color: "#fff", padding: "10px"}}
                        placeholder={field.name}
                    >
                        {field.value}
                    </h2>
                )
            case "h3":
                return (<h3>– {field.name}</h3>)
            case "link":
                return (
                    <p>
                        <span style={{color: "rgb(0, 0, 238)"}}>
                            <a href={field.value} target="_blank" rel="noreferrer">{field.value}</a>
                        </span>
                    </p>
                )
            case "comment":
                return (
                    <i className={"content-editable"}>
                        {field.value.trim() && <b>Комментарий:&nbsp;</b>}
                        <textarea
                            placeholder={field.name}
                            defaultValue={field.value}
                            onChange={(event) => {
                                changeSectionItem(event, field, true)
                            }}
                        ></textarea>
                    </i>
                )
        }
    }

    function getFields(fields) {
        return fields.map(field => {
            return <div key={field.id}>
                {getFieldHtml(field)}
                {field.fields && getFields(field.fields)}
            </div>
        })
    }

    return (
        <div className="white-block sections" id={"html-code"}>
            {Object.keys(sections).map(sectionName => {
                if( sections[sectionName].sectionIsVisible === false ) return false

                return (
                     <div className={"sections__item"} key={sectionName}>
                        <div className={"sections__title"}>
                            <h1 style={sections[sectionName].styles}>{sectionName}</h1>
                            <i className="fi fi-rr-plus-small cube-btn cube-btn_green sections__control-btns"
                               onClick={addSectionItem.bind(null, sections[sectionName])}></i>
                            <i className="fi fi-rr-minus-small cube-btn cube-btn_red sections__control-btns"
                               onClick={toggleSectionVisible.bind(null, sectionName, false)}></i>
                        </div>
                        {
                            sections[sectionName].createdFields.map(createdField => {
                                return (
                                    <div className={"sections__sub-item"} key={createdField.id}>
                                        <div className="sections__sub-item__control-btns">
                                            <i className="fi fi-rr-minus-small cube-btn cube-btn_red sections__sub-item__delete"
                                               onClick={removeSectionItem.bind(null, sections[sectionName], createdField.id)}
                                            ></i>
                                        </div>
                                        {
                                            getFields(createdField.fields)
                                        }
                                    </div>
                                )
                            })
                        }
                        <hr/>
                    </div>
                )
            })}

            { visibleSectionCount === 0 &&
                <AddSection
                    sections={sections}
                />
            }
        </div>
    )
}