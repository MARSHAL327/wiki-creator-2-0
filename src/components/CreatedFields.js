import {Draggable} from "react-beautiful-dnd";
import {useContext} from "react";
import Context from "../context";
import ContentEditable from "react-contenteditable";

export default function CreatedFields({createdField, index, sectionName, outputMode}) {
    const {removeSectionItem, changeSectionItem} = useContext(Context)
    const styles = {
        blockStyles: {
            whiteSpace: "pre-line",
            margin: "16px 0"
        },
        link: {
            color: "rgb(0, 0, 238)"
        }
    }

    function onPasteHandler(e) {
        e.preventDefault();
        let text = e.clipboardData.getData("text/plain");
        document.execCommand("insertHTML", false, text);
    }

    function h3FieldsFilled(field){
        let fillFields = field.fields.filter(item => {
            return item.value.trim().length > 0
        })
        console.log(fillFields)

        return fillFields.length > 0
    }

    function getFieldHtml(field) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        if( outputMode && field.type === "h3" && !h3FieldsFilled(field) ){
            return false
        }

        if (outputMode && field.value.trim() === "" && field.type !== "h3")
            return false

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
                        <ContentEditable
                            html={field.value}
                            onChange={(e) => {
                                changeSectionItem(e, field)
                            }}
                            onPaste={onPasteHandler}
                            placeholder={field.name}
                        />
                    </div>
                )
            case "h2":
                return (
                    <h2>
                        <span>
                            <font color="#ffffff">
                                <ContentEditable
                                    style={{backgroundColor: 'rgb(14, 16, 37)', padding: '10px', display: 'inline-block', width: '100%'}}
                                    html={field.value}
                                    onChange={(e) => {
                                        changeSectionItem(e, field)
                                    }}
                                    onPaste={onPasteHandler}
                                    placeholder={field.name}
                                    tagName={'div'}
                                />
                            </font>
                        </span>
                    </h2>
                )
            case "h3":
                return (<h3>– {field.name}</h3>)
            case "link":
                return (
                    <ContentEditable
                        className={"content-editable"}
                        disabled={outputMode}
                        href={outputMode ? field.value : ''}
                        target={outputMode ? '_blank' : ''}
                        html={field.value}
                        onChange={(e) => {
                            changeSectionItem(e, field)
                        }}
                        onPaste={onPasteHandler}
                        placeholder={field.name}
                        tagName={outputMode ? 'a' : 'div'}
                    />
                )
            case "comment":
                return (
                    <i className={"content-editable"} style={{marginTop: "16px"}}>
                        {field.value && <b>Комментарий:&nbsp;</b>}
                        <ContentEditable
                            style={{whiteSpace: "pre-line"}}
                            html={field.value}
                            onChange={(e) => {
                                changeSectionItem(e, field)
                            }}
                            onPaste={onPasteHandler}
                            placeholder={field.name}
                        />
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
                            {
                                !outputMode &&
                                <i className="fi fi-rr-minus-small cube-btn cube-btn_red sections__sub-item__delete"
                                   onClick={removeSectionItem.bind(null, sectionName, createdField.id)}
                                ></i>
                            }
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
