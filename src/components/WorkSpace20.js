import {useContext} from "react";
import Context from "../context";
import AddSection from "./AddSection";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import CreatedFields from "./CreatedFields";

export default function WorkSpace20({sections, setSectionsData}) {
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
                {Object.keys(sections).map((sectionName) => {
                    if (sections[sectionName].sectionIsVisible === false) return false

                    return (
                        <div className={"sections__item"} key={sectionName}>
                            <div className={"sections__title"}>
                                <h1 style={sections[sectionName].styles}>{sectionName}</h1>
                                <i className="fi fi-rr-plus-small cube-btn cube-btn_green sections__control-btns"
                                   onClick={addSectionItem.bind(null, sections[sectionName])}></i>
                                <i className="fi fi-rr-minus-small cube-btn cube-btn_red sections__control-btns"
                                   onClick={toggleSectionVisible.bind(null, sectionName, false)}></i>
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
                        </div>
                    )
                })}

                {visibleSectionCount === 0 &&
                    <AddSection
                        sections={sections}
                    />
                }
            </div>
        </DragDropContext>
    )
}