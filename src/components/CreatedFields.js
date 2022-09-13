import {Draggable} from "react-beautiful-dnd";
import {useContext} from "react";
import Context from "../context";
import ContentEditable from "react-contenteditable";
import ReactTooltip from "react-tooltip";
import {observer} from "mobx-react";
import OutputData from "../store/outputData";

const CreatedFields = observer( ({createdField, index, sectionName}) => {
    const {removeSectionItem, changeSectionItem} = useContext(Context)
    const styles = {
        blockStyles: {
            whiteSpace: "pre-line",
            margin: "16px 0",
            display: "flex"
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

        return fillFields.length > 0
    }

    function getFieldHtml(field) {
        if( OutputData.outputMode && field.type === "h3" && !h3FieldsFilled(field) ){
            return false
        }

        if (OutputData.outputMode && field.value.trim() === "" && field.type !== "h3")
            return false

        let fieldObject = {
            html: field.value,
            onChange: function (e) {
                changeSectionItem(e, field)
            },
            onPaste: onPasteHandler,
            placeholder: field.name,
        }

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
                            {...fieldObject}
                        />
                    </div>
                )
            case "h2":
                return (
                    <h2>
                        <span>
                            <font color="#ffffff">
                                <ContentEditable
                                    {...fieldObject}
                                    style={{backgroundColor: 'rgb(14, 16, 37)', padding: '10px', display: 'inline-block', width: '100%'}}
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
                        {...fieldObject}
                        className={"content-editable"}
                        disabled={OutputData.outputMode}
                        href={OutputData.outputMode ? field.value : ''}
                        target={OutputData.outputMode ? '_blank' : ''}
                        tagName={OutputData.outputMode ? 'a' : 'div'}
                    />
                )
            case "comment":
                return (
                    <i className={"content-editable"} style={{marginTop: "16px"}}>
                        {field.value && <b>Комментарий:&nbsp;</b>}
                        <ContentEditable
                            {...fieldObject}
                            style={{whiteSpace: "pre-line"}}
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
                            {/*<i className="fi fi-rr-caret-down cube-btn cube-btn_default caret-btn"></i>*/}
                            <i className="fi fi-rr-arrows cube-btn cube-btn_default move-btn"></i>
                            {
                                !OutputData.outputMode &&
                                <i className="fi fi-rr-minus-small cube-btn cube-btn_red sections__sub-item__delete"
                                   onClick={removeSectionItem.bind(null, sectionName, createdField.id)}
                                   data-for={"remove-chapter-" + createdField.id}
                                   data-tip="Удалить секцию"
                                   data-iscapture="true"
                                ></i>
                            }
                        </div>
                        <div className="sections__sub-item__fields">
                            {getFields(createdField.fields)}
                        </div>
                        {
                            !OutputData.outputMode && (
                                <ReactTooltip
                                    id={"remove-chapter-" + createdField.id}
                                    place={"left"}
                                    effect={"solid"}
                                    multiline={true}
                                    className={"main-tooltip"}
                                />
                            )
                        }
                    </div>
                )
            }
        </Draggable>
    )
} )

export default CreatedFields