import {makeAutoObservable} from "mobx";

class OutputData {
    outputMode = false

    constructor() {
        makeAutoObservable(this)
    }

    toggleOutputMode() {
        this.outputMode = !this.outputMode
    }

    copyText(text) {
        try {
            navigator.clipboard.writeText(text)
        } catch (e) {
            throw e;
        }
    }

    copyHtml() {
        let htmlCode = document.getElementById("html-code").outerHTML;

        this.copyText(htmlCode);
    }

    copyJson(version, sections) {
        let sectionsWithVersion = {
            version: version,
            sections: sections
        }

        this.copyText(JSON.stringify(sectionsWithVersion));
    }
}

export default new OutputData()