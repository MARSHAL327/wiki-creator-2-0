import {useEffect, useState} from "react";
import Header from "./components/Header";
// import WorkSpace from "./components/WorkSpace";
import ActionButtons from "./components/ActionButtons";
import Context from "./context";
import OutputButtons from "./components/OutputButtons";
import OutputCode from "./components/OutputCode";
import WorkSpace20 from "./components/WorkSpace20";


export default function App() {
    // Заполняем основные данные
    const serverFields = [
        {
            name: "Название сайта (обязательно для заполнения)",
            type: "h2",
            level: 1,
        },
        {
            name: "Ссылка на сайт",
            type: "link",
            level: 1,
        },
        {
            name: "Комментарий",
            type: "comment"
        },
        {
            name: "FTP/SFTP",
            type: "h3",
            level: 2,
            fields: [
                {
                    inputName: "connection_type",
                    name: "Тип соединения",
                    type: "select",
                    selectValues: ["SFTP", "FTP"],
                    value: "SFTP",
                    defaultValue: "SFTP",
                    showFieldName: true,
                },
                {
                    name: "IP сервера",
                    type: "text",
                    showFieldName: true,
                    value: "",
                },
                {
                    name: "Логин",
                    type: "text",
                    showFieldName: true,
                    value: "",
                },
                {
                    name: "Пароль",
                    type: "password",
                    showFieldName: true,
                    value: "",
                },
                {
                    name: "Порт",
                    type: "text",
                    showFieldName: true,
                    defaultValue: "22",
                    value: "22",
                },
            ]
        },
        {
            name: "БД",
            type: "h3",
            level: 2,
            fields: [
                {
                    name: "Имя БД",
                    type: "text",
                    showFieldName: true,
                    value: ""
                },
                {
                    name: "Логин",
                    type: "text",
                    showFieldName: true,
                    value: ""
                },
                {
                    name: "Пароль",
                    type: "password",
                    showFieldName: true,
                    value: ""
                },
                {
                    name: "Хост",
                    type: "password",
                    defaultValue: "localhost",
                    value: "localhost",
                    showFieldName: true,
                },
            ]
        },
        {
            name: "Git",
            type: "h3",
            level: 2,
            fields: [
                {
                    name: "Ветка",
                    type: "text",
                    showFieldName: true,
                    value: ""
                },
            ]
        }
    ]
    let defaultSectionData = {
        "Правила работы": {
            name: "Правила работы",
            styles: {
                color: "rgb(255, 27, 40)"
            },
            fields: [
                {
                    name: "Заголовок",
                    type: "h2",
                },
                {
                    name: "Описание",
                    type: "text",
                },
            ],
            createdFields: [],
            sectionIsVisible: false,
        },
        "Доступы в админку": {
            name: "Доступы в админку",
            fields: [
                {
                    name: "Сайт",
                    type: "link"
                },
                {
                    name: "Название пользователя",
                    type: "h2"
                },
                {
                    name: "Логин",
                    type: "text",
                    showFieldName: true
                },
                {
                    name: "Пароль",
                    type: "password",
                    showFieldName: true
                },
            ],
            createdFields: [],
            sectionIsVisible: false,
        },
        "Боевые сайты": {
            name: "Боевые сайты",
            fields: serverFields,
            createdFields: [],
            sectionIsVisible: false,
        },
        "Тестовые сайты": {
            name: "Тестовые сайты",
            fields: serverFields,
            createdFields: [],
            sectionIsVisible: false,
        },
        "Хостинг": {
            name: "Хостинг",
            fields: [
                {
                    name: "Ссылка на хостинг",
                    type: "link"
                },
                {
                    name: "Логин",
                    type: "text",
                    showFieldName: true
                },
                {
                    name: "Пароль",
                    type: "password",
                    showFieldName: true
                },
            ],
            createdFields: [],
            sectionIsVisible: false,
        },
        "Git": {
            name: "Git",
            fields: [
                {
                    name: "Ссылка на git",
                    type: "link"
                },
                {
                    name: "Логин",
                    type: "text",
                    showFieldName: true
                },
                {
                    name: "Пароль",
                    type: "password",
                    showFieldName: true
                },
            ],
            createdFields: [],
            sectionIsVisible: false,
        },
        "Прочее": {
            name: "Прочее",
            fields: [
                {
                    name: "Заголовок",
                    type: "h2"
                },
                {
                    name: "Описание",
                    type: "text"
                },
                {
                    name: "Ссылка",
                    type: "link"
                },
                {
                    name: "Логин",
                    type: "text",
                    showFieldName: true
                },
                {
                    name: "Пароль",
                    type: "password",
                    showFieldName: true
                },
            ],
            createdFields: [],
            sectionIsVisible: false,
        },
    }

    let localData = localStorage.getItem("sectionsData") !== null ? JSON.parse(localStorage.getItem("sectionsData")) : {};
    Object.assign(defaultSectionData, localData)

    let [sectionsData, setSectionsData] = useState(defaultSectionData)

    // Следим за изменением данных
    useEffect(() => {
        localStorage.setItem('sectionsData', JSON.stringify(sectionsData))
    },[sectionsData])

    // Остальные переменные
    let [outputMode, setOutputMode] = useState(false)
    let fieldDeepDepthLevel = ["Боевые сайты", "Тестовые сайты"]
    let commentObject = {
        name: "Комментарий",
        type: "comment"
    }

    function copy(obj) {
        function copyProps(clone) {
            for (let key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    clone[key] = copy(obj[key]);
                }
            }
        }

        /**
         * Создание иммутабельной копии объекта
         * @return {Object}
         */
        function cloneObj() {
            let clone = {};
            copyProps(clone);
            return clone;
        }

        /**
         * Создание иммутабельной копии массива
         * @return {Array}
         */
        function cloneArr() {
            return obj.map(function (item) {
                return copy(item);
            });
        }

        /**
         * Создание иммутабельной копии Map
         * @return {Map}
         */
        function cloneMap() {
            let clone = new Map();
            for (let [key, val] of obj) {
                clone.set(key, copy(val));
            }
            return clone;
        }

        /**
         * Создание иммутабельной копии Set
         * @return {Set}
         */
        function cloneSet() {
            let clone = new Set();
            for (let item of obj) {
                clone.add(copy(item));
            }
            return clone;
        }

        /**
         * Создание иммутабельной копии функции
         * @return {Function}
         */
        function cloneFunction() {
            let clone = obj.bind(this);
            copyProps(clone);
            return clone;
        }

        // Получение типа объекта
        let type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();

        // Возвращаем копию в зависимости от типа исходных данных
        if (type === 'object') return cloneObj();
        if (type === 'array') return cloneArr();
        if (type === 'map') return cloneMap();
        if (type === 'set') return cloneSet();
        if (type === 'function') return cloneFunction();

        return obj;
    }

    function generateFieldValues(sectionFields, sectionName) {
        if (!fieldDeepDepthLevel.includes(sectionName))
            sectionFields.push(commentObject)

        return sectionFields.map((item, idx) => {
            if (item.fields) {
                if (item.fields[item.fields.length - 1].name !== "Комментарий")
                    item.fields.push(commentObject)

                item.fields = generateFieldValues(item.fields, sectionName)
            }


            return {
                ...item,
                value: item.value ?? "",
                id: Date.now() + idx
            }
        })
    }

    function getVisibleSectionCount(){
        return Object.keys(sectionsData).filter(sectionName => sectionsData[sectionName].sectionIsVisible).length
    }

    function toggleSectionVisible(sectionName, sectionIsVisible = true){
        sectionsData[sectionName].sectionIsVisible = sectionIsVisible
        sectionsData[sectionName].createdFields = []

        setSectionsData({
            ...sectionsData,
        })
    }

    function addSectionItem(section) {
        let newSectionItem = {
            id: Date.now(),
            fields: copy(section.fields)
        }

        newSectionItem.fields = generateFieldValues(newSectionItem.fields, section.name)
        section.createdFields.push(newSectionItem)

        setSectionsData({
            ...sectionsData,
        })
    }

    function removeSectionItem(section, itemId) {
        section.createdFields = section.createdFields.filter(item => item.id !== itemId)

        setSectionsData({
            ...sectionsData,
        })
    }

    function changeSectionItem(event, field, isTextarea = false) {
        if( isTextarea ){
            field.value = event.currentTarget.value
        } else {
            field.value = event.currentTarget.textContent
            setCursorPosition(event.currentTarget)
        }


        setSectionsData({
            ...sectionsData,
        })
    }

    function setCursorPosition(element) {
        let pos = getCaretCharacterOffsetWithin(element)
        // let tag = document.querySelector(element);
        let setpos = document.createRange();
        let set = window.getSelection();

        setpos.setStart(element, pos);
        setpos.collapse(true);
        set.removeAllRanges();
        set.addRange(setpos);
        // tag.focus();
    }

    function getCaretCharacterOffsetWithin(element) {
        let caretOffset = 0;
        let doc = element.ownerDocument || element.document;
        let win = doc.defaultView || doc.parentWindow;
        let sel;
        if (typeof win.getSelection != "undefined") {
            sel = win.getSelection();
            if (sel.rangeCount > 0) {
                let range = win.getSelection().getRangeAt(0);
                let preCaretRange = range.cloneRange();
                preCaretRange.selectNodeContents(element);
                preCaretRange.setEnd(range.endContainer, range.endOffset);
                caretOffset = preCaretRange.toString().length;
            }
        } else if ( (sel = doc.selection) && sel.type !== "Control") {
            let textRange = sel.createRange();
            let preCaretTextRange = doc.body.createTextRange();
            preCaretTextRange.moveToElementText(element);
            preCaretTextRange.setEndPoint("EndToEnd", textRange);
            caretOffset = preCaretTextRange.text.length;
        }
        return caretOffset;
    }

    function toggleOutputMode() {
        setOutputMode(outputMode => !outputMode)
    }

    function getFilteredSections(sections) {
        let filteredSections = {};

        for (let key in sections) {
            if (sections[key].createdFields.length > 0) {
                filteredSections[key] = sections[key]
            }
        }

        return filteredSections;
    }

    function deleteAll() {
        localStorage.setItem('sectionsData', null)

        for (let key in sectionsData) {
            sectionsData[key].createdFields = [];
            sectionsData[key].sectionIsVisible = false
        }

        setSectionsData({...sectionsData})
    }

    function setSectionsDataFromJson(json){
        deleteAll()

        Object.assign(sectionsData, JSON.parse(json))
        setSectionsData({...sectionsData})
    }

    return (
        <Context.Provider value={{addSectionItem, removeSectionItem, changeSectionItem, toggleSectionVisible, getVisibleSectionCount}}>
            <div>
                <Header
                    deleteAll={deleteAll}
                />
                <div className="container">
                    <div className="main-grid">
                        <ActionButtons
                            setSectionsDataFromJson={setSectionsDataFromJson}
                            sections={sectionsData}
                        />
                        {outputMode ?
                            <OutputCode
                                sections={getFilteredSections(sectionsData)}
                            /> :
                            <WorkSpace20
                                sections={sectionsData}
                            />
                        }

                        <OutputButtons
                            sections={getFilteredSections(sectionsData)}
                            outputMode={outputMode}
                            toggleOutputMode={toggleOutputMode}
                        />
                    </div>
                </div>
            </div>
        </Context.Provider>
    );
}
