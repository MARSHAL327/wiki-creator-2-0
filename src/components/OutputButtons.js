import "../styles/outputButtons.css"

export default function OutputButtons({sections, toggleOutputMode, outputMode}) {
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

        // this.showHtmlPopper = true
        // setTimeout(() => this.showHtmlPopper = false, 1000);
    }

    function copyJson() {
        copyText(JSON.stringify(sections));

        // this.showJsonPopper = true
        // setTimeout(() => this.showJsonPopper = false, 1000);
    }

    return (
        <div>
            <div className="btn-dotted btn-dotted_default" onClick={toggleOutputMode}>
                {outputMode ? "Редактировать данные" : "Посмотреть итоговый вариант"}
            </div>

            <div className="btn-dotted btn-dotted_default" onClick={copyJson}>
                Копировать JSON
            </div>

            {
                outputMode &&
                    <div className="btn-dotted btn-dotted_default" onClick={copyHtml}>
                        Копировать код
                    </div>
            }
        </div>
    )
}