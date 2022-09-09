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
    const dataVersion = "2.0"
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
            name: "Комментарий к сайту",
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
                    showName: true,
                },
                {
                    name: "IP сервера",
                    type: "text",
                    showName: true,
                    value: "",
                },
                {
                    name: "Логин",
                    type: "text",
                    showName: true,
                    value: "",
                },
                {
                    name: "Пароль",
                    type: "password",
                    showName: true,
                    value: "",
                },
                {
                    name: "Порт",
                    type: "text",
                    showName: true,
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
                    showName: true,
                    value: ""
                },
                {
                    name: "Логин",
                    type: "text",
                    showName: true,
                    value: ""
                },
                {
                    name: "Пароль",
                    type: "password",
                    showName: true,
                    value: ""
                },
                {
                    name: "Хост",
                    type: "password",
                    defaultValue: "localhost",
                    value: "localhost",
                    showName: true,
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
                    showName: true,
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
                    name: "Название пользователя",
                    type: "h2"
                },
                {
                    name: "Сайт",
                    type: "link"
                },
                {
                    name: "Логин",
                    type: "text",
                    showName: true
                },
                {
                    name: "Пароль",
                    type: "password",
                    showName: true
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
                    name: "Заголовок",
                    type: "h2"
                },
                {
                    name: "Ссылка на хостинг",
                    type: "link"
                },
                {
                    name: "Логин",
                    type: "text",
                    showName: true
                },
                {
                    name: "Пароль",
                    type: "password",
                    showName: true
                },
            ],
            createdFields: [],
            sectionIsVisible: false,
        },
        "Git": {
            name: "Git",
            fields: [
                {
                    name: "Заголовок",
                    type: "h2"
                },
                {
                    name: "Ссылка на git",
                    type: "link"
                },
                {
                    name: "Логин",
                    type: "text",
                    showName: true
                },
                {
                    name: "Пароль",
                    type: "password",
                    showName: true
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
                    showName: true
                },
                {
                    name: "Пароль",
                    type: "password",
                    showName: true
                },
            ],
            createdFields: [],
            sectionIsVisible: false,
        },
    }

    let localData = localStorage.getItem("sectionsData") !== 'null' ? JSON.parse(localStorage.getItem("sectionsData")).sections : {};
    Object.assign(defaultSectionData, localData)

    let [sectionsData, setSectionsData] = useState(defaultSectionData)
    // let [caretOffset, setCaretOffset] = useState(0)

    // Следим за изменением данных
    useEffect(() => {
        let sectionsWithVersion = {
            version: dataVersion,
            sections: sectionsData
        }

        localStorage.setItem('sectionsData', JSON.stringify(sectionsWithVersion))
    }, [sectionsData])

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

    function getVisibleSectionCount() {
        return Object.keys(sectionsData).filter(sectionName => sectionsData[sectionName].sectionIsVisible).length
    }

    function toggleSectionVisible(sectionName, sectionIsVisible = true) {
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

    function removeSectionItem(sectionName, itemId) {
        sectionsData[sectionName].createdFields = sectionsData[sectionName].createdFields.filter(item => item.id !== itemId)

        setSectionsData({
            ...sectionsData,
        })
    }

    function changeSectionItem(event, field) {
        event.preventDefault();

        field.value = event.currentTarget.innerHTML

        setSectionsData({
            ...sectionsData,
        })
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

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    function convertToNewVersion(parsedJson, version = "1.0") {
        let sections

        switch (version) {
            case "1.0":
                let sameSections = ["Доступы в админку", "Правила работы", "Прочее", "Хостинг", "Git"]
                let defaultObject = {}
                sections = parsedJson

                for (let sectionName in sections) {

                    if (sameSections.includes(sectionName)) {
                        // eslint-disable-next-line
                        sections[sectionName].createdFields = sections[sectionName].createdFields.map((createdField) => {
                            let id = createdField.id
                            let newCreatedFields = []
                            let lastIdx = -1

                            Object.keys(createdField).forEach((fieldName, idx) => {
                                if (fieldName === "id") return
                                let type = "text"
                                let showName = false

                                lastIdx = idx

                                defaultSectionData[sectionName].fields.forEach(item => {
                                    if (item.name === fieldName) {
                                        type = item.type
                                        showName = item.showName
                                    }
                                })

                                let newField = {
                                    name: fieldName,
                                    type: type,
                                    value: createdField[fieldName].value,
                                    id: Number(createdField.id) + idx,
                                    showName: showName
                                }

                                if (fieldName === "Комментарий")
                                    Object.assign(newField, commentObject)

                                newCreatedFields.push(newField)
                            })

                            if (sectionName === "Хостинг" || sectionName === "Git") {
                                newCreatedFields.push({
                                    name: "Заголовок",
                                    type: "h2",
                                    value: "",
                                    id: Number(id) + lastIdx + 1
                                })

                                newCreatedFields = reorder(newCreatedFields, 4, 0)
                            }

                            if (sectionName === "Доступы в админку") {
                                newCreatedFields = reorder(newCreatedFields, 0, 1)
                            }

                            return {
                                id: id,
                                fields: newCreatedFields
                            }
                        })

                        defaultObject = {
                            name: sectionName,
                            fields: sections[sectionName].fields,
                            createdFields: sections[sectionName].createdFields,
                            sectionIsVisible: sections[sectionName].createdFields.length > 0,
                        }

                        if (sectionName === "Правила работы") defaultObject.styles = {color: "rgb(255, 27, 40)"}

                        sections[sectionName] = defaultObject
                    } else {
                        delete sections[sectionName]
                    }
                }

                // console.log(sections)
                break;
            default:
                sections = {}
                break;
        }

        return sections
    }

    function setSectionsDataFromJson(json) {
        let parsedJson = JSON.parse(json)
        let sections = parsedJson.sections


        if (sections === undefined || parsedJson.version !== dataVersion)
            sections = convertToNewVersion(parsedJson, parsedJson.version)

        deleteAll()

        for (let sectionName in sections) {
            if (sections[sectionName].sectionIsVisible === undefined)
                sections[sectionName].sectionIsVisible = sections[sectionName].createdFields.length > 0
        }

        Object.assign(sectionsData, sections)
        setSectionsData({...sectionsData})
    }

    function setEndOfContenteditable(element) {
        let setpos = document.createRange();
        let set = window.getSelection();

        try {
            set.removeAllRanges();
            setpos.setStart(element.firstChild, element.firstChild.length);
            setpos.collapse(false);
            set.addRange(setpos);
        } catch (err){
            console.error(err)
        }

    }

    return (
        <Context.Provider value={{
            addSectionItem,
            removeSectionItem,
            changeSectionItem,
            toggleSectionVisible,
            getVisibleSectionCount,
            reorder,
            setEndOfContenteditable
        }}>
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
                                setSectionsData={setSectionsData}
                            />
                        }

                        <OutputButtons
                            dataVersion={dataVersion}
                            sections={sectionsData}
                            outputMode={outputMode}
                            toggleOutputMode={toggleOutputMode}
                        />
                    </div>
                </div>
            </div>
        </Context.Provider>
    );
}
