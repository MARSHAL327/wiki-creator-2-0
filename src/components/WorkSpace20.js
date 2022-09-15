import {useContext} from "react";
import Context from "../context";
import AddSection from "./AddSection";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import CreatedFields from "./CreatedFields";
import ReactTooltip from "react-tooltip";
import OutputData from "../store/outputData";
import SectionsStore from "../store/sectionsStore";
import {observer} from "mobx-react";
import {TransitionGroup} from "react-transition-group";
import CSSTransition from "react-transition-group/CSSTransition";

const WorkSpace20 = observer(({sections, setSectionsData}) => {
    const {
        addSectionItem,
        visibleSectionsCount,
        toggleSectionVisible,
        reorder
    } = useContext(Context)

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

    function onAnimationExit() {
        SectionsStore.toggleAnimation()

        setTimeout(() => {
            SectionsStore.toggleAnimation()
        }, 600)
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="white-block sections" id={"html-code"}>
                <TransitionGroup>
                    {Object.keys(sections).map((sectionName, i) => {
                        if (sections[sectionName].sectionIsVisible === false) return false

                        return (
                            <CSSTransition
                                key={sectionName}
                                classNames={"translate"}
                                timeout={600}
                                onExit={onAnimationExit}
                            >
                                <div className={"sections__item"}>
                                    <div className={"sections__title"}>
                                        <h1>
                                    <span style={sections[sectionName].styles ?? {color: "rgb(0, 166, 80)"}}>
                                        {sectionName}
                                    </span>
                                        </h1>
                                        {
                                            !OutputData.outputMode && (
                                                <>
                                                    <i className="fi fi-rr-plus-small cube-btn cube-btn_green sections__control-btns"
                                                       onClick={addSectionItem.bind(null, sections[sectionName])}
                                                       data-for={"add-chapter-" + i}
                                                       data-tip="Добавить секцию"
                                                       data-iscapture="true"
                                                    ></i>
                                                    <i className="fi fi-rr-trash cube-btn cube-btn_red sections__control-btns"
                                                       style={{fontSize: "16px"}}
                                                       onClick={toggleSectionVisible.bind(null, sectionName, false)}
                                                       data-for={"remove-section-" + i}
                                                       data-tip="Удалить ВЕСЬ раздел"
                                                       data-iscapture="true"
                                                    ></i>
                                                </>
                                            )
                                        }

                                    </div>


                                    <Droppable droppableId={sectionName}>
                                        {
                                            (provided) => (
                                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                                    <TransitionGroup>
                                                        {sections[sectionName].createdFields.map((createdField, index) => (
                                                                <CSSTransition
                                                                    key={createdField.id}
                                                                    classNames={"translate"}
                                                                    timeout={600}
                                                                >
                                                                    <CreatedFields
                                                                        createdField={createdField}
                                                                        sectionName={sectionName}
                                                                        index={index}
                                                                        outputMode={OutputData.outputMode}
                                                                    />
                                                                </CSSTransition>
                                                            )
                                                        )
                                                        }
                                                    </TransitionGroup>
                                                    {provided.placeholder}
                                                </div>
                                            )
                                        }
                                    </Droppable>

                                    <hr/>
                                    {
                                        !OutputData.outputMode && (
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
                            </CSSTransition>
                        )
                    })}


                    {OutputData.outputMode &&
                        <details>
                            <summary>
                                <h1 style={{color: "rgb(0, 166, 80)", fontSize: "24px", fontWeight: "bold"}}>JSON
                                    вставка</h1>
                            </summary>
                            {JSON.stringify(sections)}
                        </details>
                    }
                </TransitionGroup>

                <AddSection
                    sections={sections}
                    isVisible={visibleSectionsCount === 0 && !SectionsStore.animationOn}
                />
            </div>

        </DragDropContext>
    )
})

export default WorkSpace20