import {Draggable} from "react-beautiful-dnd";
import {useContext, useRef} from "react";
import Context from "../context";

export default function CreatedFields({createdField, index, sectionName}) {
    const {removeSectionItem, changeSectionItem, setEndOfContenteditable} = useContext(Context)
    const styles = {
        blockStyles: {
            whiteSpace: "pre-line",
            margin: "16px 0"
        },
        link: {
            color: "rgb(0, 0, 238)"
        }
    }

    function getFieldHtml(field) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        let fieldRef = useRef(field.value)
        let fieldValue = fieldRef.current

        // eslint-disable-next-line default-case
        switch (field.type) {
            case "text":
            case "password":
            case "select":
                return (
                    <div style={styles.blockStyles} className={"content-editable"}>
                        {
                            (field.showName && field.value.trim()) &&
                            <span style={{fontWeight: "bold"}}>{field.name}:&nbsp;</span>
                        }
                        <div
                            contentEditable
                            suppressContentEditableWarning={true}
                            dangerouslySetInnerHTML={{ __html: fieldValue }}
                            onInput={(event) => {
                                changeSectionItem(event, field)
                            }}
                            onPaste={(event) => {
                                changeSectionItem(event, field)
                                fieldRef.current = field.value
                            }}
                            placeholder={field.name}
                        >
                        </div>
                    </div>
                )
            case "h2":
                return (
                    <h2 contentEditable
                        suppressContentEditableWarning={true}
                        dangerouslySetInnerHTML={{ __html: fieldValue }}
                        onInput={(event) => {
                            if( event.nativeEvent.inputType === 'insertFromPaste' ){
                                event.currentTarget.innerHTML = event.currentTarget.innerHTML.replace(/<(.|\n)*?>/g, '')
                                fieldRef.current = event.currentTarget.innerHTML
                                setEndOfContenteditable(event.currentTarget)
                            }

                            changeSectionItem(event, field)
                        }}
                        style={{backgroundColor: "#0E1025", color: "#fff", padding: "10px"}}
                        placeholder={field.name}
                    >
                    </h2>
                )
            case "h3":
                return (<h3>– {field.name}</h3>)
            case "link":
                return (
                    <div
                        contentEditable
                        suppressContentEditableWarning={true}
                        className={"content-editable"}
                        placeholder={field.name}
                        dangerouslySetInnerHTML={{ __html: fieldValue }}
                        onInput={(event) => {
                            changeSectionItem(event, field)
                        }}
                        onPaste={(event) => {
                            changeSectionItem(event, field)
                            fieldRef.current = field.value
                        }}
                    >
                    </div>
                )
            case "comment":
                return (
                    <i className={"content-editable"}>
                        {field.value && <b>Комментарий:&nbsp;</b>}
                        <div
                            style={{whiteSpace: "pre-line"}}
                            contentEditable
                            suppressContentEditableWarning={true}
                            dangerouslySetInnerHTML={{ __html: fieldValue }}
                            onInput={(event) => {
                                changeSectionItem(event, field)
                            }}
                            onPaste={(event) => {
                                changeSectionItem(event, field)
                                fieldRef.current = field.value
                            }}
                            placeholder={field.name}
                        >
                        </div>
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
        <Draggable draggableId={createdField.id.toString()} index={index}>
            {
                (provided) => (
                    <div
                        className={"sections__sub-item"}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <div className="sections__sub-item__control-btns">
                            <i className="fi fi-rr-arrows cube-btn cube-btn_default move-btn"></i>
                            <i className="fi fi-rr-minus-small cube-btn cube-btn_red sections__sub-item__delete"
                               onClick={removeSectionItem.bind(null, sectionName, createdField.id)}
                            ></i>
                        </div>
                        <div className="sections__sub-item__fields">
                            {getFields(createdField.fields)}
                        </div>

                    </div>
                )
            }
        </Draggable>
    )
}
