import {useContext} from "react";
import Context from "../context";
import AddSection from "./AddSection";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import CreatedFields from "./CreatedFields";
import ReactTooltip from "react-tooltip";

export default function WorkSpace20({sections, setSectionsData, outputMode}) {
    const {
        addSectionItem,
        getVisibleSectionCount,
        toggleSectionVisible,
        reorder
    } = useContext(Context)
    let visibleSectionCount = getVisibleSectionCount()

    function onDragEnd(result) {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        sections[result.destination.droppableId].createdFields = reorder(
            sections[result.destination.droppableId].createdFields,
            result.source.index,
            result.destination.index
        )

        setSectionsData({...sections});
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="white-block sections" id={"html-code"}>
                {Object.keys(sections).map((sectionName, i) => {
                    if (sections[sectionName].sectionIsVisible === false) return false

                    return (
                        <div className={"sections__item"} key={sectionName}>
                            <div className={"sections__title"}>
                                <h1>
                                    <span style={sections[sectionName].styles ?? {color: "rgb(0, 166, 80)"}}>
                                        {sectionName}
                                    </span>
                                </h1>
                                {
                                    !outputMode && (
                                        <>
                                            <i className="fi fi-rr-plus-small cube-btn cube-btn_green sections__control-btns"
                                               onClick={addSectionItem.bind(null, sections[sectionName])}
                                               data-for={"add-chapter-" + i}
                                               data-tip="Добавить секцию"
                                               data-iscapture="true"
                                            ></i>
                                            <i className="fi fi-rr-minus-small cube-btn cube-btn_red sections__control-btns"
                                               onClick={toggleSectionVisible.bind(null, sectionName, false)}
                                               data-for={"remove-section-" + i}
                                               data-tip="Удалить весь раздел"
                                               data-iscapture="true"
                                            ></i>
                                        </>
                                    )
                                }

                            </div>


                            <Droppable droppableId={sectionName}>
                                {
                                    (provided) => {
                                        return (
                                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                                {
                                                    sections[sectionName].createdFields.map((createdField, index) => (
                                                            <CreatedFields
                                                                key={createdField.id}
                                                                createdField={createdField}
                                                                sectionName={sectionName}
                                                                index={index}
                                                                outputMode={outputMode}
                                                            />
                                                        )
                                                    )
                                                }

                                                {provided.placeholder}
                                            </div>
                                        )
                                    }
                                }
                            </Droppable>

                            <hr/>
                            {
                                !outputMode && (
                                    <>
                                        <ReactTooltip
                                            id={"add-chapter-" + i}
                                            place={"top"}
                                            effect={"solid"}
                                            multiline={true}
                                            className={"main-tooltip"}
                                        />
                                        <ReactTooltip
                                            id={"remove-section-" + i}
                                            place={"top"}
                                            effect={"solid"}
                                            type={"error"}
                                            multiline={true}
                                            backgroundColor={"#F01825"}
                                            className={"main-tooltip"}
                                        />
                                    </>
                                )
                            }
                        </div>
                    )
                })}

                {visibleSectionCount === 0 &&
                    <AddSection
                        sections={sections}
                    />
                }

                { outputMode &&
                    <details>
                        <summary>
                            <h1 style={{ color: "rgb(0, 166, 80)", fontSize: "24px", fontWeight: "bold" }}>JSON вставка</h1>
                        </summary>
                        {JSON.stringify(sections)}
                    </details>
                }

            </div>
        </DragDropContext>
    )
}