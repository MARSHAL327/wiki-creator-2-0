import "../styles/outputButtons.css"
import ReactTooltip from "react-tooltip";
import {useRef} from "react";

export default function OutputButtons({sections, toggleOutputMode, outputMode, dataVersion}) {
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

    function copyText(text) {
        try {
            navigator.clipboard.writeText(text)
        } catch (e) {
            throw e;
        }
    }

    function copyHtml() {
        let htmlCode = document.getElementById("html-code").outerHTML;

        copyText(htmlCode);
        ReactTooltip.hide(copyCodeRef.current)
    }

    function copyJson() {
        let sectionsWithVersion = {
            "version": dataVersion,
            sections: sections
        }

        copyText(JSON.stringify(sectionsWithVersion));
        ReactTooltip.hide(copyJsonRef.current)
    }

    return (
        <div>
            <div className={"data-title"}>Выходные данные</div>
            <div className="btn-dotted btn-dotted_default" onClick={toggleOutputMode}>
                {outputMode ? "Редактировать данные" : "Посмотреть итоговый вариант"}
            </div>

            <div className="btn-dotted btn-dotted_default" onClick={copyJson}
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
                outputMode && (
                    <>
                        <div className="btn-dotted btn-dotted_default" onClick={copyHtml}
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
}