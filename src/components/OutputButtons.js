import "../styles/outputButtons.css"
import ReactTooltip from "react-tooltip";
import {useRef} from "react";
import {observer} from "mobx-react";
import OutputMode from "../store/outputData";

const OutputButtons = observer(({sections, dataVersion}) => {
    const copyJsonRef = useRef(null);
    const copyCodeRef = useRef(null);
    const tooltipObject = {
        place: "bottom",
        effect: "solid",
        multiline: true,
        backgroundColor: "#42b983",
        delayHide: 1500,
        event: "click",
        className: "main-tooltip",
    }

    return (
        <div>
            <div className={"data-title"}>Выходные данные</div>
            <div className="btn-dotted btn-dotted_default" onClick={() => OutputMode.toggleOutputMode()}>
                {OutputMode.outputMode ? "Редактировать данные" : "Посмотреть итоговый вариант"}
            </div>

            <div className="btn-dotted btn-dotted_default" onClick={() => {
                OutputMode.copyJson("2.0", sections)
                ReactTooltip.hide(copyCodeRef.current)
            }}
                 ref={copyJsonRef}
                 data-for={"copy-json"}
                 data-tip="Скопировано!"
                 data-iscapture="true"
            >
                Копировать JSON
            </div>
            <ReactTooltip
                id={"copy-json"}
                {...tooltipObject}
            />

            {
                OutputMode.outputMode && (
                    <>
                        <div className="btn-dotted btn-dotted_default" onClick={() => {
                            OutputMode.copyHtml()
                            ReactTooltip.hide(copyCodeRef.current)
                        }}
                             ref={copyCodeRef}
                             data-for={"copy-code"}
                             data-tip="Скопировано!"
                             data-iscapture="true"
                        >
                            Копировать код
                        </div>
                        <ReactTooltip
                            id={"copy-code"}
                            {...tooltipObject}
                        />
                    </>
                )

            }
        </div>
    )
})

export default OutputButtons